'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Duanzupost = mongoose.model('Duanzupost'),
	_ = require('lodash');

/**
 * Create a Duanzupost
 */
exports.create = function(req, res) {
	var duanzupost = new Duanzupost(req.body);
	duanzupost.user = req.user;

	duanzupost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(duanzupost);
		}
	});
};

/**
 * Show the current Duanzupost
 */
exports.read = function(req, res) {
	res.jsonp(req.duanzupost);
};

/**
 * Update a Duanzupost
 */
exports.update = function(req, res) {
	var duanzupost = req.duanzupost ;

	duanzupost = _.extend(duanzupost , req.body);

	duanzupost.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(duanzupost);
		}
	});
};

/**
 * Delete an Duanzupost
 */
exports.delete = function(req, res) {
	var duanzupost = req.duanzupost ;

	duanzupost.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(duanzupost);
		}
	});
};

/**
 * List of Duanzuposts
 */
exports.list = function(req, res) { 
	Duanzupost.find().sort('-created').populate('user', 'displayName').exec(function(err, duanzuposts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(duanzuposts);
		}
	});
};

/**
 * Duanzupost middleware
 */
exports.duanzupostByID = function(req, res, next, id) { 
	Duanzupost.findById(id).populate('user', 'displayName').exec(function(err, duanzupost) {
		if (err) return next(err);
		if (! duanzupost) return next(new Error('Failed to load Duanzupost ' + id));
		req.duanzupost = duanzupost ;
		next();
	});
};

/**
 * Duanzupost authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.duanzupost.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
