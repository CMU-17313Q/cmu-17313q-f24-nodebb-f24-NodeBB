'use strict';

module.exports = {
	roots: ['<rootDir>/test'], // Set the root directory to the test folder
	moduleDirectories: ['node_modules', '<rootDir>'],
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/test/mocks/plugin_modules/@nodebb/**/*.js'], // Specify where to find test files
};
