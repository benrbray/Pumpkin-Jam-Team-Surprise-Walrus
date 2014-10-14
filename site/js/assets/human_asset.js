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

	// We're centered on the player's center
	// So rotate in the right direction
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );

	// Draw the wolf
	context.drawImage(asset.img,-.5,-.5, 1, 1);

	// Put the context like it was before
	context.restore();

	if (obj.glaring) {
		context.moveTo(obj.x,obj.y);
		context.lineTo(World.player.x,World.player.y);
		context.stroke();
	}
});

// Create HTML Img element:
GameAsset.humanPlain.img = new Image();
GameAsset.humanPlain.img.src = "assets/graphics/HumanGlasses.png";