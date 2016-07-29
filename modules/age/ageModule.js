angular.module('ageModule', [])
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