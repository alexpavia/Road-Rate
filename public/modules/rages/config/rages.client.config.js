'use strict';

// Configuring the Articles module
angular.module('rages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rages', 'rages', 'dropdown', '/rages(/create)?');
		Menus.addSubMenuItem('topbar', 'rages', 'My Rages', 'rages');
		Menus.addSubMenuItem('topbar', 'rages', 'New Rage', 'rages/create');
	}
]);