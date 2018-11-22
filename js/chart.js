var currentChart;
window.onload = function() {
  currentChart = new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          data: [4, 5, 77, 6, 5],
          label: "Track1",
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
              display: true,
              autoSkip: true,
              autoSkipPadding: 30,
              maxRotation: 0
            }
          }
        ]
      },
      title: {
        display: true,
        text: "Elevation & Speed of the selected track"
      },

      responsive: true,
      maintainAspectRatio: false
    }
  });

  var currentWindowHeight = $(window).height();
};

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
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

  var distances = [];
  var i;
  for (i = 1; i < coord.length; i++) {
    distances.push(
      distance(coord[i - 1][0], coord[i - 1][1], coord[i][0], coord[i][1]) *
        1000
    );
  }

  /** times the time intervals between measure points
   *  times_stamps stores the actual time at measure points as strings i.e. hh:mm:ss
   */

  times = [];
  var time_stamps = [];
  var i;
  for (i = 1; i < extracted_properties.coordTimes.length; i++) {
    var d1 = new Date(extracted_properties.coordTimes[i - 1]),
      d2 = new Date(extracted_properties.coordTimes[i]);
    times.push((d2 - d1) / 1000);
    d1 = d1 + "";
    split_date = d1.split(" ");
    time_stamps.push(split_date[4]);
    if (i === extracted_properties.coordTimes.length - 1) {
      d2 = d2 + "";
      split_date = d2.split(" ");
      time_stamps.push(split_date[4]);
    }
  }
  var start_time = new Date(extracted_properties.coordTimes[0]);
  var end_time = new Date(
    extracted_properties.coordTimes[extracted_properties.coordTimes.length - 1]
  );
  var time_spent = (end_time - start_time) / 1000; // total time spent running in seconds
  var dmy = start_time + "";
  dmy = dmy.slice(0, 15); // date of the run, e.g. Sat Aug 27 2017

  /** divide distance by time to get speed */

  for (var i = 0; i < times.length; i++) {
    speeds.push((distances[i] / times[i]) * 3.6);
  }
  //console.log(distances);
  averageSpeed(speeds);
  totalDistance(distances);
  timeSpent(time_spent);

  /** up_and_down stores distance taken going uphill (first element), downhill (second element) and going on a flat surface (third element) in meters*/
  up_and_down = [0, 0, 0];
  elev_diff = [];
  for (var i = 1; i < elev.length; i++) {
    elev_diff.push(elev[i] - elev[i - 1]);
  }

  for (var i = 0; i < elev_diff.length; i++) {
    var tiny_dist = distance(lat[i - 1], lon[i - 1], lat[i], lon[i]) * 1000;
    if (elev_diff[i] > 0 && !isNaN(tiny_dist)) {
      up_and_down[0] += tiny_dist;
    } else if (elev_diff[i] < 0 && !isNaN(tiny_dist)) {
      up_and_down[1] += tiny_dist;
    } else {
      if (!isNaN(tiny_dist)) {
        up_and_down[2] += tiny_dist;
      }
    }
  }
  for (var i = 0; i < up_and_down.length; i++) {
    up_and_down[i] = Math.round(up_and_down[i]);
  }

  //upDown(up_and_down);
  upDown2(up_and_down); //commenting it out since not in use

  if (currentChart !== undefined) {
    currentChart.destroy();
  }

  currentChart = new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: time_stamps,
      datasets: [
        {
          data: speeds,
          label: "Speed in km/h (y-left)",
          borderColor: "#ff1a1a",
          fill: false,
          backgroundColor: "rgba(255, 26, 26,0.3)",
          pointRadius: 0,
          pointBackgroundColor: "white",
          yAxisID: "A"
        },

        {
          data: elev,
          label: "Elevation in meters (y-right)",
          borderColor: "#3e95cd",
          fill: false,
          backgroundColor: "rgba(62, 149, 205,0.8)",
          pointRadius: 0,
          pointBackgroundColor: "white",
          yAxisID: "B"
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
              display: true,
              autoSkip: true,
              autoSkipPadding: 30,
              maxRotation: 0,
              mirror: true
            }
          }
        ],

        yAxes: [
          {
            id: "A",
            type: "linear",
            position: "left"
          },
          {
            id: "B",
            type: "linear",
            position: "right"
          }
        ]
      },
      title: {
        display: true,
        text: extracted_properties.name
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
