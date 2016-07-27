angular.module( 'config', [] )
	
	.config( function( $routeProvider ){

			$routeProvider
				.when('/',{
					templateUrl: '/templates/home.html',
					controller: 'homeController'
				})
				.when('/age',{
					templateUrl: '/templates/age.html',
					controller: 'ageController'
				})
				.when('/specifications/:ID',{
					templateUrl: '/templates/spec.html',
					controller: 'specController'
				})
				.when('/myprofile',{
					templateUrl: '/templates/profile.html',
					controller: 'checkInController'
				})
				.otherwise({ redirectTo: '/' }); ;

	})