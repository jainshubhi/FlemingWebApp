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


		// var Quicksort = (function() {
		//
		//   /**
		//    * Swaps two values in the heap
		//    *
		//    * @param {int} indexA Index of the first item to be swapped
		//    * @param {int} indexB Index of the second item to be swapped
		//    */
		//   function swap(array, indexA, indexB) {
		//     var temp = array[indexA];
		//     array[indexA] = array[indexB];
		//     array[indexB] = temp;
		//   }
		//
		//   /**
		//    * Partitions the (sub)array into values less than and greater
		//    * than the pivot value
		//    *
		//    * @param {Array} array The target array
		//    * @param {int} pivot The index of the pivot
		//    * @param {int} left The index of the leftmost element
		//    * @param {int} left The index of the rightmost element
		//    */
		//   function partition(array, pivot, left, right) {
		//
		//     var storeIndex = left,
		//         pivotValue = array[pivot];
		//
		//     // put the pivot on the right
		//     swap(array, pivot, right);
		//
		//     // go through the rest
		//     for(var v = left; v < right; v++) {
		//
		//       // if the value is less than the pivot's
		//       // value put it to the left of the pivot
		//       // point and move the pivot point along one
		//       if(array[v] < pivotValue) {
		//         swap(array, v, storeIndex);
		//         storeIndex++;
		//       }
		//     }
		//
		//     // finally put the pivot in the correct place
		//     swap(array, right, storeIndex);
		//
		//     return storeIndex;
		//   }
		//
		//   /**
		//    * Sorts the (sub-)array
		//    *
		//    * @param {Array} array The target array
		//    * @param {int} left The index of the leftmost element, defaults 0
		//    * @param {int} left The index of the rightmost element,
		//    defaults array.length-1
		//    */
		//   function sort(array, left, right) {
		//
		//     var pivot = null;
		//
		//     if(typeof left !== 'number') {
		//       left = 0;
		//     }
		//
		//     if(typeof right !== 'number') {
		//       right = array.length - 1;
		//     }
		//
		//     // effectively set our base
		//     // case here. When left == right
		//     // we'll stop
		//     if(left < right) {
		//
		//       // pick a pivot between left and right
		//       // and update it once we've partitioned
		//       // the array to values < than or > than
		//       // the pivot value
		//       pivot     = left + Math.ceil((right - left) * 0.5);
		//       newPivot  = partition(array, pivot, left, right);
		//
		//       // recursively sort to the left and right
		//       sort(array, left, newPivot - 1);
		//       sort(array, newPivot + 1, right);
		//     }
		//
		//   }
		//
		//   return {
		//     sort: sort
		//   };
		//
		// })();


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
