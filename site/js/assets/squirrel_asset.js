/* SQUIRREL_ASSET.JS
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

GameAsset.squirrel = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {
	context.save();
	if (!obj.rand) {
		obj.rand = Math.random() * Math.PI;
	}
	// Save to leave untouched by this function
	context.translate(x,y - Math.abs(Math.cos(obj.rand + (new Date()).getTime() / 120.0  )) / 3.0  );
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
	context.drawImage(asset.img,-.4,-.4 * 1.4, 0.8, .8 * 1.4);
	// Put the context like it was before
	context.restore();
});

// Create HTML Img element:
GameAsset.squirrel.img = new Image();
GameAsset.squirrel.img.src = "assets/graphics/Bunny1.png";