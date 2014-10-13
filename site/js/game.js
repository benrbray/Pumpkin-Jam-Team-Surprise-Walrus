/* GAME.JS
 *
 */
 
"use strict";

////////////////////////////////////////////////////////////////////////////////

function gameInit(){
	var level = Levels[0];
	level.init();
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	// Update Everything
	GameObject.updateAll();
	
	// Draw Everything
	draw();
	requestAnimationFrame(gameUpdate);

	// Move Camera
	Camera.x = Camera.x * 0.7 + World.player.x * 0.3;
	Camera.y = Camera.y * 0.7 + World.player.y * 0.3;
	var world = Camera.fromScreen(Mouse.x,Mouse.y);
	Mouse.worldx = world[0];
	Mouse.worldy = world[1];
}
