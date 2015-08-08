'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Duanzupost = mongoose.model('Duanzupost'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, duanzupost;

/**
 * Duanzupost routes tests
 */
describe('Duanzupost CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Duanzupost
		user.save(function() {
			duanzupost = {
				name: 'Duanzupost Name'
			};

			done();
		});
	});

	it('should be able to save Duanzupost instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Duanzupost
				agent.post('/duanzuposts')
					.send(duanzupost)
					.expect(200)
					.end(function(duanzupostSaveErr, duanzupostSaveRes) {
						// Handle Duanzupost save error
						if (duanzupostSaveErr) done(duanzupostSaveErr);

						// Get a list of Duanzuposts
						agent.get('/duanzuposts')
							.end(function(duanzupostsGetErr, duanzupostsGetRes) {
								// Handle Duanzupost save error
								if (duanzupostsGetErr) done(duanzupostsGetErr);

								// Get Duanzuposts list
								var duanzuposts = duanzupostsGetRes.body;

								// Set assertions
								(duanzuposts[0].user._id).should.equal(userId);
								(duanzuposts[0].name).should.match('Duanzupost Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Duanzupost instance if not logged in', function(done) {
		agent.post('/duanzuposts')
			.send(duanzupost)
			.expect(401)
			.end(function(duanzupostSaveErr, duanzupostSaveRes) {
				// Call the assertion callback
				done(duanzupostSaveErr);
			});
	});

	it('should not be able to save Duanzupost instance if no name is provided', function(done) {
		// Invalidate name field
		duanzupost.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Duanzupost
				agent.post('/duanzuposts')
					.send(duanzupost)
					.expect(400)
					.end(function(duanzupostSaveErr, duanzupostSaveRes) {
						// Set message assertion
						(duanzupostSaveRes.body.message).should.match('Please fill Duanzupost name');
						
						// Handle Duanzupost save error
						done(duanzupostSaveErr);
					});
			});
	});

	it('should be able to update Duanzupost instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Duanzupost
				agent.post('/duanzuposts')
					.send(duanzupost)
					.expect(200)
					.end(function(duanzupostSaveErr, duanzupostSaveRes) {
						// Handle Duanzupost save error
						if (duanzupostSaveErr) done(duanzupostSaveErr);

						// Update Duanzupost name
						duanzupost.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Duanzupost
						agent.put('/duanzuposts/' + duanzupostSaveRes.body._id)
							.send(duanzupost)
							.expect(200)
							.end(function(duanzupostUpdateErr, duanzupostUpdateRes) {
								// Handle Duanzupost update error
								if (duanzupostUpdateErr) done(duanzupostUpdateErr);

								// Set assertions
								(duanzupostUpdateRes.body._id).should.equal(duanzupostSaveRes.body._id);
								(duanzupostUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Duanzuposts if not signed in', function(done) {
		// Create new Duanzupost model instance
		var duanzupostObj = new Duanzupost(duanzupost);

		// Save the Duanzupost
		duanzupostObj.save(function() {
			// Request Duanzuposts
			request(app).get('/duanzuposts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Duanzupost if not signed in', function(done) {
		// Create new Duanzupost model instance
		var duanzupostObj = new Duanzupost(duanzupost);

		// Save the Duanzupost
		duanzupostObj.save(function() {
			request(app).get('/duanzuposts/' + duanzupostObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', duanzupost.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Duanzupost instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Duanzupost
				agent.post('/duanzuposts')
					.send(duanzupost)
					.expect(200)
					.end(function(duanzupostSaveErr, duanzupostSaveRes) {
						// Handle Duanzupost save error
						if (duanzupostSaveErr) done(duanzupostSaveErr);

						// Delete existing Duanzupost
						agent.delete('/duanzuposts/' + duanzupostSaveRes.body._id)
							.send(duanzupost)
							.expect(200)
							.end(function(duanzupostDeleteErr, duanzupostDeleteRes) {
								// Handle Duanzupost error error
								if (duanzupostDeleteErr) done(duanzupostDeleteErr);

								// Set assertions
								(duanzupostDeleteRes.body._id).should.equal(duanzupostSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Duanzupost instance if not signed in', function(done) {
		// Set Duanzupost user 
		duanzupost.user = user;

		// Create new Duanzupost model instance
		var duanzupostObj = new Duanzupost(duanzupost);

		// Save the Duanzupost
		duanzupostObj.save(function() {
			// Try deleting Duanzupost
			request(app).delete('/duanzuposts/' + duanzupostObj._id)
			.expect(401)
			.end(function(duanzupostDeleteErr, duanzupostDeleteRes) {
				// Set message assertion
				(duanzupostDeleteRes.body.message).should.match('User is not logged in');

				// Handle Duanzupost error error
				done(duanzupostDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Duanzupost.remove().exec();
		done();
	});
});