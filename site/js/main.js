"use strict";
var context;

function htmlColor(r,g,b, a) {
	r = r*1 << 0;
	g = g*1 << 0;
	b = b*1 << 0;
	if (typeof a != typeof 1) {
		a = 1;
	}
	return "rgba(" + r +  "," + g + "," + b + "," + a +")";
}

function documentKeyUp(e) {
	// e.keyCode is a number representing key (ASCII for those)

}

function documentKeyDown(e) {
	// e.keyCode is a number representing key (ASCII for those)

}

function documentMouseDown(e) {
	// offsetX, offsetY

}
function documentMouseUp(e) {
	// offsetX, offsetY

}
function documentMouseMove(e) {
	// offsetX, offsetY

}

document.onkeyup = documentKeyUp;
document.onkeydown = documentKeyDown;

function main() {
	// Document & Canvas Setup
	htmlcanvas.width = 800;
	htmlcanvas.height = 600;
	htmlcanvas.style.background = "#F0F";
	context = htmlcanvas.getContext("2d");
	htmlcanvas.onmousedown = documentMouseDown;
	htmlcanvas.onmouseup = documentMouseUp;
	htmlcanvas.onmousemove = documentMouseMove;
	// World Setup

	// Begin Render Loop
	render();
}

function render() {
	// Examples of Drawing Polygon
	context.fillStyle = htmlColor( 50 , 100, 255 );
	context.strokeStyle = htmlColor( 255, 50, 100);
	context.beginPath();
	context.moveTo(50, 80);
	context.lineTo(80, 120);
	context.lineTo(40, 200);
	context.closePath();
	context.fill();
	context.stroke();
	// Request Next Frame
	requestAnimationFrame(render);
}