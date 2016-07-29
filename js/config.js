angular.module( 'config', [] )
	
	.config( function( $routeProvider ){

			$routeProvider

				.when('/',{
					templateUrl: 'templates/age.html',
					controller: 'ageController'
				})
				.when('/home',{
					templateUrl: 'modules/home/home.html',
					controller: 'homeController'
				})
				.when('/age',{
					templateUrl: 'templates/age.html',
					controller: 'ageController'
				})
				.when('/specifications/id/:ID',{
					templateUrl: 'templates/spec.html',
					controller: 'specController'
				})
				.when('/specifications/id/:ID/bar/:BARNAME',{
					templateUrl: 'templates/spec.html',
					controller: 'specController'
				})
				.when('/myprofile',{
					templateUrl: 'templates/profile.html',
					controller: 'checkInController'
				})
				//.otherwise({ redirectTo: '/' }); ;


	})