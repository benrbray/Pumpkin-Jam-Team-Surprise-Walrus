/* DRAW.JS
 *
 */

//// CAMERA ////////////////////////////////////////////////////////////////////

var Camera = {
	x:	0,	// tiles
	y:	0,	// tiles
	tilesHorizontal:	20
}

Camera.contains = function(x, y){
	
}

////////////////////////////////////////////////////////////////////////////////

function draw() {
	// Transform canvas drawing coordinates to location/size of camera
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);
	// Establish a zoom level based on Camera desired width
	var scale = WINDOW_WIDTH / (Camera.tilesHorizontal);
	context.scale(scale, scale);
	// Center camera on screen
	context.translate(
		-(Camera.x - Camera.tilesHorizontal / 2),
		-(Camera.y - Camera.tilesHorizontal * WINDOW_HEIGHT / WINDOW_WIDTH / 2)
	);
	
	// Draw World
	GridObject.drawAll();
	GameObject.drawAll();
	
	// Reset Canvas Coordinates for drawing GUI
	context.setTransform(1,0,0,1,0,0);
}

function htmlColor(r, g, b, a) {
	/*
	 * Why not use
	r &= 0xff;
	g &= 0xff;
	b &= 0xff;
	 * to ensure that rgba is between 0 and 255?
	 * ~Tyler
	 */

	r = r*1 << 0;
	g = g*1 << 0;
	b = b*1 << 0;
	if (typeof a != typeof 1) {
		a = 1;
	}
	return "rgba(" + r +  "," + g + "," + b + "," + a +")";
}
