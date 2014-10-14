/* PLAYER_ASSET.JS
 * 
 */

"use strict"

////////////////////////////////////////////////////////////////////////////////

// Player
GameAsset.player = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {

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

	// We're centered on the player's center
	// So rotate in the right direction
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );

	// Move up a little to center on neck
	context.translate(0, 0.44);

	if (obj.leapwait > 45) {
		// If we're currently leaping...

		// Motion blur
		for (var i = 0; i < 1.2; i += 0.4) {
			context.globalAlpha = (1 - i);
			context.drawImage(asset.img,-.25,-.75 + i, 0.5, 1.5);
		}
		context.globalAlpha = 1;
	}

	// Draw the wolf
	context.drawImage(asset.img,-.25,-.75, 0.5, 1.5);

	// Put the context like it was before
	context.restore();
});

// Create HTML Img element:
GameAsset.player.img = new Image();
GameAsset.player.img.src = "assets/graphics/wolf_reference.png";