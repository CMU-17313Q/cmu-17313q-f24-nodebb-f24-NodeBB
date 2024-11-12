'use strict';

const db = require('../../database');

module.exports = {
	name: 'Giving upload privileges',
	timestamp: Date.UTC(2016, 6, 12),
	method: async function () {
		console.log('graissov: Executing method function');
		const privilegesAPI = require('../../privileges');
		const meta = require('../../meta');

		const cids = await getCategoryIds();
		await processCategories(cids, privilegesAPI, meta);
	},
};

// Helper function to get category IDs
function getCategoryIds() {
	console.log('graissov: Executing getCategoryIds function');
	return new Promise((resolve, reject) => {
		db.getSortedSetRange('categories:cid', 0, -1, (err, cids) => {
			if (err) {
				return reject(err);
			}
			resolve(cids);
		});
	});
}

// Helper function to process each category
async function processCategories(cids, privilegesAPI, meta) {
	console.log('graissov: Executing processCategories function');
	await Promise.all(cids.map(async (cid) => {
		const data = await getCategoryData(cid, privilegesAPI);
		await processGroups(data.groups, cid, privilegesAPI, meta);
	}));
}

// Helper function to get category data
function getCategoryData(cid, privilegesAPI) {
	console.log('graissov: Executing getCategoryData function');
	return new Promise((resolve, reject) => {
		privilegesAPI.categories.list(cid, (err, data) => {
			if (err) {
				return reject(err);
			}
			resolve(data);
		});
	});
}

// Helper function to process groups within a category
async function processGroups(groups, cid, privilegesAPI, meta) {
	console.log('graissov: Executing processGroups function');
	await Promise.all(groups.map(async (group) => {
		if (group.name === 'guests' && parseInt(meta.config.allowGuestUploads, 10) !== 1) {
			return; // Skip guests if uploads are not allowed
		}
		if (group.privileges['groups:read']) {
			await giveUploadPrivilege(cid, group.name, privilegesAPI);
		}
	}));
}

// Helper function to give upload privileges
function giveUploadPrivilege(cid, groupName, privilegesAPI) {
	console.log('graissov: Executing giveUploadPrivilege function');
	return new Promise((resolve, reject) => {
		privilegesAPI.categories.give(['upload:post:image'], cid, groupName, (err) => {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
}
