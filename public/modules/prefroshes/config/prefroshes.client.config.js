'use strict';

// Configuring the Articles module
angular.module('prefroshes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Prefroshes', 'prefroshes', 'dropdown', '/prefroshes(/create)?');
		Menus.addSubMenuItem('topbar', 'prefroshes', 'List Prefroshes', 'prefroshes');
		Menus.addSubMenuItem('topbar', 'prefroshes', 'New Prefrosh', 'prefroshes/create');
	}
]);