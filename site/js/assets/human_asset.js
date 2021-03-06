/* HUMAN_ASSET.JS
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

GameAsset.humanPlain = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {
	context.save();
	// Save to leave untouched by this function
	context.translate(x,y);
	// Move context origin to player's center
	if (magnitude(obj.vx, obj.vy) > 0.03) {
		// If the player is moving at least a little...
		obj.drawx = obj.drawx * 0.9 + 0.1 * obj.vx;
		obj.drawy = obj.drawy * 0.9 + 0.1 * obj.vy;
		// turning in the direction they're moving
		if (!isFinite(obj.drawx)) {
			obj.drawx = 0;
			obj.drawy = 0;
			// Set drawx to 0 in case it became NaN
		}
	}

	// We're centered on the human's center
	// So rotate in the right direction
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );

	// Draw the human
	context.drawImage(asset.img,-.65,-.65, 1.3, 1.3);

	// Put the context like it was before
	context.restore();
});

// Create HTML Img element:
GameAsset.humanPlain.img = new Image();
GameAsset.humanPlain.img.src = "assets/graphics/HumanGlasses.png";


////////////////////////////////////////////////////////////////////////////////

GameAsset.humanGun = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {
	context.save();
	// Save to leave untouched by this function
	context.translate(x,y);
	// Move context origin to player's center
	if (magnitude(obj.vx, obj.vy) > 0.03) {
		// If the player is moving at least a little...
		obj.drawx = (obj.drawx||0) * 0.9 + 0.1 * obj.vx;
		obj.drawy = (obj.drawy||0) * 0.9 + 0.1 * obj.vy;
		// turning in the direction they're moving
	}

	// We're centered on the player's center
	// So rotate in the right direction
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );

	// Draw the wolf
	context.drawImage(asset.img,-.65,-.65, 1.3, 1.3);

	// Put the context like it was before
	context.restore();
});

// Create HTML Img element:
GameAsset.humanGun.img = new Image();
GameAsset.humanGun.img.src = "assets/graphics/HumanShotgun.png";



////////////////////////////////////////////////////////////////////////////////

GameAsset.humanZombie = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {
	context.save();
	// Save to leave untouched by this function
	context.translate(x,y);
	// Move context origin to player's center
	if (magnitude(obj.vx, obj.vy) > 0.03) {
		// If the player is moving at least a little...
		obj.drawx = (obj.drawx||0) * 0.9 + 0.1 * obj.vx;
		obj.drawy = (obj.drawy||0) * 0.9 + 0.1 * obj.vy;
		// turning in the direction they're moving
	}

	// We're centered on the player's center
	// So rotate in the right direction
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );

	// Draw the wolf
	context.drawImage(asset.img,-.65,-.65, 1.3, 1.3);

	// Put the context like it was before
	context.restore();
});

// Create HTML Img element:
GameAsset.humanZombie.img = new Image();
GameAsset.humanZombie.img.src = "assets/graphics/zombie1.png";