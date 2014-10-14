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
		h.meat = true;
		h.human = true;
		h.armed = true;//Math.random() < 0.4;
		h.firing = 0;
		h.hits = 6;
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
		var tx = h.homex + Math.cos(h.randomDirection) * 3; // Target position
		var ty = h.homey + Math.sin(h.randomDirection) * 3;
		h.wx = tx - h.x;
		h.wy = ty - h.y;
		if ( distance(h.x,h.y,tx,ty) < 0.1 ) {
			// Within 0.1 tiles of target so stop.
			h.wx = 0;
			h.wy = 0;
		}

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

		var threatDistance = distance(h.x,h.y, nearestThreat.x,nearestThreat.y);
		if ( threatDistance < 5 ) {
			// Apprehensive
			h.fear += 1/60/15; // approximately 2 min for panic
		}
		h.glaring = false;
		if (h.armed) {
			// An armed (with gun?) human
			if (World.visible(h.x,h.y, nearestThreat.x,nearestThreat.y)) {
				var range = 2.4;
				if (World.isLit(nearestThreat.x,nearestThreat.y)) {
					range = 4.5;
				}
				if (threatDistance < range) {
					// And facing correct way
					var fx = h.drawx;
					var fy = h.drawy;
					if (fx * (nearestThreat.x - h.x) + fy * (nearestThreat.y - h.y) >= 0) {
						// Can see
						// Prepare to fire.
						h.firing = 15;
					}
				}
			}
		}
		if (h.firing > 0) {
			h.wx = 0;
			h.wy = 0;
			h.glaring = true;
			h.firing--;
		}
	}
}