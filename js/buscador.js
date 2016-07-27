console.log("aaaa")
angular.module( 'dumbeer', [ 'ngRoute' ] )

	.controller( 'searcher' , function ( $scope, $http ) {

		$scope.resultSearchedBeers = "";

		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q=';
		var imageNotFound  =  'http://www.mosaicdevelopmentfl.com/Common/images/jquery/galleria/image-not-found.png';
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


	.controller( 'details' , function ( $scope, $http ) {

		$scope.resultDetailsBeer = "";


		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/beer/Zp50jX';
		var imageNotFound  =  'http://www.mosaicdevelopmentfl.com/Common/images/jquery/galleria/image-not-found.png';
		$scope.imageNot = imageNotFound;

	     
			$http.get( urlApiBeers )
				.then( function( dataBeerDetail ) {
					$scope.resultDetailsBeer = dataBeerDetail.data;
				    console.log(dataBeerDetail.data);
				})
		
	})