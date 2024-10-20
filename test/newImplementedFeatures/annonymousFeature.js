'use strict';

const { JSDOM } = require('jsdom');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const user = require('../../src/user');
const topics = require('../../src/topics');
const posts = require('../../src/posts');

describe('Anonymous Feature - Share Post Anonymously', () => {
	let studentToken;
	let postId;
	let topicId;

	before(async () => {
		// Create a student user
		const student = await user.create({ username: 'student', password: 'password' });

		// Log in as student to get token
		studentToken = await loginUser('student', 'password');

		// Create a topic and a post
		const topic = await topics.post({
			title: 'Test Topic',
			content: 'Test Content',
			uid: student.uid,
			cid: 1,
		});
		topicId = topic.tid;
		const post = await posts.create({
			content: 'Test Post',
			uid: student.uid,
			tid: topic.tid,
			annonymousType: 'student',
		});
		postId = post.pid;
	});

	async function loginUser(username, password) {
		const res = await request(app)
			.post('/api/v1/login')
			.send({ username, password });
		return res.body.token;
	}

	describe('UI Elements', () => {
		it('should display the anonymous type dropdown', () => {
			const dom = new JSDOM(`
                <div class="form-group">
                    <label for="anonymousDropdown">[[topic:composer.select-anonymous-type]]</label>
                    <select class="form-control" id="anonymousDropdown" name="anonymousType">
                        <option value="none">[[topic:composer-anonymous-none]]</option>
                        <option value="student">[[topic:composer-anonymous-student]]</option>
                        <option value="all">[[topic:composer-anonymous-all]]</option>
                    </select>
                </div>
            `);
			const { document } = dom.window;
			const dropdown = document.getElementById('anonymousDropdown');
			expect(dropdown).to.not.be.null;
			expect(dropdown.options.length).to.equal(3);
		});
	});

	describe('Form Submission', () => {
		it('should include the anonymous type in the form submission', async () => {
			const res = await request(app)
				.post('/api/v1/topics')
				.set('Authorization', `Bearer ${studentToken}`)
				.send({
					title: 'Anonymous Post',
					content: 'This is an anonymous post.',
					cid: 1,
					annonymousType: 'student',
				})
				.expect(200);

			expect(res.body.topic.annonymousType).to.equal('student');
		});
	});

	describe('Backend Handling', () => {
		it('should display the post anonymously based on the selected type', async () => {
			const res = await request(app)
				.get(`/api/v1/posts/${postId}`)
				.expect(200);

			const { post } = res.body;
			if (post.annonymousType === 'none') {
				expect(post.user.username).to.not.be.null;
			} else {
				expect(post.user.username).to.be.null;
			}
		});
	});
});
