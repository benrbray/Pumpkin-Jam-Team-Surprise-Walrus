/* GAMEASSET
 * Represents a single asset, with information about shape, size, and
 * walkability.  
 * @param (width, height) Dimensions of asset bounding box on the grid.
 * @param (walkGrid) Two-dimensional array of walkability values over the grid
 *		of this asset. Optionally, give a single true/false value to set the
 *		walkability for the entire asset.  "true" means a tile is walkable.
 * @param (drawFunction) Function that handles drawing of this object; will be
		passed 'this' as a parameter.  Optionally, provide an image file path to
		use the default sprite drawing function.
 */
function GameAsset(width, height, walkGrid, drawFunction){
	// Instance Variables ------------------------------------------------------
	
	this.width = width;			// width of asset, in tiles
	this.height = height;		// height of asset, in tiles
	
	// If walkGrid is boolean, build a 2d array; otherwise use provided grid
	if(walkGrid instanceof Array){
		this.walkGrid = walkGrid;
	} else {
		this.walkGrid = gridOfSize(this.width, this.height, walkGrid);
	}
	
	// Draw --------------------------------------------------------------------
	
	// Generate random color for asset
	this.randomColor = htmlColor(
		Math.random()*255,
		Math.random()*255,
		Math.random()*255
	);
	
	// Use draw function if provided; otherwise treat as image and draw sprite
	if(drawFunction instanceof Function) {
		this.draw = function(x,y, obj){ drawFunction(x, y, this, obj); }
	} else if (drawFunction) {
		// drawFunction is provided but not a function
		// -- it is a sprite
		this.img = new Image();
		var t = this;
		this.img.onload = function() {
			t.imgready = true;
		};
		this.img.src = drawFunction;
		this.draw = function(x,y){
			GameAsset.drawSprite(x, y, this);
		}
	} else {
		this.draw = function(x,y) { 
			GameAsset.drawBox(x,y,this);
		};
	}
}

//// PREDEFINED ASSETS /////////////////////////////////////////////////////////

// Natural Elements
GameAsset.treeTrunk = new GameAsset(1,1, false, "wal.png");

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
	if (obj.leapwait > 45) {
		// Motion blur
		for (var i = 0; i < 1.2; i += 0.4) {
			context.globalAlpha = (1 - i) / 1.5;
			context.drawImage(asset.img,-.25,-.75 + i, 0.5, 1.5);
		}
		context.globalAlpha = 1;
	}
	context.drawImage(asset.img,-.25,-.75, 0.5, 1.5);
	context.restore();
});
GameAsset.player.img = new Image();
GameAsset.player.img.src = "assets/graphics/wolf_reference.png";

// Humans

// Settlements
GameAsset.cabin = new GameAsset(4, 3, false);

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GameAsset.drawBox = function(x, y, obj){
	context.fillStyle = obj.randomColor;
	context.fillRect(x,y, obj.width, obj.height);
}

GameAsset.drawSprite = function(x, y, obj){
	if (obj.imgready && Camera.contains(x,y)) {
		var halfWidth = 0;
		var halfHeight = 0;
		context.drawImage(
			obj.img, 
			x - halfWidth,
			y - halfHeight,
			obj.width,
			obj.height
		);
	}
}