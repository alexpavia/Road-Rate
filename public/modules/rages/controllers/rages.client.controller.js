'use strict';

// Rages controller
angular.module('rages').controller('RagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rages',
	function($scope, $stateParams, $location, Authentication, Rages ) {
		$scope.authentication = Authentication;

		// Create new Rage
		$scope.create = function() {
			// Create new Rage object
			var rage = new Rages ({
				licensePlate: this.licensePlate,
                state: this.state,
                description: this.description

			});

			// Redirect after save
			rage.$save(function(response) {
				$location.path('rages/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Rage
		$scope.remove = function( rage ) {
			if ( rage ) { rage.$remove();

				for (var i in $scope.rages ) {
					if ($scope.rages [i] === rage ) {
						$scope.rages.splice(i, 1);
					}
				}
			} else {
				$scope.rage.$remove(function() {
					$location.path('rages');
				});
			}
		};

		// Update existing Rage
		$scope.update = function() {
			var rage = $scope.rage ;

			rage.$update(function() {
				$location.path('rages/' + rage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rages
		$scope.find = function() {
			$scope.rages = Rages.query();
		};

		// Find existing Rage
		$scope.findOne = function() {
			$scope.rage = Rages.get({ 
				rageId: $stateParams.rageId
			});
		};
	}
]);