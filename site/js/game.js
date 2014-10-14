/* GAME.JS
 *
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

var Stat = {};

var isGameOver = false;

function gameInit(){
	isGameOver = false;
	Stat.animals = 0;
	Stat.humans = 0;
	Stat.steps = 0;
	Stat.lunges = 0;
	var level = Levels[0];
	level.init();
	GameObject.fixDepth();
}

function gameRestart() {
	gameInit();
	htmlgameover.style.display = "none";
	htmlgameover.style.opacity = 0;
}

function gameOver() {
	isGameOver = true;
	document.getElementById('killnum').innerHTML = Stat.animals + Stat.humans;
	document.getElementById('killnum_human').innerHTML = Stat.humans;
	document.getElementById('killnum_animals').innerHTML = Stat.animals;

	document.getElementById('lunge_count').innerHTML = Stat.lunges;
	document.getElementById('steps_taken').innerHTML = Math.round(Stat.steps);

	document.getElementById('gameover').style.display = "block";
	document.getElementById('gameoverlay').style.display = "block";

	setTimeout(function(){document.getElementById('gameoverlay').style.opacity = 1;}, 30);
}

function gameUpdate(){
	// For computing distance travelled
	Stat.px = World.player.x;
	Stat.py = World.player.y;
	
	// Update Everything
	World.tick++;
	GameObject.updateAll();
	
	// Stat -- Record distance travelled
	Stat.steps += distance(Stat.px,Stat.py,World.player.x,World.player.y) * 2;
	
	// Draw Everything
	draw();
	requestAnimationFrame(gameUpdate);
	
	// Move Camera
	Camera.x = Camera.x * 0.7 + World.player.x * 0.3;
	Camera.y = Camera.y * 0.7 + World.player.y * 0.3;
	
	// Update mouse world position
	var world = Camera.fromScreen(Mouse.x,Mouse.y);
	Mouse.worldx = world[0];
	Mouse.worldy = world[1];
	
	
	if (World.player.health <= 0 && !isGameOver) {
		// GAME OVER
		gameOver();
	}
	
	updateMusic();
}
