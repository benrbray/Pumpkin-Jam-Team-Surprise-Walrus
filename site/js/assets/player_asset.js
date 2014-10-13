/* PLAYER_ASSET.JS
 * 
 */

"use strict"

////////////////////////////////////////////////////////////////////////////////

// Player
GameAsset.player = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {
	context.save();
	context.translate(x,y);
	if (obj.vx * obj.vx + obj.vy * obj.vy > 0.03 * 0.03) {
		obj.drawx = obj.drawx * 0.9 + 0.1 * obj.vx;
		obj.drawy = obj.drawy * 0.9 + 0.1 * obj.vy;
		if (!isFinite(obj.drawx)) {
			obj.drawx = 0;
			obj.drawy = 0;
		}
	}
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );
	context.translate(0, 0.44);
	if (obj.leapwait > 45) {
		// Motion blur
		for (var i = 0; i < 1.2; i += 0.4) {
			context.globalAlpha = (1 - i);
			context.drawImage(asset.img,-.25,-.75 + i, 0.5, 1.5);
		}
		context.globalAlpha = 1;
	}
	context.drawImage(asset.img,-.25,-.75, 0.5, 1.5);
	context.restore();
});
GameAsset.player.img = new Image();
GameAsset.player.img.src = "assets/graphics/wolf_reference.png";