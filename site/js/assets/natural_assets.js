/* NATURAL_ASSETS.JS
 * GameAsset definitions of natural objects.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

// Tree Trunk
GameAsset.treeTrunk = new GameAsset(1,1, false, "wal.png");
// Tree Body
GameAsset.treeBody = new GameAsset(3,3, true, function(x,y,asset,obj){
	context.fillStyle = "rgba(255,255,255,0.5)";
	context.fillCircle(x, y, 2);
});