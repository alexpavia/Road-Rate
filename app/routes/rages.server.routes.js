'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var rages = require('../../app/controllers/rages');

	// Rages Routes
	app.route('/rages')
		.get(rages.list)
		.post(users.requiresLogin, rages.create);

	app.route('/rages/:rageId')
		.get(rages.read)
		.put(users.requiresLogin, rages.hasAuthorization, rages.update)
		.delete(users.requiresLogin, rages.hasAuthorization, rages.delete);

	// Finish by binding the Rage middleware
	app.param('rageId', rages.rageByID);
};