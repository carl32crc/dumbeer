angular.module( 'specModule', [] )


	.controller( 'specController' , function ( $scope, $localStorage, $routeParams, $location,  specServices) {

    $scope.storage = $localStorage; 
		$scope.resultDetailsBeer = "";
    var productId = $routeParams.ID;

    if($routeParams.BARNAME){
      var lastChekIn = $scope.storage.checkIn.pop();
      lastChekIn.location = $routeParams.BARNAME;
      $scope.storage.checkIn.push(lastChekIn);
        $location.path( "/myprofile" );
    }

		var imageNotFound  =  'http://www.mosaicdevelopmentfl.com/Common/images/jquery/galleria/image-not-found.png';
		$scope.imageNot = imageNotFound;

    specServices.getInfoBeer ( productId )
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


	.controller('checkInController', function($scope, $localStorage, $location, $anchorScroll) {

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

        // $location.hash('map')
        // $anchorScroll();
      }         
    }
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
  })