var World = {};
World.grid = [];
World.size = 128;
for (var i = 0; i < World.size; i++) {
	World.grid[i] = [];
	for (var j = 0; j < World.size; j++) {
		World.grid[i][j] = false;
	}
}

World.isSolid = function(x,y) {
	if (x < 0 || y < 0) {
		return true;
	}
	if (x >= World.size || y >= World.size) {
		return true;
	}
	return World.grid[x << 0][y << 0];
}

// Does an object of "radius" r (dimensions 2r x 2r) 
// fit at position (x,y)? (Center of box)
World.hasSpace = function(x,y,r) {
	var cannotMove = false;
	for (var u = -1; u <= 1; u++) {
		for (var v = -1; v <= 1; v++) {
			cannotMove = cannotMove || World.isSolid(x + r * u, y + r * v);
		}
	}
	return !cannotMove;
}

// Computes movement from position (x,y) with velocity
// (in this frame) (vx,vy) 
// The box has "radius" r (dimensions 2r x 2r)
//      (for now less than 0.5 -- soon less than 1)
// ||(vx, vy)|| must be less than 0.5 for in general correct behavior
// Returns [newx, newy, % velocity horizontal used, % velocity vertical used]
World.move = function(x,y , r, vx,vy) {
	// RESULTS OFF BY A VERY SMALL AMOUNT
	var canMove = World.hasSpace(x + vx,y + vy,r);
	if (canMove) {
		return [x + vx, y + vy, 1, 1];
	} else {
		var mvx = Math.abs(vx); // Horizontal speed
		var mvy = Math.abs(vy); // Vertical speed
		var dvx = sign(vx); // Horizontal direction
		var dvy = sign(vy); // Vertical directino
		var mx = 0; // Horizontal movement amount
		var my = 0; // Vertical momvement amount
		var step = 0.01;
		if (mvx > mvy) {
			// Compute x movement first
			for (var i = mvx; i >= 0; i -= step) {
				if (World.hasSpace(x + dvx * i,y,r)) {
					mx = dvx * i;
					break;
				}
			}
			for (var i = mvy; i >= 0; i -= step) {
				if (World.hasSpace(x + mx,y + dvy * i,r)) {
					my = dvy * i;
					break;
				}
			}
		} else {
			// Compute y movement first
			for (var i = mvy; i >= 0; i -= step) {
				if (World.hasSpace(x,y + dvy * i,r)) {
					my = dvy * i;
					break;
				}
			}
			for (var i = mvx; i >= 0; i -= step) {
				if (World.hasSpace(x + dvx * i,y + my,r)) {
					mx = dvx * i;
					break;
				}
			}
		}
		return [x + mx,y + my,0.8,0.8];
	}
}