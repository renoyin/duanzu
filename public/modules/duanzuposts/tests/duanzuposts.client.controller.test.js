'use strict';

(function() {
	// Duanzuposts Controller Spec
	describe('Duanzuposts Controller Tests', function() {
		// Initialize global variables
		var DuanzupostsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Duanzuposts controller.
			DuanzupostsController = $controller('DuanzupostsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Duanzupost object fetched from XHR', inject(function(Duanzuposts) {
			// Create sample Duanzupost using the Duanzuposts service
			var sampleDuanzupost = new Duanzuposts({
				name: 'New Duanzupost'
			});

			// Create a sample Duanzuposts array that includes the new Duanzupost
			var sampleDuanzuposts = [sampleDuanzupost];

			// Set GET response
			$httpBackend.expectGET('duanzuposts').respond(sampleDuanzuposts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.duanzuposts).toEqualData(sampleDuanzuposts);
		}));

		it('$scope.findOne() should create an array with one Duanzupost object fetched from XHR using a duanzupostId URL parameter', inject(function(Duanzuposts) {
			// Define a sample Duanzupost object
			var sampleDuanzupost = new Duanzuposts({
				name: 'New Duanzupost'
			});

			// Set the URL parameter
			$stateParams.duanzupostId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/duanzuposts\/([0-9a-fA-F]{24})$/).respond(sampleDuanzupost);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.duanzupost).toEqualData(sampleDuanzupost);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Duanzuposts) {
			// Create a sample Duanzupost object
			var sampleDuanzupostPostData = new Duanzuposts({
				name: 'New Duanzupost'
			});

			// Create a sample Duanzupost response
			var sampleDuanzupostResponse = new Duanzuposts({
				_id: '525cf20451979dea2c000001',
				name: 'New Duanzupost'
			});

			// Fixture mock form input values
			scope.name = 'New Duanzupost';

			// Set POST response
			$httpBackend.expectPOST('duanzuposts', sampleDuanzupostPostData).respond(sampleDuanzupostResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Duanzupost was created
			expect($location.path()).toBe('/duanzuposts/' + sampleDuanzupostResponse._id);
		}));

		it('$scope.update() should update a valid Duanzupost', inject(function(Duanzuposts) {
			// Define a sample Duanzupost put data
			var sampleDuanzupostPutData = new Duanzuposts({
				_id: '525cf20451979dea2c000001',
				name: 'New Duanzupost'
			});

			// Mock Duanzupost in scope
			scope.duanzupost = sampleDuanzupostPutData;

			// Set PUT response
			$httpBackend.expectPUT(/duanzuposts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/duanzuposts/' + sampleDuanzupostPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid duanzupostId and remove the Duanzupost from the scope', inject(function(Duanzuposts) {
			// Create new Duanzupost object
			var sampleDuanzupost = new Duanzuposts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Duanzuposts array and include the Duanzupost
			scope.duanzuposts = [sampleDuanzupost];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/duanzuposts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDuanzupost);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.duanzuposts.length).toBe(0);
		}));
	});
}());