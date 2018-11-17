function averageSpeed(speeds) {
	
	var colors = ['#0E78F6','#0E7BED', '#0F7FE4','#1082DB','#1186D3','#1289CA','#138DC1','#1490B8','#1594B0','#1697A7','#179B9E','#189E95','#19A28D',
	'#1AA584','#1BA97B','#1CAC72','#1DB06A', '#1EB361','#1FB758','#20BA4F','#21BE47','#22C13E','#23C535','#24C82C','#25CC24']
	
	var total = 0;
	for(var i = 0; i < speeds.length; i++) {
		total += speeds[i];
	}
	var avg = Math.round(total / speeds.length);
	
	$('#speed').css('font-weight', 'bold');
	$('#speed').text(avg + " km/h");
	$('#speed').css('color', getColor(avg,colors));
	$('.grad').css('visibility', 'visible');

};

function getColor(factor,colors) {
	if (factor <= 5){
		return colors[0];
	}else if (factor >=30){
		return colors[24]
	}else{
		return colors[factor-5];
	}
};