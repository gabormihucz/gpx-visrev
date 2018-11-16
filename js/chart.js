window.onload = function () {
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
	 
    labels: [1,2,3,4,5,6],
    datasets: [{ 
        data: [281.600006103515625,281.600006103515625,280.20001220703125,280.20001220703125,280.20001220703125,280.20001220703125],
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
