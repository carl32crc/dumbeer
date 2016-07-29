angular.module( 'config', [] )
	
	.config( function( $routeProvider ){

			$routeProvider

				.when('/',{
					templateUrl: 'modules/age/age.html',
					controller: 'ageController'
				})
				.when('/home',{
					templateUrl: 'templates/home.html',
					controller: 'homeController'
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
					templateUrl: 'modules/profile/profile.html',
					controller: 'historyController'
				})
				//.otherwise({ redirectTo: '/' }); ;


	})