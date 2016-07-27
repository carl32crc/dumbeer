angular.module( 'controllers', [ ] )
	
	.controller('homeController', function($scope, $http){

		$scope.resultSearchedBeers = "";

		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q=';
		var imageNotFound = '../img/image-not-found.png';
		$scope.imageNot = imageNotFound;
		$scope.submit = function() {

			var urlFinal = urlApiBeers + $scope.beerToSearch;
			$http.get( urlFinal )
				.then( function( dataBeerSearched ) {
					$scope.resultSearchedBeers = dataBeerSearched.data;
					console.log($scope.resultSearchedBeers);
				})
		}
	})

	.controller('ageController', function($scope, $localStorage) {
		$scope.storage = $localStorage;
		$scope.saveAge = function(){
			$scope.storage.oldEnough = true;
		}
	})
