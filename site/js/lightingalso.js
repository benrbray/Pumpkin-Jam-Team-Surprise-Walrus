"use strict";

var lightingCanvases = [];
for (var k = 0; k < 3; k++) {
	lightingCanvases.push(canvas());
	/*
function canvas() {
	var c = document.createElement("canvas");
	c.width = WINDOW_WIDTH;
	c.height = WINDOW_HEIGHT;
	return c;
}
	*/
}

function drawLighting() {
	var ctxs = [];
	for (var i = 0; i < lightingCanvases.length; i++) {
		ctxs[i] = lightingCanvases[i].getContext("2d");
		ctxs[i].setTransform(1,0,0,1,0,0);
		ctxs[i].fillStyle = "#6E809E"; // Medium
		ctxs[i].fillRect(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
	}
	for (var i = 0; i < Light.lights; i++) {
		var light = Light.lights[i];
		for (var j = 0; j < 3; j++) {
			ctxs[j].fillStyle = "#FFF3BA"; // Pall yellow
			light.drawLight( ctxs[j] );
		}
	}
	context.drawImage(ctxs[0],0,0);
}