/* GAME.JS
 *
 */

"use strict";

var Stat = {};

////////////////////////////////////////////////////////////////////////////////

function gameInit(){
	Stat.animals = 0;
	Stat.humans = 0;
	Stat.steps = 0;
	Stat.lunges = 0;
	var level = Levels[0];
	level.init();
	GameObject.fixDepth();
}

////////////////////////////////////////////////////////////////////////////////

function gameRestart() {
	gameInit();
	htmlgameover.style.display = "none";
	htmlgameover.style.opacity = 0;
}

////////////////////////////////////////////////////////////////////////////////

function gameOver() {
	document.getElementById('killnum').innerHTML = Stat.animals + Stat.humans;
	document.getElementById('killnum_human').innerHTML = Stat.humans;
	document.getElementById('killnum_animals').innerHTML = Stat.animals;

	document.getElementById('lunge_count').innerHTML = Stat.lunges;
	document.getElementById('steps_taken').innerHTML = Stat.steps;

	document.getElementById('gameover').style.opacity = 1;

/*	htmlgameover.style.display = "block";
	htmlgameover.opacity = 1;
	var summary = "";
	summary += "<p>";
	summary += "You hunted <strong>" + Stat.animals + " small animals</strong> ";
	summary += "and killed <strong>" + Stat.humans + " humans</strong>. ";
	summary += "<p>";
	summary += "You took <strong>" + (Stat.steps << 0) + " steps</strong> and";
	summary += "<strong>lunged " + Stat.lunges + " times</strong>.";*/
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	// Update Everything

	// For computing distance travelled
	Stat.px = World.player.x;
	Stat.py = World.player.y;

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


	if (World.player.health <= 0) {
		// GAME OVER
		gameOver();
	}

	updateMusic();
}
