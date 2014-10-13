/* GAME.JS
 *
 */
 
"use strict";

////////////////////////////////////////////////////////////////////////////////

var player = null;

function gameInit(){
	// Test Objects
	var g = new GridObject(10,10, GameAsset.tree);
	GridObject.add(g);
	
	var g = new GridObject(10,11, GameAsset.tree);
	GridObject.add(g);
	
	var g = new GridObject(12,13, GameAsset.tree);
	GridObject.add(g);
	
	// Define Player
	player = new GameObject(playerThink, 4, 1, GameAsset.player);
	GameObject.add(player);
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	// Update Everything
	GameObject.updateAll();
	
	// Draw Everything
	draw();
	requestAnimationFrame(gameUpdate);

	// Move Camera
	Camera.x = Camera.x * 0.7 + player.x * 0.3;
	Camera.y = Camera.y * 0.7 + player.y * 0.3;
}
