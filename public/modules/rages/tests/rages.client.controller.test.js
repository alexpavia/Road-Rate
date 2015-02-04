'use strict';

(function() {
	// Rages Controller Spec
	describe('Rages Controller Tests', function() {
		// Initialize global variables
		var RagesController,
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

			// Initialize the Rages controller.
			RagesController = $controller('RagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rage object fetched from XHR', inject(function(Rages) {
			// Create sample Rage using the Rages service
			var sampleRage = new Rages({
				name: 'New Rage'
			});

			// Create a sample Rages array that includes the new Rage
			var sampleRages = [sampleRage];

			// Set GET response
			$httpBackend.expectGET('rages').respond(sampleRages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rages).toEqualData(sampleRages);
		}));

		it('$scope.findOne() should create an array with one Rage object fetched from XHR using a rageId URL parameter', inject(function(Rages) {
			// Define a sample Rage object
			var sampleRage = new Rages({
				name: 'New Rage'
			});

			// Set the URL parameter
			$stateParams.rageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/rages\/([0-9a-fA-F]{24})$/).respond(sampleRage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rage).toEqualData(sampleRage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Rages) {
			// Create a sample Rage object
			var sampleRagePostData = new Rages({
				name: 'New Rage'
			});

			// Create a sample Rage response
			var sampleRageResponse = new Rages({
				_id: '525cf20451979dea2c000001',
				name: 'New Rage'
			});

			// Fixture mock form input values
			scope.name = 'New Rage';

			// Set POST response
			$httpBackend.expectPOST('rages', sampleRagePostData).respond(sampleRageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rage was created
			expect($location.path()).toBe('/rages/' + sampleRageResponse._id);
		}));

		it('$scope.update() should update a valid Rage', inject(function(Rages) {
			// Define a sample Rage put data
			var sampleRagePutData = new Rages({
				_id: '525cf20451979dea2c000001',
				name: 'New Rage'
			});

			// Mock Rage in scope
			scope.rage = sampleRagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/rages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rages/' + sampleRagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rageId and remove the Rage from the scope', inject(function(Rages) {
			// Create new Rage object
			var sampleRage = new Rages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rages array and include the Rage
			scope.rages = [sampleRage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/rages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rages.length).toBe(0);
		}));
	});
}());