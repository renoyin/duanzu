'use strict';

// Configuring the Articles module
angular.module('duanzuposts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Duanzuposts', 'duanzuposts', 'dropdown', '/duanzuposts(/create)?');
		Menus.addSubMenuItem('topbar', 'duanzuposts', 'List Duanzuposts', 'duanzuposts');
		Menus.addSubMenuItem('topbar', 'duanzuposts', 'New Duanzupost', 'duanzuposts/create');
	}
]);