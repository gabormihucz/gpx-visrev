mapboxgl.accessToken =
  "pk.eyJ1IjoicG9sYXJodW4iLCJhIjoiY2pvYTZhZWJ5MGIwZjNrbXBiNTd3amJnOSJ9.xIn7UgAKh1kF2zTRc6xnxA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-8.044135, 37.063142],
  zoom: 12
});

function populateMap(data) {
  /*
   * Function takes the data, flies to first coordinate, and plots all coordinates.
   * It also removes previous plot from the map, we need to delete both the layer, and the source.
   */

  // data is the GeoJSON file, extracted is the first data point of longitude, latitude, elevation
  // data.features[0].geometry.coordinates is the set of all long-lat-ele data points from the GPX
  // For time and heartbeat and other data, more digging is needed in the GeoJSON
  var extracted = data.features[0].geometry.coordinates;
  var coord = [];
  extracted.forEach(element => {
    coord.push([element[0], element[1]]);
  });
  map.flyTo({
    center: [extracted[0][0], extracted[0][1]],
    zoom: 14
  });

  if (map.getLayer("route") !== undefined) {
    map.removeLayer("route");
    map.removeSource("route");
  }

  map.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coord
        }
      }
    },
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#ff69b4",
      "line-width": 4
    }
  });
}
