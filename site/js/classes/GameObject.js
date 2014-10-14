/* GAMEOBJECT.JS
 * Handles dynamic objects not necessarily aligned to grid cells.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

function GameObject(x, y, gameAsset, brain){
	this.x = x;		// x position (tiles)
	this.y = y;		// y position (tiles)
	this.vx = 0;	// x velocity (tiles/frame)
	this.vy = 0;	// y velocity (tiles/frame)
	this.wx = 0;	// Walking horizontal
	this.wy = 0;	// Walking vertical
	this.drawx = 1; // x component of direction vector
	this.drawy = 0; // y component of direction vector
	this.acceleration = 0.03;
	this.maxSpeed = .11;
	this.friction = 0.02;
	this.gameAsset = gameAsset;
	this.brain = brain;
}

GameObject.prototype.draw = function(){
	// Draw Asset
	this.gameAsset.draw(this.x, this.y, this);
}

GameObject.prototype.update = function(){
	// Limit speed
	var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	if (speed > 0) {
		this.vx /= speed;
		this.vy /= speed;
	}
	speed = Math.max(0,Math.min(speed - this.friction, this.maxSpeed));
	this.vx *= speed;
	this.vy *= speed;
	
	// Think According to Type
	if(this.brain) { this.brain(this); };
	
	// Accelerate
	var wm = Math.sqrt(this.wx * this.wx + this.wy * this.wy);
	if (wm > 0) {
		this.vx += this.wx / wm * this.acceleration;
		this.vy += this.wy / wm * this.acceleration;
	}

	// Do physics
	if (!World.hasSpace(this.x,this.y,0.35)) {
		// In case we get stuck in a wall...
		this.x += this.vx;
		this.y += this.vy;
	} else {
		var m = World.move(this.x, this.y,0.35, this.vx, this.vy);
		this.x = m[0];
		this.y = m[1];
		this.vx *= m[2];
		this.vy *= m[3];
	}
}

GameObject.prototype.die = function() {
	var where = GameObject.gameObjects.indexOf(this);
	if (where >= 0) {
		GameObject.gameObjects.splice(where,1);
	}
	for (var i = 0; i < Light.lights.length; i++) {
		if (Light.lights[i].gameObject === this) {
			Light.lights.splice(i,1);
			return;
		}
	}
}

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GameObject.gameObjects = [];

// Adds a GameObject to the drawing stage
GameObject.add = function(gameObject){
	assert( GameObject.gameObjects.indexOf(gameObject) === -1 , "Object " + gameObject + " already inserted to game objects");
	GameObject.gameObjects.push(gameObject);
	return gameObject;
}

// Updates all staged GameObjects
GameObject.updateAll = function(){
	var gameObjects = GameObject.gameObjects;
	for(var i = 0; i < gameObjects.length; i++){
		var obj = gameObjects[i];
		obj.update();
	}
}

// Calls the update() and draw() for each GameObject
GameObject.drawAll = function(){
	var gameObjects = GameObject.gameObjects;
	for(var i = 0; i < gameObjects.length; i++){
		var obj = gameObjects[i];
		obj.draw();
	}
}

// Deletes all game objects
GameObject.clearAll = function(){
	GameObject.gameObjects = [];
}