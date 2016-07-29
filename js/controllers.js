angular.module( 'controllers', [ 'profileController' ] )
	.run(function($localStorage, $location){
    if($localStorage.oldEnough === false || $localStorage.oldEnough === undefined ){
      $location.path( "/" );
    }
  })
	.controller('homeController', function($scope, $http, $localStorage){

		$scope.resultSearchedBeers = "";

    $scope.storage = $localStorage;
    
		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q=';
		var imageNotFound = 'img/image-not-found.png';
		$scope.imageNot = imageNotFound;
		$scope.submit = function() {

    if ($scope.storage.searches === undefined) {
      $scope.storage.searches = []; }
      $scope.storage.searches.push({ beer : $scope.beerToSearch, url : 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q='+$scope.beerToSearch })


			var urlFinal = urlApiBeers + $scope.beerToSearch;
			$http.get( urlFinal )
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

	.controller('ageController', function($scope, $localStorage, $location) {
		$scope.storage = $localStorage;    

		$scope.saveAge = function(){
			$scope.storage.oldEnough = true;
      $location.path( "/home" );
		}
    if($scope.storage.oldEnough === true){
      $location.path( "/home" );
    }
	})

  // details

	.controller( 'specController' , function ( $scope, $http, $localStorage, $routeParams, $location ) {

    $scope.storage = $localStorage; 
		$scope.resultDetailsBeer = "";
    var productId = $routeParams.ID;
    if($routeParams.BARNAME){
      var lastChekIn = $scope.storage.checkIn.pop();
      lastChekIn.location = $routeParams.BARNAME;
      $scope.storage.checkIn.push(lastChekIn);
        $location.path( "/myprofile" );
    }
    


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
        $scope.$parent.showMap = false;
        $scope.checkIn = function(beer) {
          if($scope.hasCheckedIn === false){
            if($scope.storage.checkIn === undefined){
              $scope.storage.checkIn = [];
            }

            var date = new Date();
            var label = 'img/image-not-found.png';
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
            $scope.$parent.showMap = true;
          }         
        };

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

  .controller('regLocationController', function ( $scope, $routeParams ) {

    $scope.name = $routeParams.BARNAME;
    console.log($routeParams.BARNAME)

  })