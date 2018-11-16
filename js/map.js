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
   * pDensity is frequency of markers, per datapoint.
   */

  // data is the GeoJSON file, extracted is the first data point of longitude, latitude, elevation
  // data.features[0].geometry.coordinates is the set of all long-lat-ele data points from the GPX
  // For time and heartbeat and other data, more digging is needed in the GeoJSON
  const extracted = data.features[0].geometry.coordinates;
  const pDensity = 30;
  var coord = [];
  var points = [];
  var index = 0;
  extracted.forEach(element => {
    coord.push([element[0], element[1]]);
    if (index % pDensity === 0) {
      points.push({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [element[0], element[1]]
        }
      });
    }
    index++;
  });

  /** fly to the track and fit the map perfectly to it*/
  lat = [];
  lon = [];
  coord.forEach(element => {
    lat.push(element[0]);
  });
  coord.forEach(element => {
    lon.push(element[1]);
  });

  var bbox = [
    [Math.min(...lat), Math.min(...lon)],
    [Math.max(...lat), Math.max(...lon)]
  ];
  map.fitBounds(bbox, {
    padding: { top: 10, bottom: 25, left: 15, right: 5 }
  });

  if (map.getLayer("route") !== undefined) {
    map.removeLayer("route");
    map.removeSource("route");
    map.removeLayer("points");
    map.removeSource("points");
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

  map.addLayer({
    id: "points",
    type: "circle",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: points
      }
    },
    paint: {
      "circle-color": "#32cd32"
    }
  });

  map.on("click", "points", function(e) {
    map.flyTo({ center: e.features[0].geometry.coordinates });
  });

  map.on("mouseenter", "points", function() {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "points", function() {
    map.getCanvas().style.cursor = "";
  });
}
