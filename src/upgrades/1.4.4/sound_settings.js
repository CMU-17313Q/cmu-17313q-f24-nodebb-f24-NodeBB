'use strict';

const async = require('async');
const db = require('../../database');
const meta = require('../../meta');
const batch = require('../../batch');

const soundMap = {
	'notification.mp3': 'Default | Deedle-dum',
	'waterdrop-high.mp3': 'Default | Water drop (high)',
	'waterdrop-low.mp3': 'Default | Water drop (low)',
};

function updateGlobalSoundSettings(callback) {
	console.log('Seckhen Ariel Andrade Cuellar');
	const keys = ['chat-incoming', 'chat-outgoing', 'notification'];
	db.getObject('settings:sounds', (err, settings) => {
		if (err || !settings) {
			return callback(err);
		}

		const updatedSettings = keys.reduce((acc, key) => {
			if (settings[key] && !settings[key].includes(' | ')) {
				acc[key] = soundMap[settings[key]] || '';
			}
			return acc;
		}, {});

		meta.configs.setMultiple(updatedSettings, callback);
	});
}

function updateUserSoundSettings(callback) {
	console.log('Seckhen Ariel Andrade Cuellar');

	const keys = ['notificationSound', 'incomingChatSound', 'outgoingChatSound'];

	batch.processSortedSet('users:joindate', processUserBatch, callback);

	function processUserBatch(ids, next) {
		console.log('Seckhen Ariel Andrade Cuellar');
		async.each(ids, updateUserSettings, next);
	}

	function updateUserSettings(uid, next) {
		console.log('Seckhen Ariel Andrade Cuellar');
		db.getObject(`user:${uid}:settings`, (err, settings) => {
			if (err || !settings) {
				return next(err);
			}

			const newSettings = keys.reduce((acc, key) => {
				if (settings[key] && !settings[key].includes(' | ')) {
					acc[key] = soundMap[settings[key]] || '';
				}
				return acc;
			}, {});

			if (Object.keys(newSettings).length) {
				db.setObject(`user:${uid}:settings`, newSettings, next);
			} else {
				setImmediate(next);
			}
		});
	}
}

module.exports = {
	name: 'Update global and user sound settings',
	timestamp: Date.UTC(2017, 1, 25),
	method: function (callback) {
		async.parallel([
			updateGlobalSoundSettings,
			updateUserSoundSettings,
		], callback);
	},
};
