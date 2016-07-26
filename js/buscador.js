angular.module( 'dumbeer', [ 'ngRoute' ] )

	.controller( 'searcher' , function ( $scope, $http ) {

		$scope.resultSearchedBeers = "";

		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=';

		$scope.submit = function() {

			var urlFinal = urlApiBeers + $scope.beerToSearch;
			$http.get( urlFinal )
				.then( function( dataBeerSearched ) {
					$scope.resultSearchedBeers = dataBeerSearched.data;
					console.log($scope.resultSearchedBeers);
				})
		}
	})