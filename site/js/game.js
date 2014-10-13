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
	player.maxSpeed = 1;
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	draw();
	requestAnimationFrame(gameUpdate);

	// Slows down a player after they've stopped moving
	// Also keeps a lid on the math below
	// Speed up/slow down should be branched off, imo.
	// player.vx *= 0.9;
	// player.vy *= 0.9;

	// Move Player
	// The math here allows a player to move diagonally at sqrt(2)*speed
	// Not sure if that is a problem or not
	// if (Keyboard.LEFT)  { player.vx -= player.speed; }
	// if (Keyboard.RIGHT) { player.vx += player.speed; }
	// if (Keyboard.UP)	   { player.vy -= player.speed; }
	// if (Keyboard.DOWN)  { player.vy += player.speed; }

	// Linear Acceleration Test ~Tyler
	if (Keyboard.LEFT)  {player.vx = Math.max(player.vx - 2*player.speed, -1*player.maxSpeed)}
	if (Keyboard.RIGHT) {player.vx = Math.min(player.vx + 2*player.speed, player.maxSpeed)}

	if (Keyboard.UP)    {player.vy = Math.max(player.vy - 2*player.speed, -1*player.maxSpeed)}
	if (Keyboard.DOWN)  {player.vy = Math.min(player.vy + 2*player.speed, player.maxSpeed)}


	player.vx = sign(player.vx)==1?Math.max(player.vx - player.speed,0):Math.min(player.vx + player.speed,0);
	player.vy = sign(player.vy)==1?Math.max(player.vy - player.speed,0):Math.min(player.vy + player.speed,0);

	// Move Camera
	Camera.x = Camera.x * 0.7 + player.x * 0.3;
	Camera.y = Camera.y * 0.7 + player.y * 0.3;
}
