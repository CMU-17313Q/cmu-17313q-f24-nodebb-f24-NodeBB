'use strict';

const SocketPlugins = require.main.require('./src/socket.io/plugins');
const user = require.main.require('./src/user');
const db = require.main.require('./src/database'); // Assuming you're using a database module for message fetching


SocketPlugins.chat = {};


// Function to handle sending a reaction
SocketPlugins.chat.sendReaction = async function (socket, data, callback = () => {}) {
	const { messageId, emoji, roomId } = data;


	try {
		console.log('Reaction received on server:', data); // Log for server confirmation


		if (!roomId) {
			console.error('Room ID is missing');
			return callback(new Error('Room ID is missing'));
		}


		if (!messageId || !emoji) {
			console.error('Message ID or emoji is missing');
			return callback(new Error('Message ID or emoji is missing'));
		}


		// Fetch user details
		let username;
		try {
			const userData = await user.getUserFields(socket.uid, ['username']);
			username = userData.username || `User ${socket.uid}`;
		} catch (err) {
			console.error('Error fetching user data:', err);
			username = `User ${socket.uid}`; // Fallback to generic identifier
		}


		// Fetch message details
		let messageContent;
		try {
			// Assuming you're using a database query to fetch the message content based on the messageId
			const messageData = await db.getObjectField(`message:${messageId}`, 'content');
			messageContent = messageData || `[Message ${messageId}]`;
		} catch (err) {
			console.error('Error fetching message content:', err);
			messageContent = `[Message ${messageId}]`; // Fallback in case of error
		}


		// Emit the reaction event to all users in the room (for UI update)
		socket.server.in(`chat_room_${roomId}`).emit('event:reactionAdded', {
			messageId: messageId,
			emoji: emoji,
			userId: socket.uid,
		});


		// Build and emit the reaction message (custom message for chat log)
		const reactionMessage = `${username} reacted with ${emoji} to message "${messageContent}"`;
		socket.server.in(`chat_room_${roomId}`).emit('event:reactionMessage', {
			messageId: messageId,
			userId: socket.uid,
			reactionMessage: reactionMessage,
			emoji: emoji,
		});

		console.log('Reaction message emitted:', reactionMessage);

		// Acknowledge back to the client that the reaction was processed successfully
		callback(null, { success: true });
	} catch (err) {
		console.error('Error processing reaction:', err);
		callback(err);
	}
};
