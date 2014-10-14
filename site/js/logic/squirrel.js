////////////////////////////////////////////////////////////////////////////////
"use strict";

function squirrelThink(h) {
	if (Math.random() * 80 < 1) {
		h.randomDirection = Math.PI * 2 * Math.random();
	}
	h.maxSpeed = 0.01;
	h.hits = 1;
	h.meat = true;
	h.randomDirection = h.randomDirection || 0;
	h.wx = Math.cos(h.randomDirection);
	h.wy = Math.sin(h.randomDirection);
	var near = nearestWolf(h.x,h.y);
	if (distance(h.x,h.y,near.x,near.y) < 3.5) {
		h.randomDirection = Math.atan2(  h.y - near.y, h.x - near.x);
		h.maxSpeed = 0.08;
	}
}