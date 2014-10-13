/* GRIDREGION.JS
 * 
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////

function GridRegion(x, y, w, h){
	this.x = x;				// tiles
	this.y = y;				// tiles
	this.width = width;		// tiles
	this.height = height;	// tiles
}

GridRegion.prototype.contains = function(x, y){
	var xsep = this.x - x;
	var ysep = this.y - y;
	var maxx = this.width / 2; // Maximum magnitudes
	var maxy = this.height / 2;
	return Math.abs(xsep) < maxx && Math.abs(ysep) < maxy;
}