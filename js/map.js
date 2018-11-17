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
}

function populateMap(data, index) {
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
  const extracted_properties = data.features[0].properties;
  var speeds = [];
  var elev = [];
  var coord = [];
  lat = [];
  lon = [];
  var currentRoute = "route" + index;
  extracted.forEach(element => {
    coord.push([element[0], element[1]]);
    lat.push(element[0]);
    lon.push(element[1]);
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

  /** get distances between measured points and put them in an array */

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  var distances = [];
  var i;
  for (i = 1; i < coord.length; i++) {
    distances.push(
      distance(coord[i - 1][0], coord[i - 1][1], coord[i][0], coord[i][1]) *
        1000
    );
  }

  /** get the time intervals between measure points  */
  times = [];
  var i;
  for (i = 1; i < extracted_properties.coordTimes.length; i++) {
    var d1 = new Date(extracted_properties.coordTimes[i - 1]),
      d2 = new Date(extracted_properties.coordTimes[i]);
    times.push((d2 - d1) / 1000);
  }

  /** divide distance by time to get speed */

  var i;
  for (i = 0; i < times.length; i++) {
    speeds.push(distances[i] / times[i]);
  }
  //console.log(distances);
  averageSpeed(speeds);
  totalDistance(distances);

  /** create new chart based on upload:
   *  x axis: time in ISO format, y axis: elevation
   */
  new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: extracted_properties.coordTimes,
      datasets: [
        {
          data: elev,
          label: extracted_properties.name,
          borderColor: "#3e95cd",
          fill: true,
          backgroundColor: "rgba(62, 149, 205,0.8)",
          pointRadius: 0,
          pointBackgroundColor: "white"
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        ]
      },
      title: {
        display: true,
        text: "Elevation of the selected track"
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  var colour = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

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
  return [lat, lon];
}
