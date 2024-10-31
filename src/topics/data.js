'use strict';

const validator = require('validator');

const db = require('../database');
const categories = require('../categories');
const utils = require('../utils');
const translator = require('../translator');
const plugins = require('../plugins');

const intFields = [
	'tid', 'cid', 'uid', 'mainPid', 'postcount',
	'viewcount', 'postercount', 'deleted', 'locked', 'pinned',
	'pinExpiry', 'timestamp', 'upvotes', 'downvotes', 'lastposttime',
	'deleterUid',
];

module.exports = function (Topics) {
	// adding search function here instead of in a separate search.js file
	Topics.postSearch = async function (data) {
		// console.log('in Topics.postSearch in src/topics/data.js');
		// console.log('Topics.postSearch input data:', data);

		const query = data.query || ''; // the search term
		const tid = data.tid || 1; // topic id to search in
		const uid = data.uid || 0; // user id of the searcher
		const paginate = data.hasOwnProperty('paginate') ? data.paginate : true;

		const startTime = process.hrtime();

		// store posts associated with a topic
		const set = `tid:${tid}:posts`;
		// using topics functions to extract all posts and topic data
		const topicData = await Topics.getTopicData(tid);
		const postsData = await Topics.getTopicPosts(topicData, set, 0, -1, uid);

		// console.log('posts data:', postsData);

		// if the query is empty, return all posts
		if (query.trim() === '') {
			const searchResult = {
				matchCount: postsData.length,
				pageCount: paginate ? 1 : 0, // set to 1 page if pagination is enabled
				posts: postsData, // return all posts
			};

			// console.log('searchResult when query is empty: ', searchResult);
			return searchResult;
		}

		// filtering posts based on query
		const filteredPosts = postsData.filter(post => post.content.toLowerCase().includes(query.toLowerCase()));

		// the search result
		const searchResult = {
			matchCount: filteredPosts.length,
			posts: filteredPosts, // include filtered posts in the result
		};

		if (paginate) {
			const resultsPerPage = data.resultsPerPage || 10; // default results per page
			const page = data.page || 1; // current page
			const start = (page - 1) * resultsPerPage;
			const stop = start + resultsPerPage;
			searchResult.pageCount = Math.ceil(filteredPosts.length / resultsPerPage); // total pages
			searchResult.posts = filteredPosts.slice(start, stop);
		}

		// timing the search
		searchResult.timing = (process.hrtime(startTime)[1] / 1e6).toFixed(2); // ms timing

		// console.log('Final searchResult: ', searchResult);
		return searchResult;
		// return filteredPosts;
	};

	Topics.getTopicsFields = async function (tids, fields) {
		if (!Array.isArray(tids) || !tids.length) {
			return [];
		}

		// "scheduled" is derived from "timestamp"
		if (fields.includes('scheduled') && !fields.includes('timestamp')) {
			fields.push('timestamp');
		}

		const keys = tids.map(tid => `topic:${tid}`);
		const topics = await db.getObjects(keys, fields);
		const result = await plugins.hooks.fire('filter:topic.getFields', {
			tids: tids,
			topics: topics,
			fields: fields,
			keys: keys,
		});
		result.topics.forEach(topic => modifyTopic(topic, fields));
		return result.topics;
	};

	Topics.getTopicField = async function (tid, field) {
		const topic = await Topics.getTopicFields(tid, [field]);
		return topic ? topic[field] : null;
	};

	Topics.getTopicFields = async function (tid, fields) {
		const topics = await Topics.getTopicsFields([tid], fields);
		return topics ? topics[0] : null;
	};

	Topics.getTopicData = async function (tid) {
		const topics = await Topics.getTopicsFields([tid], []);
		return topics && topics.length ? topics[0] : null;
	};

	Topics.getTopicsData = async function (tids) {
		return await Topics.getTopicsFields(tids, []);
	};

	Topics.getCategoryData = async function (tid) {
		const cid = await Topics.getTopicField(tid, 'cid');
		return await categories.getCategoryData(cid);
	};

	Topics.setTopicField = async function (tid, field, value) {
		await db.setObjectField(`topic:${tid}`, field, value);
	};

	Topics.setTopicFields = async function (tid, data) {
		await db.setObject(`topic:${tid}`, data);
	};

	Topics.deleteTopicField = async function (tid, field) {
		await db.deleteObjectField(`topic:${tid}`, field);
	};

	Topics.deleteTopicFields = async function (tid, fields) {
		await db.deleteObjectFields(`topic:${tid}`, fields);
	};
};

function escapeTitle(topicData) {
	if (topicData) {
		if (topicData.title) {
			topicData.title = translator.escape(validator.escape(topicData.title));
		}
		if (topicData.titleRaw) {
			topicData.titleRaw = translator.escape(topicData.titleRaw);
		}
	}
}

function modifyTopic(topic, fields) {
	if (!topic) {
		return;
	}

	db.parseIntFields(topic, intFields, fields);

	if (topic.hasOwnProperty('title')) {
		topic.titleRaw = topic.title;
		topic.title = String(topic.title);
	}

	escapeTitle(topic);

	if (topic.hasOwnProperty('timestamp')) {
		topic.timestampISO = utils.toISOString(topic.timestamp);
		if (!fields.length || fields.includes('scheduled')) {
			topic.scheduled = topic.timestamp > Date.now();
		}
	}

	if (topic.hasOwnProperty('lastposttime')) {
		topic.lastposttimeISO = utils.toISOString(topic.lastposttime);
	}

	if (topic.hasOwnProperty('pinExpiry')) {
		topic.pinExpiryISO = utils.toISOString(topic.pinExpiry);
	}

	if (topic.hasOwnProperty('upvotes') && topic.hasOwnProperty('downvotes')) {
		topic.votes = topic.upvotes - topic.downvotes;
	}

	if (fields.includes('teaserPid') || !fields.length) {
		topic.teaserPid = topic.teaserPid || null;
	}

	if (fields.includes('tags') || !fields.length) {
		const tags = String(topic.tags || '');
		topic.tags = tags.split(',').filter(Boolean).map((tag) => {
			const escaped = validator.escape(String(tag));
			return {
				value: tag,
				valueEscaped: escaped,
				valueEncoded: encodeURIComponent(escaped),
				class: escaped.replace(/\s/g, '-'),
			};
		});
	}
}
