'use strict';

//Setting up route
angular.module('prefroshes').config(['$stateProvider',
	function($stateProvider) {
		// Prefroshes state routing
		$stateProvider.
		state('listPrefroshes', {
			url: '/prefroshes',
			templateUrl: 'modules/prefroshes/views/list-prefroshes.client.view.html'
		}).
		state('createPrefrosh', {
			url: '/prefroshes/create',
			templateUrl: 'modules/prefroshes/views/create-prefrosh.client.view.html'
		}).
		state('viewPrefrosh', {
			url: '/prefroshes/:prefroshId',
			templateUrl: 'modules/prefroshes/views/view-prefrosh.client.view.html'
		}).
		state('editPrefrosh', {
			url: '/prefroshes/:prefroshId/edit',
			templateUrl: 'modules/prefroshes/views/edit-prefrosh.client.view.html'
		});
	}
]);