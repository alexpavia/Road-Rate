'use strict';

//Setting up route
angular.module('rages').config(['$stateProvider',
	function($stateProvider) {
		// Rages state routing
		$stateProvider.
		state('listRages', {
			url: '/rages',
			templateUrl: 'modules/rages/views/list-rages.client.view.html'
		}).
		state('createRage', {
			url: '/rages/create',
			templateUrl: 'modules/rages/views/create-rage.client.view.html'
		}).
		state('viewRage', {
			url: '/rages/:rageId',
			templateUrl: 'modules/rages/views/view-rage.client.view.html'
		}).
		state('editRage', {
			url: '/rages/:rageId/edit',
			templateUrl: 'modules/rages/views/edit-rage.client.view.html'
		});
	}
]);