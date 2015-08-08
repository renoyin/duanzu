'use strict';

// Duanzuposts controller
angular.module('duanzuposts').controller('DuanzupostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Duanzuposts',
	function($scope, $stateParams, $location, Authentication, Duanzuposts) {
		$scope.authentication = Authentication;

		// Create new Duanzupost
		$scope.create = function() {
			// Create new Duanzupost object
			var duanzupost = new Duanzuposts ({
				name: this.name
			});

			// Redirect after save
			duanzupost.$save(function(response) {
				$location.path('duanzuposts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Duanzupost
		$scope.remove = function(duanzupost) {
			if ( duanzupost ) { 
				duanzupost.$remove();

				for (var i in $scope.duanzuposts) {
					if ($scope.duanzuposts [i] === duanzupost) {
						$scope.duanzuposts.splice(i, 1);
					}
				}
			} else {
				$scope.duanzupost.$remove(function() {
					$location.path('duanzuposts');
				});
			}
		};

		// Update existing Duanzupost
		$scope.update = function() {
			var duanzupost = $scope.duanzupost;

			duanzupost.$update(function() {
				$location.path('duanzuposts/' + duanzupost._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Duanzuposts
		$scope.find = function() {
			$scope.duanzuposts = Duanzuposts.query();
		};

		// Find existing Duanzupost
		$scope.findOne = function() {
			$scope.duanzupost = Duanzuposts.get({ 
				duanzupostId: $stateParams.duanzupostId
			});
		};
	}
]);