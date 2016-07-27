window.onload = getMyLocation;

var map;

//Comprueba que el navegador tenga soporte para la geolocalizacion
function getMyLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert('Oops, no geolocation support');
  }
}

//Guarda nuestra localizacion  actual,la almacena y muestra el mapa con nuestra posicion.
function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var latLng = new google.maps.LatLng(latitude, longitude);

  showMap(latLng);

  addNearByPlaces(latLng);
  createMarker(latLng);

  //Muestra  nuestras coordenadas
  // var div = document.getElementById('location');
  // div.innerHTML = 'You are at Latitude: ' + latitude + ', Longitude: ' + longitude;
}


//Funcion para crear el  mapa
function showMap(latLng) {
  //Configuracion del mapa
  var mapOptions = {
    center: latLng,
    zoom: 18
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


//Funcion para agregar sitios cercanos
function addNearByPlaces(latLng) {

  var nearByService = new google.maps.places.PlacesService(map);

  var request = {
    location: latLng,
    radius: 100,
    types: ['bar', 'restaurant']
  };

  //nearByService.radarSearch(request, handleNearBySearchResults);
  nearByService.nearbySearch(request, handleNearBySearchResults);
  //nearByService.textSearch(request, handleNearBySearchResults);
}

//Funcion para incrementar los sitios que hemos predefinido en la funcion anterior
function handleNearBySearchResults(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(place.geometry.location, place);
    }
  }
}

//Funcion para crear los marcadores
function createMarker(latLng, placeResult) {
  
  var image ='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  var markerOptionsMyFlag = {
    position: latLng,
    map: map,
    icon: image,
    animation: google.maps.Animation.DROP,
    clickable: true
  }
 
  if (placeResult) {
    var marker = new google.maps.Marker({position: latLng, map: map, animation: google.maps.Animation.DROP, clickable: true});
    var content = placeResult.name+'<br/>'+placeResult.vicinity;
    addInfoWindow(marker, latLng, content);
  }else {
    var marker = new google.maps.Marker(markerOptionsMyFlag);
    var content = 'You are here: ' + latLng.lat() + ', ' + latLng.lng();
    addInfoWindow(marker, latLng, content);
  }

}


//funcion para agregar la informacion en la ventana
function addInfoWindow(marker, latLng, content) {
  var infoWindowOptions = {
    content: content,
    position: latLng
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map);
  });
}