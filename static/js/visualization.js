//   Trying to build a histogram that includes type of offense (misdemeanor, violation felony) on x-axis and
// count of offenses on the y-axis
  
  function buildCharts(sample) {
  
    // Use `d3.json` to fetch the sample data for the plots
    d3.json("../../nyc_crime.json").then((data) => {
      var samples = data.samples;
      var meta = data.metadata.filter(sampleobject => 
        sampleobject.id == sample);
     var mapid = L.map("map", {
  center: [40.7128, -74.0060],
  zoom: 12
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapid);

// Connect crime database
var data = 'http://127.0.0.1:5000/db_call'
console.log(data)


d3.json(data).then(function(response) {

  // Create a new marker cluster group.
  var markers = L.markerClusterGroup();

  // Loop through the data.
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable.
    var location1 = response[i].latitude;
    var location2 = response[i].longitude;

    // Check for the location property.
    if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([location1, location2])
        .bindPopup(response[i].ofns_desc));
    }

  }

  // Add our marker cluster layer to the map.
  mapid.addLayer(markers);

});

