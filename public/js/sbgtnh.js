var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -6.5827,
            lng: 110.8487
        },
        zoom: 11
    });

};


function jarak(alamat) {
  var a = new google.maps.DirectionsService();
  var b = new google.maps.DirectionsRenderer();

  b.setMap(map);
  b.setPanel(document.getElementById('panel-rute'));
  rute.push(b);
  var request = {
    origin: myLokasi,
    destination: marker,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  a.route(request, function(response, status) {
    if(status == google.maps.DirectionsStatus.OK) {
      b.setDirections(response);
    }
  });
};