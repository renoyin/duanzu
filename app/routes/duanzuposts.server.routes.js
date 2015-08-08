'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var duanzuposts = require('../../app/controllers/duanzuposts.server.controller');

	// Duanzuposts Routes
	app.route('/duanzuposts')
		.get(duanzuposts.list)
		.post(users.requiresLogin, duanzuposts.create);

	app.route('/duanzuposts/:duanzupostId')
		.get(duanzuposts.read)
		.put(users.requiresLogin, duanzuposts.hasAuthorization, duanzuposts.update)
		.delete(users.requiresLogin, duanzuposts.hasAuthorization, duanzuposts.delete);

	// Finish by binding the Duanzupost middleware
	app.param('duanzupostId', duanzuposts.duanzupostByID);
};
