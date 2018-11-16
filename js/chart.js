window.onload = function () {
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
	
    labels: [1,2,3,4,5],
    datasets: [{ 
        data: [4,5,77,6,5],
        label: "Track1",
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

var currentWindowHeight = $(window).height()

}
