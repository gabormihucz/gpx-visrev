mapboxgl.accessToken =
  "pk.eyJ1IjoicG9sYXJodW4iLCJhIjoiY2pvYTZhZWJ5MGIwZjNrbXBiNTd3amJnOSJ9.xIn7UgAKh1kF2zTRc6xnxA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-8.044135, 37.063142],
  zoom: 12
});

function popLayer(index) {
  var currentRoute = "route" + index;
  if (map.getLayer(currentRoute) !== undefined) {
    map.removeLayer(currentRoute);
    map.removeSource(currentRoute);
  }
}

function flyToNext(vals) {
  var bbox = [
    [Math.min(...vals[0]), Math.min(...vals[1])],
    [Math.max(...vals[0]), Math.max(...vals[1])]
  ];
  map.fitBounds(bbox, {
    padding: { top: 10, bottom: 25, left: 15, right: 5 }
  });

  populateChart(vals[3]);
}

function populateMap(data, index, colour) {
  /*
   * Function takes the data, flies to first coordinate, and plots all coordinates.
   * It also removes previous plot from the map, we need to delete both the layer, and the source.
   * pDensity is frequency of markers, per datapoint.
   */

  // data is the GeoJSON file, extracted is the first data point of longitude, latitude, elevation
  // data.features[0].geometry.coordinates is the set of all long-lat-ele data points from the GPX
  // For time and heartbeat and other data, more digging is needed in the GeoJSON
  // properties got time, the name of the track, and type of track (e.g. running). cant find the heartrate
  const extracted = data.features[0].geometry.coordinates;

  var coord = [];
  lat = [];
  lon = [];
  elev = [];
  var currentRoute = "route" + index;
  extracted.forEach(element => {
    coord.push([element[0], element[1]]);
    lat.push(element[0]);
    lon.push(element[1]);
    elev.push(element[2]);
  });
  /** fly to the track and fit the map perfectly to it*/

  var bbox = [
    [Math.min(...lat), Math.min(...lon)],
    [Math.max(...lat), Math.max(...lon)]
  ];
  map.fitBounds(bbox, {
    padding: { top: 10, bottom: 25, left: 15, right: 5 }
  });

  popLayer(index);

  map.addLayer({
    id: currentRoute,
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
      "line-color": colour,
      "line-width": 4
    }
  });
  return [lat, lon, elev, data];
}
