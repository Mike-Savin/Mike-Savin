var Canvas = (function(window) {
	var canvas = document.getElementById('graph_draw'),
		context = canvas.getContext('2d'),
		canvasWidth = document.body.offsetWidth,
		canvasHeight = parseInt(canvas.getAttribute('height')),
		drawArrow = function(x, y, angle) {
			var triaAngle1 = Math.PI / 9 + angle,
				triaAngle2 = -Math.PI / 9 + angle;
			context.beginPath();
			context.fillStyle = "#b0b0b0";
			context.moveTo(x, y);
			context.lineTo(
				x - 10 * Math.sin(triaAngle1),
				y - 10 * Math.cos(triaAngle1)
			);
			context.lineTo(
				x - 10 * Math.sin(triaAngle2),
				y - 10 * Math.cos(triaAngle2)
			);
			context.fill();
		};

	return {
		init: function() {
			canvas.setAttribute('width', document.body.offsetWidth);
			canvas.style.width = canvasWidth;
		},
		drawNode: function(x, y, value) {
			context.fillStyle = "#f0f0f0";
			context.beginPath();
			context.arc(x, y, 18, 0, 2 * Math.PI);
			context.fill();
			context.strokeStyle = "#b0b0b0";
			context.stroke();
			context.fillStyle = "#555";
			context.font = "11px Tahoma";
			context.fillText(value, x - 3 * value.toString().length, y + 5);
		},
		drawLine: function(x1, y1, x2, y2) {
			var angle = Math.atan((x2 - x1) / (y2 - y1)),
				r = 18,
				rx1 = x1 + r * Math.sin(angle),
				ry1 = y1 + r * Math.cos(angle),
				rx2 = x2 - r * Math.sin(angle),
				ry2 = y2 - r * Math.cos(angle);
			context.strokeStyle = "#b0b0b0";
			context.beginPath();
			context.moveTo(rx1, ry1);
			context.lineTo(rx2, ry2);
	        context.stroke();
	        drawArrow(rx2, ry2, angle);
		},
		clear: function() {
			context.beginPath();
			context.clearRect(0, 0, canvasWidth, canvasHeight);
		}
	};
})(window);
