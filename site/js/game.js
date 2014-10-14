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
}

////////////////////////////////////////////////////////////////////////////////

function gameRestart() {
	gameInit();
	htmlgameover.style.display = "none";
	htmlgameover.style.opacity = 0;
}

////////////////////////////////////////////////////////////////////////////////

function gameOver() {
	htmlgameover.style.display = "block";
	htmlgameover.opacity = 1;
	var summary = "";
	summary += "<p>";
	summary += "You hunted <strong>" + Stat.animals + " small animals</strong> ";
	summary += "and killed <strong>" + Stat.humans + " humans</strong>. ";
	summary += "<p>";
	summary += "You took <strong>" + (Stat.steps << 0) + " steps</strong> and";
	summary += "<strong>lunged " + Stat.lunges + " times</strong>.";
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	// Update Everything

	Stat.px = World.player.x;
	Stat.py = World.player.y;

	GameObject.updateAll();

	Stat.steps += distance(Stat.px,Stat.py,World.player.x,World.player.y) * 2;
	
	// Draw Everything
	draw();
	requestAnimationFrame(gameUpdate);

	// Move Camera
	Camera.x = Camera.x * 0.7 + World.player.x * 0.3;
	Camera.y = Camera.y * 0.7 + World.player.y * 0.3;
	var world = Camera.fromScreen(Mouse.x,Mouse.y);
	Mouse.worldx = world[0];
	Mouse.worldy = world[1];
	if (World.player.health <= 0) {
		// GAME OVER
		gameOver();
	}
}
