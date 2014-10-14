/* NATURAL_ASSETS.JS
 * GameAsset definitions of natural objects.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

// Rock
GameAsset.rock = new GameAsset(1,1, false, function(x,y,asset,obj){
	context.save();
	var randomRotation = (x + y * Math.E) % (Math.PI * 2);
	context.translate(x + 0.5,y + 0.5);
	context.rotate(randomRotation);
	context.drawImage( GameAsset.rock.img, -0.5, -.5, 1, 1 );
	context.restore();
});
GameAsset.rock.img = new Image();
GameAsset.rock.img.src = "assets/graphics/rock.png";

// Tree Trunk
GameAsset.treeTrunk = new GameAsset(1,1, false, function(x,y,asset,obj){
	context.save();
	var randomRotation = (x + y * Math.E) % (Math.PI * 2);
	context.translate(x + 0.5,y + 0.5);
	context.rotate(randomRotation);
	context.drawImage( GameAsset.treeTrunk.img, -0.5, -.5, 1, 1 );
	context.restore();
});
GameAsset.treeTrunk.img = new Image();
GameAsset.treeTrunk.img.src = "assets/graphics/tree_trunk.png";

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

GameAsset.grassImg = new Image();
GameAsset.grassImg.src = "assets/graphics/grass.png";