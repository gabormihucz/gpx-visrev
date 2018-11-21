function upDown2(up) {

var chart = new CanvasJS.Chart(document.getElementById("chartContainer"), {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Summary statistics"
	},
	axisY: {
		title: "Distance travelled"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "MMbbl = one million barrels",
		dataPoints: [      
			{ y: up[0], label: "Uphill" },
			{ y: up[1],  label: "Downhill" },
			{ y: up[2],  label: "Horizontally" },

		]
	}]
});
chart.render();

}