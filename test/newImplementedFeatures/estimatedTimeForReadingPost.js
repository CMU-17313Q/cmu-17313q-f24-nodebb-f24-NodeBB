'use strict';

const { JSDOM } = require('jsdom');
const { expect } = require('chai');

describe('Estimated Time for Reading Post', () => {
    let document;

    beforeEach(() => {
        const dom = new JSDOM(`
            <div id="post-content-1">This is a test post content with a few words.</div>
            <span id="reading-time-1" class="text-muted me-3"></span>
        `);
        document = dom.window.document;
    });

    it('should calculate the word count correctly', () => {
        const postContentElement = document.getElementById('post-content-1');
        const postContent = postContentElement.textContent;
        const wordCount = postContent.trim().split(/\s+/).length;

        expect(wordCount).to.equal(9); // Adjust the expected word count based on the content
    });

    it('should estimate the reading time correctly', () => {
        const wordCount = 9; // Use the word count from the previous test
        const wordsPerMinute = 200;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        expect(readingTime).to.equal(1); // Adjust the expected reading time based on the word count
    });

    it('should display the estimated reading time in the DOM', () => {
        const postContentElement = document.getElementById('post-content-1');
        const readingTimeElement = document.getElementById('reading-time-1');

        const postContent = postContentElement.textContent;
        const wordCount = postContent.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        readingTimeElement.textContent = 'Estimated reading time: ' + readingTime + ' min';

        expect(readingTimeElement.textContent).to.equal('Estimated reading time: 1 min'); // Adjust the expected text based on the reading time
    });
});