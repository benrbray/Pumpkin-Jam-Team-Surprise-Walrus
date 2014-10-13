/* GAMEOBJECT.JS
 * Handles dynamic objects not necessarily aligned to grid cells.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

function GameObject(x, y, gameAsset){
	this.x = x;		// x position (tiles)
	this.y = y;		// y position (tiles)
	this.vx = 0;	// x velocity (tiles/frame)
	this.vy = 0;	// y velocity (tiles/frame)
	this.gameAsset = gameAsset;
}

GameObject.prototype.draw = function(){
	this.gameAsset.draw(this.x, this.y);
}

GameObject.prototype.update = function(){
	this.x += this.vx;
	this.y += this.vy;
}

GameObject.gameObjects = [];

GameObject.drawAll = function(){
	var gameObjects = GameObject.gameObjects;
	for(var i = 0; i < gameObjects.length; i++){
		var obj = gameObjects[i];
		obj.update();
		obj.draw();
	}
}