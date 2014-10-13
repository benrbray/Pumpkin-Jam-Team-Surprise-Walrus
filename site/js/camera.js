/* CAMERA.JS
 * Contains camera information and effects (zoom, shake, etc.).
 */

"use strict"

////////////////////////////////////////////////////////////////////////////////

var Camera = {
	x:	0,	// tiles
	y:	0,	// tiles
	tilesHorizontal:	20
}

// Whether or not a point is visible
// (has a padding so points a bit outside the screen
// are visible too)
Camera.contains = function(x, y){
	var xsep = Camera.x - x;
	var ysep = Camera.y - y;
	var maxx = Camera.tilesHorizontal / 2; // Maximum magnitudes
	var maxy = maxx * WINDOW_HEIGHT / WINDOW_WIDTH;
	return Math.abs(xsep) < maxx + 2 && Math.abs(ysep) < maxy + 2;
}

Camera.fromScreen = function(sx,sy) {
	var tilesVertical = Camera.tilesHorizontal * SCREEN_HEIGHT / SCREEN_WIDTH;
	var worldX = sx * Camera.tilesHorizontal / SCREEN_WIDTH + Camera.x;
	var worldY = sy * tilesVertical / SCREEN_HEIGHT + Camera.y;
	return [worldX,worldY];
}