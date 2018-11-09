window.onload = function () {

var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = 800,
		height = canvas.height = 400;

var stats = [40, 65, 72, 120, 210, 87, 100, 42];

context.translate(0, height);
context.scale(1, -1);

context.fillStyle = '#ffffff';
context.fillRect(0, 0, width, height);

var left = 0,
		prev_stat = stats[0],
		move_left_by = 100;

for(stat in stats) {
	the_stat = stats[stat];

	context.beginPath();
	context.moveTo(left, prev_stat);
	context.lineTo(left+move_left_by, the_stat);
	context.lineWidth = 5;
	context.lineCap = 'round';

	context.stroke();

	prev_stat = the_stat;
	left += move_left_by;

}

}