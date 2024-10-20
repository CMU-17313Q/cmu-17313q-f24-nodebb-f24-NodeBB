'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../../app'); 
const db = require('../../src/database');
const user = require('../../src/user');
const topics = require('../../src/topics');
const posts = require('../../src/posts');
const categories = require('../../src/categories');

describe('Instructor Approved Posts', () => {
    let instructorToken;
    let studentToken;
    let postId;
    let topicId;

    before(async () => {
        // Create an instructor user and a student user
        const instructor = await user.create({ username: 'instructor', password: 'password', isAdmin: true });
        const student = await user.create({ username: 'student', password: 'password' });

        // Log in as instructor and student to get tokens
        instructorToken = await loginUser('instructor', 'password');
        studentToken = await loginUser('student', 'password');

        // Create a category, topic, and a post
        const category = await categories.create({
            name: 'Test Category',
            description: 'Test category created by testing script',
        });
        const topic = await topics.post({
            title: 'Test Topic',
            content: 'Test Content',
            uid: student.uid,
            cid: category.cid,
        });
        topicId = topic.tid;
        const post = await posts.create({
            content: 'Test Post',
            uid: student.uid,
            tid: topic.tid,
        });
        postId = post.pid;
    });

    async function loginUser(username, password) {
        const res = await request(app)
            .post('/api/v1/login')
            .send({ username, password });
        return res.body.token;
    }

    describe('PUT /api/v1/posts/:pid/approve', () => {
        it('should allow an instructor to approve a post', async () => {
            const res = await request(app)
                .put(`/api/v1/posts/${postId}/approve`)
                .set('Authorization', `Bearer ${instructorToken}`)
                .expect(200);

            assert.strictEqual(res.body.message, 'Post approved successfully');

            // Verify the post is marked as approved in the database
            const post = await posts.getPost(postId);
            assert.strictEqual(post.isApproved, true);
        });

        it('should not allow a student to approve a post', async () => {
            const res = await request(app)
                .put(`/api/v1/posts/${postId}/approve`)
                .set('Authorization', `Bearer ${studentToken}`)
                .expect(403);

            assert.strictEqual(res.body.error, 'You do not have permission to approve posts');
        });

        it('should return an error if the post does not exist', async () => {
            const res = await request(app)
                .put('/api/v1/posts/99999/approve')
                .set('Authorization', `Bearer ${instructorToken}`)
                .expect(404);

            assert.strictEqual(res.body.error, 'Post not found');
        });
    });

    describe('GET /api/v1/posts/:pid', () => {
        it('should retrieve the post with approval status', async () => {
            const res = await request(app)
                .get(`/api/v1/posts/${postId}`)
                .expect(200);

            assert.strictEqual(res.body.post.isApproved, true);
        });
    });
});