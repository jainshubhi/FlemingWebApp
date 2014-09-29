'use strict';

(function() {
	// Prefroshes Controller Spec
	describe('Prefroshes Controller Tests', function() {
		// Initialize global variables
		var PrefroshesController,
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

			// Initialize the Prefroshes controller.
			PrefroshesController = $controller('PrefroshesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Prefrosh object fetched from XHR', inject(function(Prefroshes) {
			// Create sample Prefrosh using the Prefroshes service
			var samplePrefrosh = new Prefroshes({
				name: 'New Prefrosh'
			});

			// Create a sample Prefroshes array that includes the new Prefrosh
			var samplePrefroshes = [samplePrefrosh];

			// Set GET response
			$httpBackend.expectGET('prefroshes').respond(samplePrefroshes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.prefroshes).toEqualData(samplePrefroshes);
		}));

		it('$scope.findOne() should create an array with one Prefrosh object fetched from XHR using a prefroshId URL parameter', inject(function(Prefroshes) {
			// Define a sample Prefrosh object
			var samplePrefrosh = new Prefroshes({
				name: 'New Prefrosh'
			});

			// Set the URL parameter
			$stateParams.prefroshId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/prefroshes\/([0-9a-fA-F]{24})$/).respond(samplePrefrosh);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.prefrosh).toEqualData(samplePrefrosh);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Prefroshes) {
			// Create a sample Prefrosh object
			var samplePrefroshPostData = new Prefroshes({
				name: 'New Prefrosh'
			});

			// Create a sample Prefrosh response
			var samplePrefroshResponse = new Prefroshes({
				_id: '525cf20451979dea2c000001',
				name: 'New Prefrosh'
			});

			// Fixture mock form input values
			scope.name = 'New Prefrosh';

			// Set POST response
			$httpBackend.expectPOST('prefroshes', samplePrefroshPostData).respond(samplePrefroshResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Prefrosh was created
			expect($location.path()).toBe('/prefroshes/' + samplePrefroshResponse._id);
		}));

		it('$scope.update() should update a valid Prefrosh', inject(function(Prefroshes) {
			// Define a sample Prefrosh put data
			var samplePrefroshPutData = new Prefroshes({
				_id: '525cf20451979dea2c000001',
				name: 'New Prefrosh'
			});

			// Mock Prefrosh in scope
			scope.prefrosh = samplePrefroshPutData;

			// Set PUT response
			$httpBackend.expectPUT(/prefroshes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/prefroshes/' + samplePrefroshPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid prefroshId and remove the Prefrosh from the scope', inject(function(Prefroshes) {
			// Create new Prefrosh object
			var samplePrefrosh = new Prefroshes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Prefroshes array and include the Prefrosh
			scope.prefroshes = [samplePrefrosh];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/prefroshes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePrefrosh);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.prefroshes.length).toBe(0);
		}));
	});
}());