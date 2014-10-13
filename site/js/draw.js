/* DRAW.JS
 *
 */

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
	
	Particle.drawParticles();
	
	// Reset Canvas Coordinates for drawing GUI
	context.setTransform(1,0,0,1,0,0);

	context.lineWidth = 1;
	context.strokeStyle = "rgba(0,0,0,0.5)";
	context.strokeCircle(Mouse.x,Mouse.y,2);
	context.strokeCircle(Mouse.x,Mouse.y,4);
	context.strokeStyle = "rgba(255,255,255,0.5)";
	context.strokeCircle(Mouse.x,Mouse.y,3);
}