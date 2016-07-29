angular.module( 'homeModule', [ ] )
 .controller('homeController', function($scope, $http, $localStorage,homeService){

		$scope.resultSearchedBeers = "";

    $scope.storage = $localStorage;
    
		//var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q=';
		var imageNotFound = 'img/image-not-found.png';
		$scope.imageNot = imageNotFound;
		$scope.submit = function() {

    if ($scope.storage.searches === undefined) {
      $scope.storage.searches = []; }
      $scope.storage.searches.push({ beer : $scope.beerToSearch, url : 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q='+$scope.beerToSearch })

      homeService.getNameBeer( $scope.beerToSearch )
				.then( function( dataBeerSearched ) {
					$scope.resultSearchedBeers = dataBeerSearched.data;
					// console.log($scope.resultSearchedBeers);
				})
		}

    $scope.change = function() {
      var url = $scope.selectSearcher;
      $http.get( url )
        .then( function( dataBeerSearched ) {
          $scope.resultSearchedBeers = dataBeerSearched.data;
          // console.log($scope.resultSearchedBeers);
        })
    }

    $scope.advOpt = false;
    $scope.showOpt = function() {
      return ( $scope.advOpt = $scope.advOpt ? false : true )
    }
	})