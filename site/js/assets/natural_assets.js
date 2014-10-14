/* NATURAL_ASSETS.JS
 * GameAsset definitions of natural objects.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

// Tree Trunk
GameAsset.treeTrunk = new GameAsset(1,1, false, "wal.png");
// Tree Body
GameAsset.treeBody = new GameAsset(3,3, true, function(x,y,asset,obj){
	context.globalAlpha = 0.75;
	context.save();
	obj.randomRotation = obj.randomRotation || (Math.random() * Math.PI * 2);
	context.translate(x,y);
	context.rotate(obj.randomRotation);
	context.drawImage( GameAsset.treeBody.img, -2.5, -2.5, 5, 5 );
	context.restore();
	context.globalAlpha = 1;
});
GameAsset.treeBody.img = new Image();
GameAsset.treeBody.img.src = "assets/graphics/tree1.png";