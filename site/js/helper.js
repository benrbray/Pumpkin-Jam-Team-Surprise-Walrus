"use strict";


//// CONSTANTS /////////////////////////////////////////////////////////////////

var WINDOW_WIDTH = 800;
var WINDOW_HEIGHT = 600;

////////////////////////////////////////////////////////////////////////////////

function canvas() {
	var c = document.createElement("canvas");
	c.width = WINDOW_WIDTH;
	c.height = WINDOW_HEIGHT;
	return c;
}

function sign(x) {
	return x?x<0?-1:1:0;
}

function magnitude(x,y) {
	return Math.sqrt(x * x + y * y);
}

function distance(a,b,x,y) {
	return magnitude(x-a,y-b);
}

function rnd(){
	return Math.random()*2-1;
}

// converts RGBA to HTML color string
function htmlColor(r, g, b, a) {
	// ensure alpha is a number
	if (typeof a != typeof 1) { a = 1; }
	
	// generate color string
	return ( "rgba("
		+ (r&0xff) +  ","
		+ (g&0xff) + "," 
		+ (b&0xff) + "," 
		+ a +")"
	);
}

// uniform 2d array populated with value
function gridOfSize(w, h, val){
	var grid = [];
	for(var x = 0; x < w; x++){
		var col = [];
		for(var y = 0; y < h; y++){
			col.push(val);
		}
		grid.push(col);
	}
	return grid;
}

//// Drawing -------------------------------------------------------------------

CanvasRenderingContext2D.prototype.fillCircle = function(x,y,radius){
	this.beginPath();
	this.arc(x,y,radius,0,2*Math.PI);
	this.fill();
}

CanvasRenderingContext2D.prototype.strokeCircle = function(x,y,radius){
	this.beginPath();
	this.arc(x,y,radius,0,2*Math.PI);
	this.stroke();
}

CanvasRenderingContext2D.prototype.fillEllipse = function(x,y,rx,ry){
	// remember current coordinate transform
	this.save();
	// stretch coordinate axes to prepare for ellipse drawing
	this.translate(x-rx, y-ry);
	this.scale(rx, ry);
	// draw circle in stretched coordinates
	this.beginPath();
	this.arc(1, 1, 1, 0, 2 * Math.PI, false);
	this.fill();
	// restore to original, unstretched coordinates
	this.restore();
}

//// Misc ----------------------------------------------------------------------

function assert(condition, message) {
	if (!condition) {
		throw message || "Assertion failed";
	}
}