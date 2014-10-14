/* GAME.JS
 *
 */

"use strict";

var Stat = {};

var isGameOver = false;

function gameInit(){
	isGameOver = false;
	Stat.animals = 0;
	Stat.humans = 0;
	Stat.zombies = 0;
	Stat.steps = 0;
	Stat.lunges = 0;
	var level = Levels[0];
	level.init();
	GameObject.fixDepth();
}

function gameRestart(won) {
	document.getElementById('gameoverlay').style.opacity = 0;

	setTimeout(function(){
		if(won) Sounds.win.stop();
		document.getElementById('gameover').style.display = "none";
		document.getElementById('gamewin').style.display = "none";
		document.getElementById('gameoverlay').style.display = "none";
		World.clear();
		gameInit();
	}, 500);
}

function gameOver() {
	isGameOver = true;

	Sounds.musicMeadow.setVolume(0);
	Sounds.musicAction.setVolume(0);
	Sounds.lose.setVolume(.7);
	Sounds.lose.play(false);

	document.getElementById('killnum').innerHTML = Stat.animals + Stat.humans;
	document.getElementById('killnum_human').innerHTML = Stat.humans;
	document.getElementById('killnum_animals').innerHTML = Stat.animals;
	document.getElementById('killnum_zombies').innerHTML = Stat.zombies;

	document.getElementById('lunge_count').innerHTML = Stat.lunges;
	document.getElementById('steps_taken').innerHTML = Math.round(Stat.steps);

	document.getElementById('gameover').style.display = "block";
	document.getElementById('gameoverlay').style.display = "block";

	setTimeout(function(){document.getElementById('gameoverlay').style.opacity = 1;}, 30);
}

function gameWin(){
	isGameOver = true;

	Sounds.musicMeadow.setVolume(0);
	Sounds.musicAction.setVolume(0);
	Sounds.win.setVolume(.7);
	Sounds.win.play(true);

	document.getElementById('killnum').innerHTML = Stat.animals + Stat.humans;
	document.getElementById('killnum_human').innerHTML = Stat.humans;
	document.getElementById('killnum_animals').innerHTML = Stat.animals;

	document.getElementById('lunge_count').innerHTML = Stat.lunges;
	document.getElementById('steps_taken').innerHTML = Math.round(Stat.steps);

	document.getElementById('gamewin').style.display = "block";
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
