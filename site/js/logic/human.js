////////////////////////////////////////////////////////////////////////////////

function nearestWolf(x,y) {
	// TODO: Impliment for satellite wolves too
	return {x:player.x,y:player.y};
}

function humanThink(h) {
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
		h.randomDirection = Math.PI * 2;
	}
	if (h.running > 0) {
		// Panic!
		h.wx = Math.cos(h.randomDirection);
		h.wy = Math.sin(h.randomDirection);
		h.running--;
	} else {
		// Not panicking.
		if (h.fear > h.bold * 10 + 15) {
			// Start to Panic!
			h.running = 180 - h.bold * 120;
		}
		// Standard motion: Walk near to homex, homey
		h.wx = h.homex + Math.cos(h.randomDirection) * 3 - h.x;
		h.wy = h.homey + Math.sin(h.randomDirection) * 3 - h.y;

		if (h.fear > (h.bold * 10 + 15) / 2 ) {
			// Behave according to bold
			var nearestThreat = nearestWolf(h.x,h.y);
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