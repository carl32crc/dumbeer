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

	.controller( 'specController' , function ( $scope, $http, $routeParams ) {

		$scope.resultDetailsBeer = "";
    var productId = $routeParams.ID;


		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + productId;
		var imageNotFound  =  'http://www.mosaicdevelopmentfl.com/Common/images/jquery/galleria/image-not-found.png';
		$scope.imageNot = imageNotFound;

	     
			$http.get( urlApiBeers )
				.then( function( dataBeerDetail ) {
					$scope.resultDetailsBeer = dataBeerDetail.data;
				    console.log(dataBeerDetail.data);
				})
		
	})

	.controller('checkInController', function($scope, $localStorage) {
        $scope.storage = $localStorage;

        if( $scope.storage.beers === undefined){
          var beers = [
            {
              id: 1,
              name: 'Estrella',
            },
            {
              id: 2,
              name: 'Sierra Nevada',
            },
            {
              id: 3,
              name: 'New Belgium',
            }
          ];
          $scope.storage.beers = beers;   
        }         
        
        $scope.hasCheckedIn = false;
        $scope.checkIn = function(beer) {
          if($scope.hasCheckedIn === false){
            if($scope.storage.checkIn === undefined){
              $scope.storage.checkIn = [];
            }
            var date = new Date();
            var checkInObject = {
              beerId: beer.id,
              beerName: beer.name,
              date: date            
            }
            $scope.storage.checkIn.push(checkInObject)
            // $scope.hasCheckedIn = true;
          }         
        };

      })

      .controller('historyController', function($scope, $localStorage) {
        $scope.storage = $localStorage;         
      })
      
      .controller('getRatingController', function($scope, $localStorage){
        $scope.storage = $localStorage;
        $scope.rating = function(beerId){
          var beerRating = '';
          $scope.storage.beers.forEach(function(elem){
            if(elem.id === beerId){
              beerRating = elem.rating;
              
            }
          })
          return new Array(parseInt(beerRating));
        };
      })