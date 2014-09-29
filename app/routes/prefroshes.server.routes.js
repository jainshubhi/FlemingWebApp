'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var prefroshes = require('../../app/controllers/prefroshes');

	// Prefroshes Routes
	app.route('/prefroshes')
		.get(prefroshes.list)
		.post(users.requiresLogin, prefroshes.create);

	app.route('/prefroshes/:prefroshId')
		.get(prefroshes.read)
		.put(users.requiresLogin, prefroshes.hasAuthorization, prefroshes.update)
		.delete(users.requiresLogin, prefroshes.hasAuthorization, prefroshes.delete);

	// Finish by binding the Prefrosh middleware
	app.param('prefroshId', prefroshes.prefroshByID);
};