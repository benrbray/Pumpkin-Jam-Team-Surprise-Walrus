/* DRAW.JS
 *
 */

////////////////////////////////////////////////////////////////////////////////

function draw() {
	// Grid Coordinates --------------------------------------------------------
	
	// Transform canvas drawing coordinates to location/size of camera
	context.setTransform(1,0,0,1,0,0);
	context.clearRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);
	
	// Establish a zoom level based on Camera desired width
	Camera.transform(context);
	
	// Draw World
	GridObject.drawAll();
	GameObject.drawAll();
	
	Particle.drawParticles();
	
	// Draw Lights
	context.fillStyle = "rgba(255,255,0,0.25)"; // light color
	Light.drawAll(context);
	
	// Reset Canvas Coordinates for drawing GUI
	context.setTransform(1,0,0,1,0,0);
	
	// Screen Coordinates ------------------------------------------------------
	
	//drawLighting(); expensive way
	
	drawGUI();
	drawCursor();
}

//// GUI -----------------------------------------------------------------------

function drawGUI(){
	// Vignette
	drawVignette();
	// Info Bar
	drawInfoBar();
}

function drawVignette(){
	context.save();
	context.scale(1,WINDOW_HEIGHT/WINDOW_WIDTH);
	// Define radial gradient
	var halfWidth = WINDOW_WIDTH/2;
	var vignette = context.createRadialGradient(
		halfWidth,		// start x
		halfWidth,	// start y
		0,		// start radius
		halfWidth,		// end x
		halfWidth,	// end y
		halfWidth * 1.2	// end radius
	);
	vignette.addColorStop(0,"rgba(0,0,0,0)");
	vignette.addColorStop(1,"rgba(0,0,0,0.7)");
	
	// Draw vignette
	context.fillStyle = vignette;
	context.fillRect(0,0,WINDOW_WIDTH, WINDOW_WIDTH);
	context.restore();
}

function drawInfoBar(){
	// 
	context.fillStyle = "#000000";
	context.font = "bold 16px 'Trebuchet MS'"
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("Health: " + World.player.health,WINDOW_WIDTH/2,16);
}

//// Cursor --------------------------------------------------------------------

function drawCursor(){
	context.lineWidth = 1;
	context.strokeStyle = "rgba(0,0,0,0.5)";
	context.strokeCircle(Mouse.x,Mouse.y,2);
	context.strokeCircle(Mouse.x,Mouse.y,4);
	context.strokeStyle = "rgba(255,255,255,0.5)";
	context.strokeCircle(Mouse.x,Mouse.y,3);
}