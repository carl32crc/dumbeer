angular.module('specServices', [])

	.factory('specServices', function($http) {

		var urlApiBeers = 'https://quiet-inlet-67115.herokuapp.com/api/beer/<ID-BEER>';

		function getInfoBeer ( idBeer ) {
			var url = urlApiBeers.replace('<ID-BEER>', idBeer)
			return $http.get(url);
		}

		return {
			getInfoBeer : getInfoBeer
		}

	})
	
