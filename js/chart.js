window.onload = function () {
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
	
    labels: [1,2,3,4,5],
    datasets: [{ 
        data: [4,5,77,6,5],
        label: "Track1",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Elevation of the selected track',
    },
	responsive: true,
	maintainAspectRatio: false,
  }
});

var currentWindowHeight = $(window).height()

}

function populateChart(data) {
  const extracted = data.features[0].geometry.coordinates;
  const extracted_properties = data.features[0].properties;
  var speeds = [];
  var elev = [];
  var coord = [];
  lat = [];
  lon = [];

  extracted.forEach(element => {
    coord.push([element[0], element[1]]);
    lat.push(element[0]);
    lon.push(element[1]);
    elev.push(element[2]);
  });


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
  console.log(speeds);

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
}