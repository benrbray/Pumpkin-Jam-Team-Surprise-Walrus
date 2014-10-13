/* GAME.JS
 *
 */
 
"use strict";

////////////////////////////////////////////////////////////////////////////////

var player = null;

function gameInit(){
	// Test Objects
	var g = new GridObject(1,1, new GameAsset(1,1,[[true]],null));
	GridObject.gridObjects.push(g);
	
	var g = new GridObject(0,0, new GameAsset(1,1,[[true]],null));
	GridObject.gridObjects.push(g);
	
	var g = new GridObject(2,3, new GameAsset(1,1,[[true]],null));
	GridObject.gridObjects.push(g);
	
	// Define Player
	player = new GameObject(4, 0.5, new GameAsset(1,1,[],null));
	GameObject.gameObjects.push(player);
	player.speed = 0.1;
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	draw();
	requestAnimationFrame(gameUpdate);
	
	player.vx *= 0.9;
	player.vy *= 0.9;

	// Move Player
	if (Keyboard.LEFT)	{ player.vx -= player.speed; }
	if (Keyboard.RIGHT)	{ player.vx += player.speed; }
	if (Keyboard.UP)	{ player.vy -= player.speed; }
	if (Keyboard.DOWN)	{ player.vy += player.speed; }
	
	// Move Camera
	Camera.x = Camera.x * 0.9 + player.x * 0.1;
	Camera.y = Camera.y * 0.9 + player.y * 0.1;
}