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
  // properties got time, the name of the track, and type of track (e.g. running). cant find the heartrate
  const extracted = data.features[0].geometry.coordinates;
  const extracted_properties = data.features[0].properties;

  const pDensity = 30;
  var coord = [];
  var elev = [];
  var points = [];
  var index = 0;
  extracted.forEach(element => {
    coord.push([element[0], element[1]]);
    elev.push(element[2]);
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


/** get distances between measured points and put them in an array */
/** have doubts about the results, need to be checked that this is working properly 
**  speeds seem to be way too low */

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
var distances  = []
var i;
for (i = 1; i < coord.length; i++) {
    distances.push((distance(coord[i-1][0],coord[i-1][1],coord[i][0],coord[i][1]))*1000)
} 

/** get the time intervals between measure points  */
times=[];
var i;
for (i = 1; i < extracted_properties.coordTimes.length; i++) {
    var d1 = new Date(extracted_properties.coordTimes[i-1]), 
        d2 = new Date(extracted_properties.coordTimes[i]);
        times.push(d2-d1);
} 

/** divide distance by time to get speed */

speeds=[]
var i;
for (i = 0; i < times.length; i++) {
    speeds.push(distances[i]/times[i]);
} 


  /** create new chart based on upload:
   *  x axis: time in ISO format, y axis: elevation
   */
  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
     
      labels: extracted_properties.coordTimes,
      datasets: [{ 
          data: elev,
          label: extracted_properties.name,
          borderColor: "#3e95cd",
          fill: true,
		  		backgroundColor: "rgba(62, 149, 205,1)",
		pointRadius: 0,
		pointBackgroundColor: "white"
        }
      ]
    },
    options: {
		
	  scales:{
		  xAxes: [{
			  gridLines : {
                display : false
			  },
			  ticks: {
				  display: false
			  }
		  }]
	  },
      title: {
        display: true,
        text: 'Elevation of the selected track',
      },
    responsive: true,
    maintainAspectRatio: false,
    }

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
