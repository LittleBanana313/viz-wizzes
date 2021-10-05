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
        .bindPopup(response[i].ofns_desc+"<br> Perp Age: "+ response[i].age_group+"<br> Perp Gender: " + response[i].perp_sex + "<br> Perp Race: " + response[i].perp_race));
    }

  }

  // Add our marker cluster layer to the map.
  mapid.addLayer(markers);


  
});

// Use this link to get the GeoJSON data.
var link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(borough) {
  if (borough == "Brooklyn") return "blue";
  else if (borough == "Bronx") return "red";
  else if (borough == "Manhattan") return "orange";
  else if (borough == "Queens") return "brown";
  else if (borough == "Staten Island") return "purple";
  else return "black";
}

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.25,
        weight: 1.5
      };
    }
  }).addTo(mapid);
});


