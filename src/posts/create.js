'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const meta = require('../meta');
const db = require('../database');
const plugins = require('../plugins');
const user = require('../user');
const topics = require('../topics');
const categories = require('../categories');
const groups = require('../groups');
const privileges = require('../privileges');
// const document = require('../../node_modules/nodebb-plugin-composer-default/static/lib/composer');


// using a set to store bad words for faster search
let badWords = new Set();
function loadBadWords() {
	const filePath = path.join(__dirname, '../bad-words.txt');
	try {
		const data = fs.readFileSync(filePath, 'utf8');
		badWords = new Set(data.split(/\r?\n/));
	} catch (err) {
		console.error('Error while reading bad words file:', err);
	}
}

loadBadWords();


function censorBadWords(content) {
	// console.log('Checking if the words in the post are in the dictionary of bad words');
	let censoredContent = '';
	const words = content.split(/\s+/);// Split content into individual words
	for (const word of words) {
		const cleanWord = word.replace(/[^\w\s]/gi, '');// Remove special characters before checking
		if (badWords.has(cleanWord.toLowerCase())) {
			// Replace bad word with asterisks matching its length
			const asterisks = '*'.repeat(cleanWord.length);
			censoredContent += `${asterisks} `;
		} else {
			censoredContent += `${word} `;// Add the original word if it's not a bad word
		}
	}
	return censoredContent.trim();
}
/*
function checkifBadWord(content) {
	console.log('Checking if the words in the post are in the dictionary of bad words');
	const words = content.split(/\s+/); // Split content of the post into words
	console.log('words in the content: ', words);
	let found = false;

	for (const word of words) {
		if (badWords.has(word.toLowerCase())) {
			console.log('The word', word, 'is a bad word');
			found = true;
		} else {
			console.log('The word', word, 'is not a bad word');
		}
	}
	return found;
}
*/
module.exports = function (Posts) {
	Posts.create = async function (data) {
		// This is an internal method, consider using Topics.reply instead
		const { uid } = data;
		const { tid } = data;
		// console.log('this is the file responsible for creating a post');
		// eslint-disable-next-line prefer-const
		let content = data.content.toString();
		const timestamp = data.timestamp || Date.now();
		const isMain = data.isMain || false;

		if (!uid && parseInt(uid, 10) !== 0) {
			throw new Error('[[error:invalid-uid]]');
		}

		if (data.toPid) {
			await checkToPid(data.toPid, uid);
		}
		// console.log('Content before censoring bad words: ', content);
		data.content = censorBadWords(content);// Only replace bad words, leave the rest intact
		// console.log('Content after censoring bad words: ', data.content);

		const pid = await db.incrObjectField('global', 'nextPid');
		let postData = {
			pid: pid,
			uid: uid,
			tid: tid,
			content: data.content,
			timestamp: timestamp,
			anon: data.isAnonymous,
		};

		if (data.toPid) {
			postData.toPid = data.toPid;
		}
		if (data.ip && meta.config.trackIpPerPost) {
			postData.ip = data.ip;
		}
		if (data.handle && !parseInt(uid, 10)) {
			postData.handle = data.handle;
		}

		let result = await plugins.hooks.fire('filter:post.create', { post: postData, data: data });
		postData = result.post;
		await db.setObject(`post:${postData.pid}`, postData);

		const topicData = await topics.getTopicFields(tid, ['cid', 'pinned']);
		postData.cid = topicData.cid;

		await Promise.all([
			db.sortedSetAdd('posts:pid', timestamp, postData.pid),
			db.incrObjectField('global', 'postCount'),
			user.onNewPostMade(postData),
			topics.onNewPostMade(postData),
			categories.onNewPostMade(topicData.cid, topicData.pinned, postData),
			groups.onNewPostMade(postData),
			addReplyTo(postData, timestamp),
			Posts.uploads.sync(postData.pid),
		]);

		result = await plugins.hooks.fire('filter:post.get', { post: postData, uid: data.uid });
		result.post.isMain = isMain;
		plugins.hooks.fire('action:post.save', { post: _.clone(result.post) });
		return result.post;
	};


	async function addReplyTo(postData, timestamp) {
		if (!postData.toPid) {
			return;
		}
		await Promise.all([
			db.sortedSetAdd(`pid:${postData.toPid}:replies`, timestamp, postData.pid),
			db.incrObjectField(`post:${postData.toPid}`, 'replies'),
		]);
	}

	async function checkToPid(toPid, uid) {
		const [toPost, canViewToPid] = await Promise.all([
			Posts.getPostFields(toPid, ['pid', 'deleted']),
			privileges.posts.can('posts:view_deleted', toPid, uid),
		]);
		const toPidExists = !!toPost.pid;
		if (!toPidExists || (toPost.deleted && !canViewToPid)) {
			throw new Error('[[error:invalid-pid]]');
		}
	}
};

module.exports.utils = {
	loadBadWords,
	censorBadWords,
};
