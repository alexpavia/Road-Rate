'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Rage = mongoose.model('Rage'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Rage already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Rage
 */
exports.create = function(req, res) {
	var rage = new Rage(req.body);
	rage.user = req.user;

	rage.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(rage);
		}
	});
};

/**
 * Show the current Rage
 */
exports.read = function(req, res) {
	res.jsonp(req.rage);
};


/**
 * Update a Rage
 */
exports.update = function(req, res) {
	var rage = req.rage ;

	rage = _.extend(rage , req.body);

	rage.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(rage);
		}
	});
};

/**
 * Delete an Rage
 */
exports.delete = function(req, res) {
	var rage = req.rage ;

	rage.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(rage);
		}
	});
};

/**
 * List of Rages
 */
exports.list = function(req, res) { Rage.find().sort('-created').populate('user', 'displayName').exec(function(err, rages) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(rages);
		}
	});
};

/**
 * Rage middleware
 */
exports.rageByID = function(req, res, next, id) { Rage.findById(id).populate('user', 'displayName').exec(function(err, rage) {
		if (err) return next(err);
		if (! rage) return next(new Error('Failed to load Rage ' + id));
		req.rage = rage ;
		next();
	});
};

/**
 * Rage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rage.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};