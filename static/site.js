let map;
let userLoc;

function displayStop(stop){
   
    let wholeName = `${stop.desc}, ${stop.locid}`;
    let userFormat = $("<div>", {"class": "col-md-3 myClass"});
    userFormat.append(wholeName);
    $("#theStops").append(userFormat);
    
}

function makeMarker(lat, lng){
    var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map
  });
    
}

function makeMap(lat, lng) {
  var pos = {lat: lat, lng: lng};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: pos
  });
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
    
}

function initMap() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
        makeMap(position.coords.latitude, position.coords.longitude);
        userLoc = {lat: position.coords.latitude, lng: position.coords.longitude};
    });
}

function parseData(response){
    let stops = response.resultSet.location;
    for(let i = 0; i < stops.length; i++) {
        let stop = stops[i];
        console.log(stop);
        makeMarker(stop.lat, stop.lng);
        displayStop(stop);
    }
    
}

function fetchStops(){
    let userLocString = `${userLoc.lat}, ${userLoc.lng}`;
    $.ajax({
        url: 'https://developer.trimet.org/ws/V1/stops',
        method: 'GET',
        data: {'appID': '0747A7D40451AA2D655957D56', 'json': 'true', 'll': userLocString, 'meters': '250' },
        // response Callbacks Below 
        success: function(response){
            parseData(response);
        }, 
        error: function(err){
            console.log(err);
        }
	
    });

}

$('button').on('click', function(evt){
    evt.preventDefault();
    fetchStops();

});