'use strict';

// Prefroshes controller
angular.module('prefroshes').controller('PrefroshesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Prefroshes',
	function($scope, $stateParams, $location, Authentication, Prefroshes ) {
		$scope.authentication = Authentication;

		// Create new Prefrosh
		$scope.create = function() {
			// Create new Prefrosh object
			var prefrosh = new Prefroshes ({
				name: this.name,
				lunchDate: this.lunchDate,
				dinnerDate: this.dinnerDate,
				dessertDate: this.dessertDate,
				comments: this.comments,
				picture: this.picture,
				pdfInfo: this.pdfInfo,
				q1: this.q1,
				q2: this.q2,
				q3: this.q3,
				q4: this.q4,
				rating: this.q1 * (this.q2 + this.q3 + this.q4)
			});

			// Checking to see if rating works
			console.log(prefrosh.rating);

			// Redirect after save
			prefrosh.$save(function(response) {
				$location.path('prefroshes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Prefrosh
		$scope.remove = function( prefrosh ) {
			if ( prefrosh ) { prefrosh.$remove();

				for (var i in $scope.prefroshes ) {
					if ($scope.prefroshes [i] === prefrosh ) {
						$scope.prefroshes.splice(i, 1);
					}
				}
			} else {
				$scope.prefrosh.$remove(function() {
					$location.path('prefroshes');
				});
			}
		};

		// Order existing Prefrosh based on rating
		$scope.order = function( prefrosh ) {
			// Make ordering method
		};

		// Update existing Prefrosh
		$scope.update = function() {
			var prefrosh = $scope.prefrosh;
			// Checking to see if rating works
			console.log(prefrosh.rating);

			prefrosh.$update(function() {
				$location.path('prefroshes/' + prefrosh._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Prefroshes
		$scope.find = function() {
			$scope.prefroshes = Prefroshes.query();
		};

		// Find existing Prefrosh
		$scope.findOne = function() {
			$scope.prefrosh = Prefroshes.get({
				prefroshId: $stateParams.prefroshId
			});
		};

		// Find all the prefrosh on a specific lunch date
		$scope.findLunch = function() {
			$scope.prefrosh = Prefroshes.get({
				prefroshesLunch: $stateParams.prefroshLunch
			});
		};
	}
]);
