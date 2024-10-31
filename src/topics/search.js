/* 'use strict';
const Topics = require('./data'); // Assuming this imports the Topics object from data.js

module.exports = function (Topics) {
    // Existing functions...

    // Define the postSearch function
    Topics.postSearch = async function (data) {
        console.log('in topic search');
        console.log('data:', data);

        const query = data.query || ''; // The search term
        const tid = data.tid || 1; // Topic id to search in
        const page = data.page || 1; // Pagination: current page
        const uid = data.uid || 0; // User id of the searcher
        const paginate = data.hasOwnProperty('paginate') ? data.paginate : true;

        const startTime = process.hrtime();

        // Store posts associated with a topic
        const set = `tid:${tid}:posts`;
        const topicData = await Topics.getTopicData(tid);
        const postsData = await Topics.getTopicPosts(topicData, set, 0, -1, uid);

        // Filtering posts based on query
        let filteredPosts = postsData.filter(post => post.content.toLowerCase().includes(query.toLowerCase()));

        const searchResult = {
            matchCount: filteredPosts.length,
        };

        if (paginate) {
            const resultsPerPage = data.resultsPerPage || 10; // Default results per page
            const start = Math.max(0, page - 1) * resultsPerPage;
            const stop = start + resultsPerPage;
            searchResult.pageCount = Math.ceil(filteredPosts.length / resultsPerPage);
            filteredPosts = filteredPosts.slice(start, stop);
        }

        // Timing the search process
        searchResult.timing = (process.hrtime(startTime)[1] / 1e6).toFixed(2); // ms timing

        // Returning filtered posts and match count
        searchResult.posts = filteredPosts;
        return searchResult;
    };

    // Returning the Topics object with the new method
    return Topics;
};
*/
