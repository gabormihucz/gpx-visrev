window.onload = function () {
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
	 
    labels: [0,0,0,0,0,0],
    datasets: [{ 
        data: [0,0,0,0,0,0],
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
