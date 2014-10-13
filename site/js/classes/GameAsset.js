/* GAMEASSET
 * Represents a single asset, with information about shape, size, and
 * walkability.  
 * @param (width, height) Dimensions of asset bounding box on the grid.
 * @param (walkGrid) Two-dimensional array of walkability values over the grid
 *		of this asset. Optionally, give a single true/false value to set the
 *		walkability for the entire asset.
 * @param (drawFunction) Function that handles drawing of this object; will be
		passed 'this' as a parameter.  Optionally, provide an image file path to
		use the default sprite drawing function.
 */
function GameAsset(width, height, walkGrid, drawFunction){
	// Instance Variables ------------------------------------------------------
	
	this.width = width;			// width of asset, in tiles
	this.height = height;		// height of asset, in tiles
	this.walkGrid = walkGrid;	// 2d array of walkability 'grid' of this asset
	
	// Draw --------------------------------------------------------------------
	
	// Generate random color for asset
	this.randomColor = htmlColor(
		Math.random()*255,
		Math.random()*255,
		Math.random()*255
	);
	
	// Use draw function if provided; otherwise treat as image and draw sprite
	if(drawFunction instanceof Function) {
		this.draw = function(x,y){ drawFunction(x, y, this); }
	} else if (drawFunction) {
		this.draw = function(x,y){
			GameAsset.drawSprite(x, y, drawFunction, this);
		}
	} else {
		this.draw = function(x,y) { 
			GameAsset.drawBox(x,y,this);
		};
	}
}

//// PREDEFINED ASSETS /////////////////////////////////////////////////////////

GameAsset.tree = new GameAsset(1,1,[[true]], null);
GameAsset.player = new GameAsset(0.8, 0.8, [[false]], null);

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GameAsset.drawBox = function(x, y, obj){
	context.fillStyle = obj.randomColor;
	context.fillRect(x,y, obj.width, obj.height);
}

GameAsset.drawSprite = function(x, y, path, obj){
	// TODO
}