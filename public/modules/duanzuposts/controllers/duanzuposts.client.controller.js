'use strict';


// Duanzuposts controller

// a directive overwriting the input attribute. (only when ngModel is used)
angular.module('duanzuposts').directive('input', [function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if (
                   'undefined' !== typeof attrs.type && 'number' === attrs.type && ngModel
            ) {
                ngModel.$formatters.push(function(modelValue) {
                    return Number(modelValue);
                });

                ngModel.$parsers.push(function(viewValue) {
                    return Number(viewValue);
                });
            }
        }
    };
}]);

angular.module('duanzuposts').controller('DuanzupostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Duanzuposts',
	function($scope, $stateParams, $location, Authentication, Duanzuposts) {
		$scope.authentication = Authentication;
		


   		$scope.formatDate = function(type){
   			if(type === 'start') {
   				if(typeof($scope.startDateLong) !== 'undefined') 
   					$scope.startDate = $scope.startDateLong.getMonth()+1 + '/' + $scope.startDateLong.getDate() + '/' + $scope.startDateLong.getFullYear();
   			}
   			if(type === 'end') {
   				if(typeof($scope.endDateLong) !== 'undefined') 
   					$scope.endDate = $scope.endDateLong.getMonth()+1 + '/' + $scope.endDateLong.getDate() + '/' + $scope.endDateLong.getFullYear();
   			}
   		};
		// Create new Duanzupost
		$scope.create = function() {
			// Create new Duanzupost object
			var duanzupost = new Duanzuposts ({
				title: this.title,
                startDate: this.startDate,
                endDate: this.endDate,
                community: this.community,
                price: this.price,
                phone: this.phone,
                description: this.description
			});

			// Redirect after save
			duanzupost.$save(function(response) {
				$location.path('duanzuposts/' + response._id);

				// Clear form fields
				$scope.duanzupost = null;
                
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
        
        // show post when clicking a row
        $scope.showPost = function(duanzupost) {
            $location.path('/duanzuposts/' + duanzupost._id);
        };


       
       
	}
]);