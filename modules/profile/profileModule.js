angular.module( 'profileModule', [] )
  .controller('historyController', function($scope, $localStorage) {
    $scope.storage = $localStorage;         
  })
  .controller('getRatingController', function($scope, $localStorage){
    $scope.storage = $localStorage;
    // 
    $scope.rating = function(beerId){
      if($scope.storage.ratings[beerId] !== undefined){
        var beerRating = $scope.storage.ratings[beerId].rating;
        return new Array(parseInt(beerRating));
      }
    };
    // get inverse rating to display the "empty" stars
    $scope.ratingInv = function(beerId){
      if($scope.storage.ratings[beerId] !== undefined){
        var beerRating = $scope.storage.ratings[beerId].rating;
        return new Array(parseInt(5 - beerRating));  
      }      
    };
  })