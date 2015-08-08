'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Duanzupost = mongoose.model('Duanzupost');

/**
 * Globals
 */
var user, duanzupost;

/**
 * Unit tests
 */
describe('Duanzupost Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			duanzupost = new Duanzupost({
				name: 'Duanzupost Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return duanzupost.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			duanzupost.name = '';

			return duanzupost.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Duanzupost.remove().exec();
		User.remove().exec();

		done();
	});
});