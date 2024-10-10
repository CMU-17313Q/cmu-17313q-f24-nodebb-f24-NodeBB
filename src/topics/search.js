'use strict';

module.exports = function (Topics) {
	Topics.postSearch = async function (data) {
		console.log('in topic search');
		console.log('data:', data);

		// extracting the attributes of the data object
		const query = data.query || ''; // the search term
		const tid = data.tid || 1; // topic id to search in
		const page = data.page || 1; // pagination: current page
		const uid = data.uid || 0; // user id of the searcher
		const paginate = data.hasOwnProperty('paginate') ? data.paginate : true;

		const startTime = process.hrtime();

		// storing the posts associated with a topic
		const set = `tid:${tid}:posts`;
		// getting topic attributes using getTopicData
		const topicData = await Topics.getTopicData(tid);
		// using getTopicPosts function in src/topics/posts.js
		// to retrieve all the posts in the topic (by making range 0 to -1)
		const postsData = await Topics.getTopicPosts(topicData, set, 0, -1, uid);

		// filtering posts based on query
		// looping through retrieved postsData array
		// and inspecting each post object for the search query
		let filteredPosts = postsData.filter(post => post.content.toLowerCase().includes(query.toLowerCase()));

		const searchResult = {
			matchCount: filteredPosts.length,
		};

		if (paginate) {
			const resultsPerPage = data.resultsPerPage || 10; // default results per page
			const start = Math.max(0, page - 1) * resultsPerPage;
			const stop = start + resultsPerPage;
			searchResult.pageCount = Math.ceil(filteredPosts.length / resultsPerPage);
			filteredPosts = filteredPosts.slice(start, stop);
		}

		// timing the search process
		searchResult.timing = (process.hrtime(startTime)[1] / 1e6).toFixed(2); // ms timing

		// returning filtered posts and match count
		searchResult.posts = filteredPosts;
		return searchResult;
	};
};
