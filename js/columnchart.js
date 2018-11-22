function upDown2(up) {

var chart = new CanvasJS.Chart(document.getElementById("chartContainer"), {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Distance travelled"
	},

	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##\" m\"",
		indexLabel: "{label} {y}",
		dataPoints: [
			{ y: up[0], label: "Uphill" },
			{ y: up[1],  label: "Downhill" },
			{ y: up[2],  label: "Horizontally" },

		]
	}]
});
chart.render();

}
