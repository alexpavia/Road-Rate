'use strict';

//Rages service used to communicate Rages REST endpoints
angular.module('rages').factory('Rages', ['$resource',
	function($resource) {
		return $resource('rages/:rageId', { rageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);