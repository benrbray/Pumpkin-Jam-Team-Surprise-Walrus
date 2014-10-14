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
	return m[0];//{x:m[0].x,y:m[0].y};
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
		h.armed = h.gameAsset === GameAsset.humanGun;//Math.random() < 0.4;
		h.reload = 0;
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
		Light.remove(this);
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
			// Apprehensive?
			h.fear += 1/60/15 * 5; // approximately 24 sec for panic
		}
		h.reload--;
		h.glaring = false;
		if (h.armed && h.reload <= 0) {
			var canSee = false;
			var range = 2.4;
			// An armed (with gun?) human
			if (World.visible(h.x,h.y, nearestThreat.x,nearestThreat.y)) {
				range = 2.4;
				if (World.isLit(nearestThreat.x,nearestThreat.y)) {
					range = 4.5;
				}
				if (threatDistance < range) {
					// And facing correct way
					if (anglebetween(
							h.drawx,h.drawy, nearestThreat.x - h.x,nearestThreat.y - h.y
						) <= 1) {
						// Can see
						canSee = true;
					}
				}
				if (threatDistance < 3.5) {
					// Can see by virtue of being close
					canSee = true;
				}
			}
			if (canSee) {
				var dx = nearestThreat.x - h.x;
				var dy = nearestThreat.y - h.y;
				var dm = magnitude(dx,dy);
				dx /= dm;
				dy /= dm;
				h.drawx = h.drawx * 0.99 + 0.01 * dx;
				h.drawy = h.drawy * 0.99 + 0.01 * dy;
				if (h.firing <= 0 &&
						anglebetween(dx,dy, h.drawx,h.drawy) <= 0.3) {
					h.firing = 25;
				}
			}
			if (h.firing > 0) {
				h.wx = 0;
				h.wy = 0;
				h.glaring = true;
				h.firing--;
				if (h.firing == 1) {
					if (canSee) {
						// FIRE
						for (var k = 0; k < 10; k++) {
							var p = new Particle(
								h.x + h.drawx / magnitude(h.drawx,h.drawy) * 2,
								h.y + h.drawy / magnitude(h.drawx,h.drawy) * 2,
								Math.random() * 0.3,
								255,255,255,
								30
							);
							p.vx *= 3;
							p.vy *= 3;
						}
						nearestThreat.health -= 4;
						h.reload = 60;
					}
				}
			}
		}
	}
}