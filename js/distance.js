function totalDistance(dists){
	
	var colors = ['#0E78F6','#0E7BED', '#0F7FE4','#1082DB','#1186D3','#1289CA','#138DC1','#1490B8','#1594B0','#1697A7','#179B9E','#189E95','#19A28D',
	'#1AA584','#1BA97B','#1CAC72','#1DB06A', '#1EB361','#1FB758','#20BA4F','#21BE47','#22C13E','#23C535','#24C82C','#25CC24']
	var dist = dists;
	
	console.log(dists);
	$('#distance').css('font-weight', 'bold');
	$('#distance').text(dist + " km");
	$('#distance').css('color', getColor(dist,colors));
	

	

};

function getColor(factor,colors) {
	if (factor <= 1){
		return colors[0];
	}else if (factor >=25){
		return colors[24]
	}else{
		return colors[factor-1];
	}
};