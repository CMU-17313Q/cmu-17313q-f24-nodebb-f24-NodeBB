'use strict';

const SocketPlugins = require.main.require('./src/socket.io/plugins');
// const user = require.main.require('./src/user');
// const db = require.main.require('./src/database'); // Require the database module
/*
	This file is provided exclusively so that plugins can require it and add their own socket listeners.

	How? From your plugin:
		const SocketPlugins = require.main.require('./src/socket.io/plugins');
		SocketPlugins.myPlugin = {};
		SocketPlugins.myPlugin.myMethod = function(socket, data, callback) { ... };

	Be a good lad and namespace your methods.
*/

// Namespace for emoji reactions
SocketPlugins.emojiReactions = {};

// Method to handle adding a reaction
SocketPlugins.emojiReactions.addReaction = async function (socket, data, callback) {
	const { roomId, messageId, emoji } = data;
	try {
		console.log('Reaction:', emoji);
		console.log('Room ID:', roomId);
		console.log('Message ID:', messageId);
		console.log('User ID:', socket.uid);

		// Validation: Ensure required fields are present
		if (!roomId || !messageId || !emoji) {
			return callback(new Error('Missing required fields'));
		}

		// Emit reaction to all users in the room
		socket.to(`chat_room_${roomId}`).emit('event:reactionUpdated', {
			messageId,
			emoji,
			userId: socket.uid,
		});

		// Call callback for success
		callback(null, { success: true });
	} catch (err) {
		console.error('Error adding reaction:', err);
		callback(err);
	}
};
// Method to handle removing a reaction
SocketPlugins.emojiReactions.removeReaction = async function (socket, data, callback) {
	const { roomId, messageId, emoji } = data;
	try {
		console.log('Reaction:', emoji);
		console.log('Room ID:', roomId);
		console.log('Message ID:', messageId);
		console.log('User ID:', socket.uid);

		// Validation: Ensure required fields are present
		if (!roomId || !messageId || !emoji) {
			return callback(new Error('Missing required fields'));
		}

		// Emit reaction removal to all users in the room
		socket.to(`chat_room_${roomId}`).emit('event:reactionRemoved', {
			messageId,
			emoji,
			userId: socket.uid,
		});

		// Call callback for success
		callback(null, { success: true });
	} catch (err) {
		console.error('Error removing reaction:', err);
		callback(err);
	}
};
