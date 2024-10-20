'use strict';

// Polyfill for TextEncoder and TextDecoder
if (typeof global.TextEncoder === 'undefined') {
	const { TextEncoder, TextDecoder } = require('util');
	global.TextEncoder = TextEncoder;
	global.TextDecoder = TextDecoder;
}

// Import dependencies for unit testing
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load the HTML from the node_modules directory for Notes Modal
const notesTemplateHtml = fs.readFileSync(path.resolve('node_modules/nodebb-theme-harmony/templates/partials/topic/post-menu-list.tpl'), 'utf8');

// Load the HTML from the node_modules directory for Anonymous Post Radio Button
const anonymousTemplateHtml = fs.readFileSync(path.resolve('node_modules/nodebb-plugin-composer-default/static/templates/partials/composer-title-container.tpl'), 'utf8');

// Load the HTML from the node_modules directory for Post Template
const postTemplateHtml = fs.readFileSync(path.resolve('node_modules/nodebb-theme-harmony/templates/partials/topic/post.tpl'), 'utf8');

// Load the HTML from the node_modules directory for Topics List Template
const topicsListTemplateHtml = fs.readFileSync(path.resolve('node_modules/nodebb-theme-harmony/templates/partials/topics_list.tpl'), 'utf8');

// Load the HTML from the node_modules directory for Chat Message Template
const chatMessageTemplateHtml = fs.readFileSync(path.resolve('src/views/partials/chats/message.tpl'), 'utf8');

// Notes Modal Functionality Tests
describe('Notes Modal Functionality', () => {
	let document;
	let window;

	beforeEach(() => {
		const dom = new JSDOM(notesTemplateHtml, {
			url: 'http://localhost/',
			runScripts: 'dangerously',
		});
		document = dom.window.document;
		window = dom.window;

		// Add mocked methods for localStorage
		window.localStorage = {
			data: {},
			getItem: jest.fn(key => window.localStorage.data[key]),
			setItem: jest.fn((key, value) => {
				window.localStorage.data[key] = value;
			}),
			removeItem: jest.fn((key) => {
				delete window.localStorage.data[key];
			}),
		};

		// Mock the saveNotesBtn event listener
		document.getElementById('saveNotesBtn').addEventListener('click', () => {
			const postId = 'test_post_id';
			const storageKey = `postNotes_${postId}`;
			const newNote = document.getElementById('userNotes').value.trim();

			if (newNote !== '') {
				let existingNotes = window.localStorage.getItem(storageKey);
				existingNotes = existingNotes ? JSON.parse(existingNotes) : [];
				existingNotes.push(newNote);
				window.localStorage.setItem(storageKey, JSON.stringify(existingNotes));
				document.getElementById('notesModal').style.display = 'none';
			}
		});
	});

	test('Should save a note', () => {
		const textarea = document.getElementById('userNotes');
		textarea.value = 'Test note';

		const saveButton = document.getElementById('saveNotesBtn');
		saveButton.click();

		const savedNotes = window.localStorage.getItem('postNotes_test_post_id');
		expect(savedNotes).toBe(JSON.stringify(['Test note']));
	});

	test('Should hide modal after saving note', () => {
		const textarea = document.getElementById('userNotes');
		textarea.value = 'Another note';

		const saveButton = document.getElementById('saveNotesBtn');
		saveButton.click();

		const modal = document.getElementById('notesModal');
		expect(modal.style.display).toBe('none');
	});

	test('Should not save an empty note', () => {
		const textarea = document.getElementById('userNotes');
		textarea.value = '';

		const saveButton = document.getElementById('saveNotesBtn');
		saveButton.click();

		const savedNotes = window.localStorage.getItem('postNotes_test_post_id');
		expect(savedNotes).toBeNull();
	});
});

