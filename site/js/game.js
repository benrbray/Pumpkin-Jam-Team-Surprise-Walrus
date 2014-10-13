/* GAME.JS
 *
 */
 
"use strict";

////////////////////////////////////////////////////////////////////////////////

function gameInit(){
	var g = new GridObject(1,1, new GameAsset(1,1,[],null));
	GridObject.gridObjects.push(g);
	
	var g = new GridObject(0,0, new GameAsset(1,1,[],null));
	GridObject.gridObjects.push(g);
	
	var g = new GridObject(2,3, new GameAsset(1,1,[],null));
	GridObject.gridObjects.push(g);
}

////////////////////////////////////////////////////////////////////////////////

function gameUpdate(){
	draw();
	requestAnimationFrame(gameUpdate);
	if (Keyboard.LEFT) {
		Camera.x -= 1;
	}
	if (Keyboard.RIGHT) {
		Camera.x += 1;
	}
	if (Keyboard.UP) {
		Camera.y -= 1;
	}
	if (Keyboard.DOWN) {
		Camera.y += 1;
	}
}