////////////////////////////////////////////////////////////////////////////////
"use strict";

function zombieThink(h) {
	if (h.randomDirection === undefined) {
		h.randomDirection = Math.PI * 2 * Math.random();
		h.wx = 0;
		h.wy = 0;
		h.homex = h.x;
		h.homey = h.y;
		h.maxSpeed = .02;
		h.friction = 0.01;
		h.meat = true;
		h.human = true;
		h.zombie = true;
		h.hits = 12;
		h.reload = 0;
	}
	if (Math.random() * 80 < 1) {
		h.randomDirection = Math.PI * 2 * Math.random();
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
	var threatDistance = distance(h.x,h.y, nearestThreat.x,nearestThreat.y);
	var dx = nearestThreat.x - h.x;
	var dy = nearestThreat.y - h.y;
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
		this.wx = dx;
		this.wy = dy;
	}
	if (Math.random() * 60 * 10 < 1 && mag(dx,dy) < 6) {
		Sounds.brains.play(false);
	}
	if (magnitude(dx,dy) < 0.6) {
		if (Math.random() * 40 < 1 && h.reload <= 0) {
			nearestThreat.health--;
			Sounds.blood.play(false);
		}
	}
	h.reload--;
}