/* CAMERA.JS
 * Contains camera information and effects (zoom, shake, etc.).
 */

"use strict"

////////////////////////////////////////////////////////////////////////////////

var Camera = {
	x:	0,	// tiles
	y:	0,	// tiles
	tilesHorizontal:	14
}

/* CAMERA.CONTAINS
 * Whether or not a point is visible (has a padding so points a bit outside the
 * screen are visible too)
 */
Camera.contains = function(x, y){
	var xsep = Camera.x - x;
	var ysep = Camera.y - y;
	var maxx = Camera.tilesHorizontal / 2; // Maximum magnitudes
	var maxy = maxx * WINDOW_HEIGHT / WINDOW_WIDTH;
	return Math.abs(xsep) < maxx + 2 && Math.abs(ysep) < maxy + 2;
}

/* CAMERA.FROMSCREEN
 * Converts position (sx,sy) on the HTML canvas to world (tile) coordinates
 * Returns coordinates as array [x,y].
 */
Camera.fromScreen = function(sx,sy) {
	sx -= WINDOW_WIDTH / 2;
	sy -= WINDOW_HEIGHT / 2;
	var tilesVertical = Camera.tilesHorizontal * WINDOW_HEIGHT / WINDOW_WIDTH;
	var worldX = sx * Camera.tilesHorizontal / WINDOW_WIDTH + Camera.x;
	var worldY = sy * tilesVertical / WINDOW_HEIGHT + Camera.y;
	return [worldX,worldY];
}

//// CAMERA EFFECTS ////////////////////////////////////////////////////////////

Camera.shake = function(){
	
}