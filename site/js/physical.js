var World = {};
World.grid = [];
World.size = 128;

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
	var cannotMove =
		World.isSolid(x - r,y - r) ||
		World.isSolid(x - r,y + r) ||
		World.isSolid(x + r,y - r) ||
		World.isSolid(x + r,y + r);
	return !cannotMove;
}

// Computes movement from position (x,y) with velocity
// (in this frame) (vx,vy) 
// The box has "radius" r (dimensions 2r x 2r)
// ||(vx, vy)|| must be less than 1 for in general correct behavior
World.move = function(x,y , r, vx,vy) {
	var canMove = World.hasSpace(x + vx,y + vy,r);

	if (canMove) {
		return [x + vx, y + vy];
	} else {
		var m = Math.sqrt(vx * vx + vy * vy);
		for (var j = m; j > 0; j -= 0.5) {
			if (World.hasSpace(x + vx * j / m,y + vy * j / m)) {
				return [x + vx * j / m,y + vy * j / m];
			}
		}
		return [x,y];
	}
}