var mapid = L.map("mapid", {
  center: [40.7128, -74.0060],
  zoom: 13
});
6
setTimeout(function(){ map.invalidateSize()}, 400);

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapid);

// Connect crime database
var data = '../../nyc_crime.json'
console.log(data)


d3.json(data).then(function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location1 = response[i].latitude;
    var location2 = response[i].longitude;
    var location = [location1, location2]

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(mapid);

});
