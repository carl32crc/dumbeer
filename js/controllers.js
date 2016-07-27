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

    $scope.advOpt = false;
    $scope.showOpt = function() {
      return ( $scope.advOpt = $scope.advOpt ? false : true )
    }
	})

	.controller('ageController', function($scope, $localStorage) {
		$scope.storage = $localStorage;
		$scope.saveAge = function(){
			$scope.storage.oldEnough = true;
		}
	})

	.controller( 'specController' , function ( $scope, $http, $localStorage, $routeParams ) {

    $scope.storage = $localStorage; 
		$scope.resultDetailsBeer = "";
    var productId = $routeParams.ID;

    


		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + productId;
		var imageNotFound  =  'http://www.mosaicdevelopmentfl.com/Common/images/jquery/galleria/image-not-found.png';
		$scope.imageNot = imageNotFound;


	     
			$http.get( urlApiBeers )
				.then( function( dataBeerDetail ) {
					$scope.resultDetailsBeer = dataBeerDetail.data;
				    console.log(dataBeerDetail.data);
            var beerId = dataBeerDetail.data.id;
            if($scope.storage.ratings !== undefined){
              if($scope.storage.ratings[beerId].rating !== undefined){
                var rating = $scope.storage.ratings[beerId].rating;

                $scope.selectedRating = rating;
                
                
              }
            }
				})
		
	})

	.controller('checkInController', function($scope, $localStorage) {
        $scope.storage = $localStorage;        
        $scope.hasCheckedIn = false;
        $scope.checkIn = function(beer) {
          if($scope.hasCheckedIn === false){
            if($scope.storage.checkIn === undefined){
              $scope.storage.checkIn = [];
            }

            var date = new Date();
            var label = 'http://www.mosaicdevelopmentfl.com/Common/images/jquery/galleria/image-not-found.png';

            if(beer.labels !== undefined){
              label = beer.labels.medium;
            }
            var checkInObject = {
              beerId: beer.id,
              beerName: beer.name,
              date: date,
              label: label           
            }
            $scope.storage.checkIn.push(checkInObject)
            $scope.hasCheckedIn = true;
          }         
        };

      })

      .controller('historyController', function($scope, $localStorage) {
        $scope.storage = $localStorage;         
      })
      
      .controller('ratingController', function($scope, $localStorage) {
        $scope.storage = $localStorage; 
        
        $scope.rate = function(beerObj){
          if($scope.storage.ratings === undefined){
            $scope.storage.ratings = {};
          }
          $scope.storage.ratings[beerObj.id] = {
            name: beerObj.name,
            rating: beerObj.rating
          }
        }
      })

      .controller('getRatingController', function($scope, $localStorage){
        $scope.storage = $localStorage;
        $scope.rating = function(beerId){
          if($scope.storage.ratings[beerId] !== undefined){
            var beerRating = $scope.storage.ratings[beerId].rating;
            return new Array(parseInt(beerRating));
          }
        };

        $scope.ratingInv = function(beerId){
          if($scope.storage.ratings[beerId] !== undefined){
            var beerRating = $scope.storage.ratings[beerId].rating;
            return new Array(parseInt(5 - beerRating));  
          }
          
        };
      })

