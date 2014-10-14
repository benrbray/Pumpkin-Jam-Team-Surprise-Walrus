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

	var cornerx = Math.floor((Camera.x - Camera.getHalfWidth()) / 8) * 8;
	var cornery = Math.floor((Camera.y - Camera.getHalfHeight()) / 8) * 8;
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			context.drawImage(
				GameAsset.grassImg,
				cornerx + 8 * x,
				cornery + 8 * y,
				8,8);
		}
	}
	
	// Draw World
	GridObject.drawAll();
	GameObject.drawAll();
	
	Particle.drawParticles();
	
	// Draw Lights
	context.fillStyle = "rgba(255,255,0,0.25)"; // light color
	//Light.drawAll(context); // Cheap lighting
	
	// Reset Canvas Coordinates for drawing GUI
	context.setTransform(1,0,0,1,0,0);
	
	// Screen Coordinates ------------------------------------------------------
	
	drawLighting(); //Expensive lighting
	
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
	for (var i = 0; i < 9; i++) {
		if (World.player.health > i) {
			context.fillStyle = "rgba(240,50,60,0.75)";
		} else {
			context.fillStyle = "rgba(0,0,0,0.75)";
		}
		context.fillRect(i * 18+10.5,10.5,16,30);
	}
	// Settlements
	for (var i = 0; i < World.settlements.length; i++) {
		var num = 0;
		var icon = GameAsset.ihouse0;
		for (var j = 0; j < GameObject.gameObjects.length; j++) {
			if (GameObject.gameObjects[j].settlement == World.settlements[i]) {
				num++;
			}
		}
		if (num > 0) {
			icon = GameAsset.ihouse2;
		}
		context.drawImage(icon,WINDOW_WIDTH - 24,8 + 24 * i);
		context.fillStyle = "#DB0000";
		context.font = "16px 'Walter Turncoat'";
		context.textAlign = "right";
		context.textBaseline = "middle";
		context.fillText( "[" + num + "] " + World.settlements[i] , WINDOW_WIDTH - 24 - 8, 24 * i + 12 + 7 );
	}
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