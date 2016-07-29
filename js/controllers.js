angular.module( 'controllers', [ 'profileModule', 'ageModule', 'specModule' ] )

	.run(function($localStorage, $location){
    if($localStorage.oldEnough === false || $localStorage.oldEnough === undefined ){
      $location.path( "/" );
    }
  })
