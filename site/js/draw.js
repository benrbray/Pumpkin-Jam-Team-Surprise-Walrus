/* DRAW.JS
 *
 */

////////////////////////////////////////////////////////////////////////////////

function draw() {
	// Transform canvas drawing coordinates to location/size of camera
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);
	
	// Establish a zoom level based on Camera desired width
	Camera.transform(context);
	
	// Draw World
	GridObject.drawAll();
	GameObject.drawAll();
	
	Particle.drawParticles();

	context.fillStyle = "rgba(255,255,0,0.25)";
	Light.drawAll(context);
	
	// Reset Canvas Coordinates for drawing GUI
	context.setTransform(1,0,0,1,0,0);

	// GUI
	context.fillStyle = "#EE2244";
	context.font = "bold 16px 'Trebuchet MS'"
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("Health: " + World.player.health,WINDOW_WIDTH/2,16);

	//drawLighting();

	context.lineWidth = 1;
	context.strokeStyle = "rgba(0,0,0,0.5)";
	context.strokeCircle(Mouse.x,Mouse.y,2);
	context.strokeCircle(Mouse.x,Mouse.y,4);
	context.strokeStyle = "rgba(255,255,255,0.5)";
	context.strokeCircle(Mouse.x,Mouse.y,3);
}


var tileImg = new Image("assets/graphics/grass.png");