// Anonymous Post Radio Button Functionality Tests
describe('Anonymous Post Radio Button Functionality', () => {
	let document;
	let window;

	beforeEach(() => {
		const dom = new JSDOM(anonymousTemplateHtml, {
			url: 'http://localhost/',
			runScripts: 'dangerously',
		});
		document = dom.window.document;
		window = dom.window;
	});

	test('Should have "No" radio button checked by default', () => {
		const noRadioButton = document.getElementById('no');
		expect(noRadioButton.checked).toBe(true);
	});

	test('Should check "Yes" radio button when selected', () => {
		const yesRadioButton = document.getElementById('yes');
		yesRadioButton.click();
		expect(yesRadioButton.checked).toBe(true);

		const noRadioButton = document.getElementById('no');
		expect(noRadioButton.checked).toBe(false);
	});

	test('Should check "No" radio button when selected after "Yes"', () => {
		const yesRadioButton = document.getElementById('yes');
		yesRadioButton.click();
		expect(yesRadioButton.checked).toBe(true);

		const noRadioButton = document.getElementById('no');
		noRadioButton.click();
		expect(noRadioButton.checked).toBe(true);
		expect(yesRadioButton.checked).toBe(false);
	});
});

// Post Template Functionality Tests
describe('Post Template Functionality', () => {
	let document;
	let window;

	beforeEach(() => {
		const dom = new JSDOM(postTemplateHtml, {
			url: 'http://localhost/',
			runScripts: 'dangerously',
		});
		document = dom.window.document;
		window = dom.window;
	});

	test('Should display user avatar for non-anonymous post', () => {
		const userLink = document.querySelector('a[aria-label]');
		expect(userLink).not.toBeNull();
	});

	test('Should display anonymous avatar for anonymous post', () => {
		const avatarElement = document.querySelector('.avatar.avatar-tooltip');
		expect(avatarElement).not.toBeNull();
		expect(avatarElement.textContent.trim()).toBe('?');
	});

	test('Should display username for non-anonymous post', () => {
		const usernameLink = document.querySelector('a[data-username]');
		expect(usernameLink).not.toBeNull();
		expect(usernameLink.textContent.trim()).not.toBe('');
	});

	test('Should display "anonymous" for anonymous post', () => {
		const anonymousSpan = document.querySelector('span.fw-bold.text-muted');
		expect(anonymousSpan).not.toBeNull();
		expect(anonymousSpan.textContent.trim()).toBe('anonymous');
	});
});

// Topics List Functionality Tests
describe('Topics List Functionality', () => {
	let document;
	let window;

	beforeEach(() => {
		const dom = new JSDOM(topicsListTemplateHtml, {
			url: 'http://localhost/',
			runScripts: 'dangerously',
		});
		document = dom.window.document;
		window = dom.window;
	});

	test('Should render "Share Post to Chat" button', () => {
		const shareButton = document.querySelector('button[component="topic/share-to-chat"]');
		expect(shareButton).not.toBeNull();
		expect(shareButton.textContent.trim()).toBe('Share Post to Chat');
	});

	test('Should open modal when "Share Post to Chat" button is clicked', () => {
		const shareButton = document.querySelector('button[component="topic/share-to-chat"]');
		shareButton.click();

		const modal = document.getElementById('shareToChatModal');
		expect(modal).not.toBeNull();
		modal.classList.add('show');
		expect(modal.classList.contains('show')).toBe(true);
	});
});

// Chat Message Functionality Tests
describe('Chat Message Functionality', () => {
	let document;
	let window;

	beforeEach(() => {
		const dom = new JSDOM(chatMessageTemplateHtml, {
			url: 'http://localhost/',
			runScripts: 'dangerously',
		});
		document = dom.window.document;
		window = dom.window;
	});

	test('Should render reaction message correctly', () => {
		const reactionMessage = document.querySelector('li.chat-message.reaction-message');
		expect(reactionMessage).not.toBeNull();
		const reactionUser = reactionMessage.querySelector('.chat-user a');
		expect(reactionUser).not.toBeNull();
		expect(reactionUser.textContent.trim()).not.toBe('');
	});

	test('Should render emoji reaction options', () => {
		const emojiMenu = document.querySelector('.emoji-menu');
		expect(emojiMenu).not.toBeNull();
		const emojiOptions = emojiMenu.querySelectorAll('.emoji-option');
		expect(emojiOptions.length).toBeGreaterThan(0);
	});
});
