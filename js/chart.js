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
