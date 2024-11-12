
'use strict';

const _ = require('lodash');

const db = require('../database');
const privileges = require('../privileges');
const user = require('../user');
const categories = require('../categories');
const meta = require('../meta');
const plugins = require('../plugins');

module.exports = function (Topics) {
	console.log('ndevidze');
	Topics.getSortedTopics = async function (params) {
		const data = {
			nextStart: 0,
			topicCount: 0,
			topics: [],
		};
		params = initializeParams(params);
		data.tids = await getTids(params);
		data.tids = await sortTids(data.tids, params);
		data.tids = await filterTids(data.tids.slice(0, meta.config.recentMaxTopics), params);
		data.topicCount = data.tids.length;
		data.topics = await getTopics(data.tids, params);
		data.nextStart = params.stop + 1;
		return data;
	};
	function initializeParams(params) {
		params.term = params.term || 'alltime';
		params.sort = params.sort || 'recent';
		params.query = params.query || {};
		if (params.hasOwnProperty('cids') && params.cids && !Array.isArray(params.cids)) {
			params.cids = [params.cids];
		}
		params.tags = params.tags || [];
		if (params.tags && !Array.isArray(params.tags)) {
			params.tags = [params.tags];
		}
		return params;
	}
	async function getTids(params) {
		if (plugins.hooks.hasListeners('filter:topics.getSortedTids')) {
			const result = await plugins.hooks.fire('filter:topics.getSortedTids', { params: params, tids: [] });
			return result.tids;
		}
		let tids = [];
		if (params.term !== 'alltime') {
			if (params.sort === 'posts') {
				tids = await getTidsWithMostPostsInTerm(params.cids, params.uid, params.term);
			} else {
				tids = await Topics.getLatestTidsFromSet('topics:tid', 0, -1, params.term);
			}

			if (params.filter === 'watched') {
				tids = await Topics.filterWatchedTids(tids, params.uid);
			}
		} else if (params.filter === 'watched') {
			tids = await getWatchedTopics(params);
		} else if (params.cids) {
			tids = await getCidTids(params);
		} else if (params.tags.length) {
			tids = await getTagTids(params);
		} else {
			const method = params.sort === 'old' ?
				'getSortedSetRange' :
				'getSortedSetRevRange';
			tids = await db[method](sortToSet(params.sort), 0, meta.config.recentMaxTopics - 1);
		}

		return tids;
	}

	function sortToSet(sort) {
		const map = {
			recent: 'topics:recent',
			old: 'topics:recent',
			create: 'topics:tid',
			posts: 'topics:posts',
			votes: 'topics:votes',
			views: 'topics:views',
		};
		if (map.hasOwnProperty(sort)) {
			return map[sort];
		}
		return 'topics:recent';
	}

	async function getTidsWithMostPostsInTerm(cids, uid, term) {
		if (Array.isArray(cids)) {
			cids = await privileges.categories.filterCids('topics:read', cids, uid);
		} else {
			cids = await categories.getCidsByPrivilege('categories:cid', uid, 'topics:read');
		}

		const pids = await db.getSortedSetRevRangeByScore(
			cids.map(cid => `cid:${cid}:pids`),
			0,
			1000,
			'+inf',
			Date.now() - Topics.getSinceFromTerm(term)
		);
		const postObjs = await db.getObjectsFields(pids.map(pid => `post:${pid}`), ['tid']);
		const tidToCount = {};
		postObjs.forEach((post) => {
			tidToCount[post.tid] = tidToCount[post.tid] || 0;
			tidToCount[post.tid] += 1;
		});

		return _.uniq(postObjs.map(post => String(post.tid)))
			.sort((t1, t2) => tidToCount[t2] - tidToCount[t1]);
	}

	async function getWatchedTopics(params) {
		const sortSet = ['recent', 'old'].includes(params.sort) ? 'topics:recent' : `topics:${params.sort}`;
		const method = params.sort === 'old' ? 'getSortedSetIntersect' : 'getSortedSetRevIntersect';
		return await db[method]({
			sets: [sortSet, `uid:${params.uid}:followed_tids`],
			weights: [1, 0],
			start: 0,
			stop: meta.config.recentMaxTopics - 1,
		});
	}

	async function getTagTids(params) {
		const sets = [
			sortToSet(params.sort),
			...params.tags.map(tag => `tag:${tag}:topics`),
		];
		const method = params.sort === 'old' ?
			'getSortedSetIntersect' :
			'getSortedSetRevIntersect';
		return await db[method]({
			sets: sets,
			start: 0,
			stop: meta.config.recentMaxTopics - 1,
			weights: sets.map((s, index) => (index ? 0 : 1)),
		});
	}

	async function getCidTids(params) {
		console.log('getting Tids');
		if (params.tags.length) {
			return await getTidsForTagsAndCids(params);
		}
		const sets = getCidSets(params.cids, params.sort);
		let pinnedTids = await db.getSortedSetRevRange(sets.pinnedSets, 0, -1);
		pinnedTids = await Topics.tools.checkPinExpiry(pinnedTids);
		const tids = await db[sets.method](sets.normalSets, 0, meta.config.recentMaxTopics - 1);
		return pinnedTids.concat(tids);
	}
	function getCidSets(cids, sort) {
		const sets = [];
		const pinnedSets = [];
		cids.forEach((cid) => {
			if (sort === 'recent' || sort === 'old') {
				sets.push(`cid:${cid}:tids`);
			} else {
				sets.push(`cid:${cid}:tids${sort ? `:${sort}` : ''}`);
			}
			pinnedSets.push(`cid:${cid}:tids:pinned`);
		});
		const method = (sort === 'old') ? 'getSortedSetRange' : 'getSortedSetRevRange';
		return { normalSets: sets, pinnedSets: pinnedSets, method: method };
	}
	async function getTidsForTagsAndCids(params) {
		return _.intersection(
			...await Promise.all(params.tags.map(async (tag) => {
				const sets = params.cids.map(cid => `cid:${cid}:tag:${tag}:topics`);
				return await db.getSortedSetRevRange(sets, 0, -1);
			}))
		);
	}

	async function sortTids(tids, params) {
		console.log('sorting Tids');
		if (canSkipSorting(params)) {
			return tids;
		}
		if (params.sort === 'posts' && params.term !== 'alltime') {
			return tids;
		}
		const { sortMap, fields } = await plugins.hooks.fire('filter:topics.sortOptions', {
			params,
			fields: getFields(),
			sortMap: getSortMap(),
		});
		const topicData = await Topics.getTopicsFields(tids, fields);
		const sortFn = getSortFunction(params.sort, sortMap);
		if (params.floatPinned) {
			floatPinned(topicData, sortFn);
		} else {
			topicData.sort(sortFn);
		}
		return topicData.map(topic => topic && topic.tid);
	}
	function canSkipSorting(params) {
		return params.term === 'alltime' && !params.cids && !params.tags.length && params.filter !== 'watched' && !params.floatPinned;
	}
	function getFields() {
		return ['tid', 'timestamp', 'lastposttime', 'upvotes', 'downvotes', 'postcount', 'pinned'];
	}
	function getSortMap() {
		return {
			recent: sortRecent,
			old: sortOld,
			create: sortCreate,
			posts: sortPopular,
			votes: sortVotes,
			views: sortViews,
		};
	}
	function getSortFunction(sort, sortMap) {
		return sortMap.hasOwnProperty(sort) && sortMap[sort] ? sortMap[sort] : sortRecent;
	}
	function floatPinned(topicData, sortFn) {
		topicData.sort((a, b) => (a.pinned !== b.pinned ? b.pinned - a.pinned : sortFn(a, b)));
	}

	function sortRecent(a, b) {
		return b.lastposttime - a.lastposttime;
	}

	function sortOld(a, b) {
		return a.lastposttime - b.lastposttime;
	}

	function sortCreate(a, b) {
		return b.timestamp - a.timestamp;
	}

	function sortVotes(a, b) {
		if (a.votes !== b.votes) {
			return b.votes - a.votes;
		}
		return b.postcount - a.postcount;
	}

	function sortPopular(a, b) {
		if (a.postcount !== b.postcount) {
			return b.postcount - a.postcount;
		}
		return b.viewcount - a.viewcount;
	}

	function sortViews(a, b) {
		return b.viewcount - a.viewcount;
	}

	async function filterTids(tids, params) {
		console.log('filtering Tids');
		tids = await applyFilterByType(tids, params);
		tids = await privileges.topics.filterTids('topics:read', tids, params.uid);
		const topicData = await Topics.getTopicsFields(tids, ['uid', 'tid', 'cid', 'tags']);
		const topicCids = _.uniq(topicData.map(topic => topic.cid)).filter(Boolean);
		const [ignoredCids, filtered] = await Promise.all([
			getIgnoredCids(params, topicCids),
			user.blocks.filter(params.uid, topicData),
		]);
		return filterTopicsByCidsAndTags(filtered, ignoredCids, params);
	}
	async function applyFilterByType(tids, params) {
		switch (params.filter) {
			case 'new':
				return await Topics.filterNewTids(tids, params.uid);
			case 'unreplied':
				return await Topics.filterUnrepliedTids(tids);
			default:
				return await Topics.filterNotIgnoredTids(tids, params.uid);
		}
	}
	async function getIgnoredCids(params, topicCids) {
		if (params.cids || params.filter === 'watched' || meta.config.disableRecentCategoryFilter) {
			return [];
		}
		return await categories.isIgnored(topicCids, params.uid);
	}
	function filterTopicsByCidsAndTags(topicData, ignoredCids, params) {
		const isCidIgnored = _.zipObject(topicData.map(t => t.cid), ignoredCids);
		const cids = params.cids && params.cids.map(String);
		const { tags } = params;
		const tids = topicData.filter(t => (
			t &&
			t.cid &&
			!isCidIgnored[t.cid] &&
			(!cids || cids.includes(String(t.cid))) &&
			(!tags.length || tags.every(tag => t.tags.find(topicTag => topicTag.value === tag)))
		)).map(t => t.tid);
		return plugins.hooks.fire('filter:topics.filterSortedTids', { tids, params }).then(result => result.tids);
	}
	async function getTopics(tids, params) {
		tids = tids.slice(params.start, params.stop !== -1 ? params.stop + 1 : undefined);
		const topicData = await Topics.getTopicsByTids(tids, params);
		Topics.calculateTopicIndices(topicData, params.start);
		return topicData;
	}

	Topics.calculateTopicIndices = function (topicData, start) {
		topicData.forEach((topic, index) => {
			if (topic) {
				topic.index = start + index;
			}
		});
	};
};
