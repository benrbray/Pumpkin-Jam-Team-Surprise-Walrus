"use strict";
var context;


////////////////////////////////////////////////////////////////////////////////

function mainInit() {
	// Document & Canvas Setup
	htmlcanvas.width = WINDOW_WIDTH;
	htmlcanvas.height = WINDOW_HEIGHT;
	htmlcanvas.style.background = "#0D6321";
	context = htmlcanvas.getContext("2d");
	
	// Controls
	htmlcanvas.onmousedown = documentMouseDown;
	htmlcanvas.onmouseup = documentMouseUp;
	htmlcanvas.onmousemove = documentMouseMove;
	document.onkeyup = documentKeyUp;
	document.onkeydown = documentKeyDown;
	
	// Game
	gameInit();
	
	// Begin Render Loop
	gameUpdate();
}