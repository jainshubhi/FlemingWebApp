'use strict';

//Prefroshes service used to communicate Prefroshes REST endpoints
angular.module('prefroshes').factory('Prefroshes', ['$resource',
	function($resource) {
		return $resource('prefroshes/:prefroshId', { prefroshId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);