'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Prefrosh = mongoose.model('Prefrosh'),
	_ = require('lodash');

/**
 * Create a Prefrosh
 */
exports.create = function(req, res) {
	var prefrosh = new Prefrosh(req.body);
	prefrosh.user = req.user;

	prefrosh.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prefrosh);
		}
	});
};

/**
 * Show the current Prefrosh
 */
exports.read = function(req, res) {
	res.jsonp(req.prefrosh);
};

/**
 * Update a Prefrosh
 */
exports.update = function(req, res) {
	var prefrosh = req.prefrosh ;

	prefrosh = _.extend(prefrosh , req.body);

	prefrosh.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prefrosh);
		}
	});
};

/**
 * Delete an Prefrosh
 */
exports.delete = function(req, res) {
	var prefrosh = req.prefrosh ;

	prefrosh.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prefrosh);
		}
	});
};

/**
 * List of Prefroshes
 */
exports.list = function(req, res) { Prefrosh.find().sort('-created').populate('user', 'displayName').exec(function(err, prefroshes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prefroshes);
		}
	});
};

/**
 * Prefrosh middleware
 */
exports.prefroshByID = function(req, res, next, id) { Prefrosh.findById(id).populate('user', 'displayName').exec(function(err, prefrosh) {
		if (err) return next(err);
		if (! prefrosh) return next(new Error('Failed to load Prefrosh ' + id));
		req.prefrosh = prefrosh ;
		next();
	});
};

/**
 * Prefrosh authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.prefrosh.user.id !== req.user.id && _.indexOf(req.user.roles, 'admin') < 0) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
