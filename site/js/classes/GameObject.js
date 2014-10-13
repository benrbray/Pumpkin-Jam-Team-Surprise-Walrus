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
	this.acceleration = 0.03;
	this.maxSpeed = .11;
	this.friction = 0.02;
	this.gameAsset = gameAsset;
	this.brain = brain;
}

GameObject.prototype.draw = function(){
	this.gameAsset.draw(this.x, this.y, this);
	//this.gameAsset.draw(this.x - this.gameAsset.width / 2, this.y - this.gameAsset.height / 2);
}

GameObject.prototype.update = function(){
	// Apply friction (linear deceleration)
	//this.vx = sign(this.vx) * Math.max(0, Math.abs(this.vx) - this.friction);
	//this.vy = sign(this.vy) * Math.max(0, Math.abs(this.vy) - this.friction);
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
	var m = World.move(this.x, this.y,0.4, this.vx, this.vy);
	this.x = m[0];
	this.y = m[1];
	this.vx *= m[2];
	this.vy *= m[3];
}

GameObject.prototype.die = function() {
	var where = GameObject.gameObjects.indexOf(this);
	if (where >= 0) {
		GameObject.gameObjects.splice(where,1);
	}
}

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GameObject.gameObjects = [];

// Adds a GameObject to the drawing stage
GameObject.add = function(gameObject){
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