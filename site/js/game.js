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
	player = new GameObject(PlayerThink, 4, 0.5, new GameAsset(0.8,0.8,[],null));
	GameObject.gameObjects.push(player);
}


////////////////////////////////////////////////////////////////////////////////

function PlayerThink(player) {
	player.wx = 0;
	player.wy = 0;
	if (Keyboard.LEFT)  {
		player.wx = -1;
	}
	if (Keyboard.RIGHT) {
		player.wx = 1;
	}
	if (Keyboard.UP)    {
		player.wy = -1;
	}
	if (Keyboard.DOWN)  {
		player.wy = 1;
	}
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	draw();
	requestAnimationFrame(gameUpdate);
	// Move Player
	// if (Keyboard.LEFT)  { player.vx -= player.speed; }
	// if (Keyboard.RIGHT) { player.vx += player.speed; }
	// if (Keyboard.UP)	   { player.vy -= player.speed; }
	// if (Keyboard.DOWN)  { player.vy += player.speed; }

	// Move Camera
	Camera.x = Camera.x * 0.7 + player.x * 0.3;
	Camera.y = Camera.y * 0.7 + player.y * 0.3;
}
