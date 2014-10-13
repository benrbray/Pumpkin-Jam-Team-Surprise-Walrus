/* GAMEOBJECT.JS
 * Handles dynamic objects not necessarily aligned to grid cells.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

function GameObject(brain, x, y, gameAsset){
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
	this.gameAsset.draw(this.x - this.gameAsset.width / 2, this.y - this.gameAsset.height / 2);
}

GameObject.prototype.update = function(){
	// Apply friction (linear deceleration)
	this.vx = sign(this.vx) * Math.max(0, Math.abs(this.vx) - this.friction);
	this.vy = sign(this.vy) * Math.max(0, Math.abs(this.vy) - this.friction);
	
	// Limit speed
	var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	if (speed > this.maxSpeed) {
		this.vx *= this.maxSpeed / speed;
		this.vy *= this.maxSpeed / speed;
	}
	// Think According to Type
	this.brain(this);
	
	// Accelerate
	this.vx += Math.max(-1,Math.min(this.wx,1)) * this.acceleration;
	this.vy += Math.max(-1,Math.min(this.wy,1)) * this.acceleration;

	// Do physics
	var m = World.move(this.x, this.y,0.4, this.vx, this.vy);
	this.x = m[0];
	this.y = m[1];
	this.vx *= m[2];
	this.vy *= m[3];
}

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GameObject.gameObjects = [];

GameObject.add = function(gameObject){
	GameObject.gameObjects.push(gameObject);
}

GameObject.drawAll = function(){
	var gameObjects = GameObject.gameObjects;
	for(var i = 0; i < gameObjects.length; i++){
		var obj = gameObjects[i];
		obj.update();
		obj.draw();
	}
}