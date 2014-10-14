/* CAMERA.JS
 * Contains camera information and effects (zoom, shake, etc.).
 */

"use strict"

////////////////////////////////////////////////////////////////////////////////

var Camera = {
	x: 0,		// tiles
	y: 0,		// tiles
	width: 14	// tiles
}

Camera.getHalfWidth = function(){ return Camera.getWidth()/2; };
Camera.getHalfHeight = function(){ return Camera.getHeight()/2; };

Camera.getWidth = function(){
	return Camera.width;
}
Camera.getHeight = function(){
	return Camera.width * Camera.getAspectRatio();
}

Camera.getAspectRatio = function(){
	return WINDOW_HEIGHT / WINDOW_WIDTH
}

Camera.getScale = function(){
	return Camera.width / WINDOW_WIDTH;
}

/* CAMERA.CONTAINS
 * Whether or not a point is visible (has a padding so points a bit outside the
 * screen are visible too)
 */
Camera.contains = function(x, y){
	var xsep = Camera.x - x;
	var ysep = Camera.y - y;
	var maxx = Camera.getHalfWidth(); // Maximum magnitudes
	var maxy = Camera.getHalfHeight();
	return Math.abs(xsep) < maxx + 2 && Math.abs(ysep) < maxy + 2;
}

/* CAMERA.TRANSFORM
 * Transforms the given context to reflect the viewing angle specified by
 * camera.
 */
Camera.transform = function(ctx) {
	var scale = 1/Camera.getScale();
	ctx.scale(scale, scale);
	
	// Center camera on screen
	ctx.translate(
		-(Camera.x - Camera.getHalfWidth()),
		-(Camera.y - Camera.getHalfHeight())
	);
}


/* CAMERA.FROMSCREEN
 * Converts position (sx,sy) on the HTML canvas to world (tile) coordinates
 * Returns coordinates as array [x,y].
 */
Camera.fromScreen = function(sx,sy) {
	sx -= WINDOW_WIDTH / 2;
	sy -= WINDOW_HEIGHT / 2;
	var worldX = sx * Camera.getWidth() / WINDOW_WIDTH + Camera.x;
	var worldY = sy * Camera.getHeight() / WINDOW_HEIGHT + Camera.y;
	return [worldX,worldY];
}

//// CAMERA EFFECTS ////////////////////////////////////////////////////////////

Camera.shake = function(){
	
}