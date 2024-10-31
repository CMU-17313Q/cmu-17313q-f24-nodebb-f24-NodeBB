'use strict';


define('forum/users', [
	'benchpress', 'api', 'alerts', 'accounts/invite',
], function (Benchpress, api, alerts, AccountInvite) {
	const Users = {};

	let searchResultCount = 0;

	Users.init = function () {
		app.enterRoom('user_list');

		const section = utils.param('section') ? ('?section=' + utils.param('section')) : '';
		const navItems = $('[component="user/list/menu"]');
		navItems.find('a').removeClass('active');
		navItems.find('a[href="' + window.location.pathname + section + '"]')
			.addClass('active');

		Users.handleSearch();

		AccountInvite.handle();

		socket.removeListener('event:user_status_change', onUserStatusChange);
		socket.on('event:user_status_change', onUserStatusChange);
	};

	// event listener for user search
	Users.handleSearch = function (params) {
		// console.log('in user.handlesearch in client');
		searchResultCount = params && params.resultCount;
		$('#search-user').on('keyup', utils.debounce(doSearch, 250));
		$('.search select, .search input[type="checkbox"]').on('change', doSearch);
	};

	function doSearch() {
		// console.log('in dosearch');
		if (!ajaxify.data.template.users) {
			return;
		}
		$('[component="user/search/icon"]').removeClass('fa-search').addClass('fa-spinner fa-spin');
		// the value from the search input field,
		// username = "searchBy" value from user search function
		// the search query
		const username = $('#search-user').val();
		// console.log('in public/src/client/users.js, username: ', username);
		const activeSection = getActiveSection();
		// console.log('activesection in src/client/users.js: ', activeSection);

		const query = {
			section: activeSection,
			page: 1,
		};

		// console.log('query in doSearch of user: ', query);

		if (!username) {
			return loadPage(query);
		}

		query.query = username;
		query.sortBy = getSortBy();
		const filters = [];
		if ($('.search .online-only').is(':checked') || (activeSection === 'online')) {
			filters.push('online');
		}
		if (activeSection === 'banned') {
			filters.push('banned');
		}
		if (activeSection === 'flagged') {
			filters.push('flagged');
		}
		if (filters.length) {
			query.filters = filters;
		}

		// console.log('username: ', username);

		loadPage(query);
	}

	function getSortBy() {
		let sortBy;
		const activeSection = getActiveSection();
		if (activeSection === 'sort-posts') {
			sortBy = 'postcount';
		} else if (activeSection === 'sort-reputation') {
			sortBy = 'reputation';
		} else if (activeSection === 'users') {
			sortBy = 'joindate';
		}
		return sortBy;
	}

	// if this is commmented out the search doesnt work but theres no error
	function loadPage(query) {
		api.get('/api/users', query)
			.then(renderSearchResults)
			.catch(alerts.error);
	}

	// renders search results, done last
	function renderSearchResults(data) {
		// console.log('data in rendersearchresults client/users.js: ', data);
		Benchpress.render('partials/paginator', { pagination: data.pagination }).then(function (html) {
			$('.pagination-container').replaceWith(html);
		});

		if (searchResultCount) {
			data.users = data.users.slice(0, searchResultCount);
		}

		data.isAdminOrGlobalMod = app.user.isAdmin || app.user.isGlobalMod;
		// need this or else will be waiting to load forever
		app.parseAndTranslate('users', 'users', data, function (html) {
			// console.log('parseandtranslate user');
			$('#users-container').html(html);
			html.find('.timeago').timeago();
			// not needed for functionality, just for changing icon of search
			$('[component="user/search/icon"]').addClass('fa-search').removeClass('fa-spinner fa-spin');
		});
	}

	function onUserStatusChange(data) {
		const section = getActiveSection();

		if ((section.startsWith('online') || section.startsWith('users'))) {
			updateUser(data);
		}
	}

	function updateUser(data) {
		app.updateUserStatus($('#users-container [data-uid="' + data.uid + '"] [component="user/status"]'), data.status);
	}

	function getActiveSection() {
		return utils.param('section') || '';
	}

	return Users;
});
