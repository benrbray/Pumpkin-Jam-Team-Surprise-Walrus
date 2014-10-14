/* WORLD.JS
 * Sets-up the solid grid defining the walkability of the world
 * Includes World.isSolid and World.hasSpace to detect whether or not
 * different motions are allowed.
 * Impliments World.move to encapsulate all motion computation,
 * regarding the obstacles in the world.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

// Define World grid
var World = {};
World.clear = function(size) {
	World.grid = [];
	World.size = size;
	World.player = null;
	
	// Initialize World grid to be entirely walkable
	for (var i = Math.floor(-World.size / 2); i < (World.size / 2); i++) {
		World.grid[i] = [];
		for (var j = Math.floor(-World.size / 2); j < (World.size / 2); j++) {
			World.grid[i][j] = false;
		}
	}
}
World.clear(128);

//// GEOMETRY //////////////////////////////////////////////////////////////////

/* WORLD.ISSOLID
 * Determine if a grid point is solid or not.
 */
World.isSolid = function(x,y) {
	// Otherwise read from grid
	var column = World.grid[ Math.floor(x) ];
	if (!column) { return true; }
	var cell = column[Math.floor(y)];
	return cell === true || cell === undefined;
}

/* WORLD.ISWALKABLE
 * Determine if a grid point is walkable or not.
 */
World.isWalkable = function(x,y) { !World.isSolid(x,y); }

/* WORLD.HASSPACE
 * Does an object of "radius" r (dimensions 2r x 2r) 
 * fit at position (x,y)? (Center of box)
 */
World.hasSpace = function(x,y,r) {
	var cannotMove = false;
	for (var u = -1; u <= 1; u++) {
		for (var v = -1; v <= 1; v++) {
			cannotMove = cannotMove || World.isSolid(x + r * u, y + r * v);
		}
	}
	return !cannotMove;
}

World.isLit = function(x,y) {
	for (var i = 0; i < Light.lights.length; i++) {
		var light = Light.lights[i];
		var a = light.gameObject.x;
		var b = light.gameObject.y;
		var dist = distance(x,y, a,b);
		if ( dist < light.radius) {
			return true;
		}
	}
	return false;
}

/* WORLD.VISIBLE
 * Predicate determining whether there is line of sight between the two points.
 */
World.visible = function(xfrom,yfrom, xto,yto) {
	var div = 20; // Divisions of segment (higher means slower, more accurate)
	var xd = (xto - xfrom) / div;
	var yd = (yto - yfrom) / div;
	for (var j = 0; j < 20; j++) {
		if (World.isSolid(xfrom + xd * j,yfrom + yd * j)) {
			return false;
		}
	}
	return true;
}

// Collisions ------------------------------------------------------------------

/* WORLD.MOVE
 * Computes movement from position (x,y) with velocity (in this frame) (vx,vy) 
 * The box has "radius" r (dimensions 2r x 2r)
 *      (for now less than 0.5 -- soon less than 1)
 * ||(vx, vy)|| must be less than 0.5 for in general correct behavior
 * Returns [newx, newy, % velocity horizontal used, % velocity vertical used]
 */
World.move = function(x,y , r, vx,vy) {
	// RESULTS OFF BY A VERY SMALL AMOUNT
	var canMove = World.hasSpace(x + vx,y + vy,r);
	
	if (canMove) {
		return [x + vx, y + vy, 1, 1];
	} else {
		var mvx = Math.abs(vx);	// Horizontal speed
		var mvy = Math.abs(vy);	// Vertical speed
		var dvx = sign(vx); 	// Horizontal direction
		var dvy = sign(vy);		// Vertical directino
		var mx = 0;				// Horizontal movement amount
		var my = 0;				// Vertical momvement amount
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

//// ENVIRONMENT ///////////////////////////////////////////////////////////////

World.addPlayer = function(x, y){
	World.player = GameObject.add(new GameObject(x, y, GameAsset.player, playerThink));
	World.player.health = 9;
	World.player.depth = -2;
}

World.addTree = function(x, y){
	var trunk = new GridObject(x, y, GameAsset.treeTrunk);
	var body = new GameObject(x+0.5, y+0.5, GameAsset.treeBody);
	body.depth = -5;
	GameObject.add(body);
}

World.addHuman = function(x,y, gun){
	var hu = new GameObject(x, y, gun ? GameAsset.humanGun : GameAsset.humanPlain, humanThink);
	new Light(hu, 2, 0.5, 200, 200, 100);
	GameObject.add(hu);
}

World.addZombie = function(x,y) {
	var zom = new GameObject(x,y, GameAsset.humanZombie, zombieThink);
	new Light(zom, 2, 0.5, 200, 200, 100);
	GameObject.add(zom);
}

World.addAnimal = function(x,y) {
	var an;
	if (Math.random() < 1) {
		an = new GameObject(x,y,GameAsset.squirrel, squirrelThink);
	}
	GameObject.add(an);
}