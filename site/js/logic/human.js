////////////////////////////////////////////////////////////////////////////////
"use strict";

function nearestWolf(x,y) {
	// TODO: Impliment for satellite wolves too
	var m = [];
	for (var i = 0; i < GameObject.gameObjects.length; i++) {
		if (GameObject.gameObjects[i].wolf) {
			m.push(GameObject.gameObjects[i]);
		}
	}
	return {x:m[0].x,y:m[0].y};
}

function humanThink(h) {
	if (h.fear === undefined) {
		h.fear = 0;
		h.bold = (Math.random() * 3 << 0) - 1;
		h.running = 0;
		h.randomDirection = Math.PI * 2 * Math.random();
		h.wx = 0;
		h.wy = 0;
		h.homex = h.x;
		h.homey = h.y;
		h.maxSpeed = .02;
		h.friction = 0.01;
		h.human = true;
	}
	// Human Properties
	/*
		fear : Number slowly decreases. Increases with proximity.
				At 15 + bold * 10, panic (runs)
		bold : -1 Hide
				0 Stand
				1 Chase
		running : Frames remaining running
		(homex,homey) : Spawn location
	*/
	if (Math.random() * 80 < 1) {
		h.randomDirection = Math.PI * 2 * Math.random();
	}
	if (h.running > 0) {
		// Panic!
		h.wx = Math.cos(h.randomDirection);
		h.wy = Math.sin(h.randomDirection);
		h.running--;
		h.fear *= 0.99;
	} else {
		// Not panicking.
		if (h.fear > h.bold * 10 + 15) {
			// Start to Panic!
			h.running = 180 - h.bold * 120;
		}
		// Standard motion: Walk near to homex, homey
		h.wx = h.homex + Math.cos(h.randomDirection) * 3 - h.x;
		h.wy = h.homey + Math.sin(h.randomDirection) * 3 - h.y;

		var nearestThreat = nearestWolf(h.x,h.y);

		if (h.fear > 16 &&
				World.visible(h.x,h.y, nearestThreat.x,nearestThreat.y)) {
			// Behave according to bold
			if (h.bold < 0) {
				h.wx = h.x - nearestThreat.x;
				h.wy = h.y - nearestThreat.y;
			}
			if (h.bold == 0) {
				h.wx = 0;
				h.wy = 0;
			}
			if (h.bold > 0) {
				h.wx = -(h.x - nearestThreat.x);
				h.wy = -(h.y - nearestThreat.y);
			}
		}
	}
}