"use strict";

function sign(x) {
	return x?x<0?-1:1:0;
}

function magnitude(x,y) {
	return Math.sqrt(x * x + y * y);
}

function distance(a,b,x,y) {
	return magnitude(x-a,y-b);
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

function assert(condition, message) {
	if (!condition) {
		throw message || "Assertion failed";
	}
}