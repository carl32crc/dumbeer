angular.module('homeService',[])
	.factory('homeService', function ($http) {

		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/beers?q=<ID-BEER>';

		function getNameBeer ( nameBeer ) {
			var url  = urlApiBeers.replace('<ID-BEER>', nameBeer)
			return 	$http.get(url)
		}

		return {
			getNameBeer : getNameBeer
		}

})