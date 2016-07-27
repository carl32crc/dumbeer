angular.module( 'controllers', [ ] )
	
	.controller('homeController', function($scope){

	})

	.controller('ageController', function($scope, $localStorage) {
		$scope.storage = $localStorage;
		$scope.saveAge = function(){
			$scope.storage.oldEnough = true;
		}
	})