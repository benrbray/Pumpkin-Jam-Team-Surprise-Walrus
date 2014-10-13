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
// Returns [newx, newy, % velocity horizontal used, % velocity vertical used]
World.move = function(x,y , r, vx,vy) {
	var canMove = World.hasSpace(x + vx,y + vy,r);
	if (canMove) {
		return [x + vx, y + vy, 1, 1];
	} else {
		var m = Math.sqrt(vx * vx + vy * vy);
		for (var j = m; j > 0; j -= 0.5) {
			if (World.hasSpace(x + vx * j / m,y + vy * j / m)) {
				var larger = Math.max(vx*vx,vy*vy);
				var largerHorizontal = vx*vx == larger;
				return [
					x + vx * j / m,y + vy * j / m, 
					largerHorizontal ? 0 : 1, 
					!largerHorizontal ? 0 : 1
				];
			}
		}
		return [x,y, 0,0];
	}
}