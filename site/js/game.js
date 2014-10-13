/* GAME.JS
 *
 */
 
"use strict";

////////////////////////////////////////////////////////////////////////////////

var player = null;

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
	Camera.x = Camera.x * 0.7 + player.x * 0.3;
	Camera.y = Camera.y * 0.7 + player.y * 0.3;
}
