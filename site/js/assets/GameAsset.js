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
		this.draw = function(x,y, obj){
			if (Camera.contains(x,y)) {
				drawFunction(x, y, this, obj);
			} 
		}
	} else if (drawFunction) { // drawFunction is provided, treat as sprite
		// Prepare Image instance for drawing sprite
		var t = this;
		this.img = new Image();
		this.img.onload = function() { t.imgready = true; };
		this.img.src = drawFunction;
		
		// Draw sprite
		this.draw = function(x,y){
			if (Camera.contains(x,y)) {
				GameAsset.drawSprite(x, y, this);
			}
		}
	} else {
		// Draw bounding box if no image / 
		this.draw = function(x,y) { 
			if (Camera.contains(x,y)) {
				GameAsset.drawBox(x,y,this);
			}
		};
	}
}

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GameAsset.drawBox = function(x, y, obj){
	context.fillStyle = obj.randomColor;
	context.fillRect(x,y, obj.width, obj.height);
}

GameAsset.drawSprite = function(x, y, obj){
	if (obj.imgready) {
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

////////////////////////////////////////////////////////////////////////////////

GameAsset.ihouse0 = new Image();
GameAsset.ihouse0.src = "assets/graphics/houseicon.png";
GameAsset.ihouse1 = new Image();
GameAsset.ihouse1.src = "assets/graphics/houseiconhalf.png";
GameAsset.ihouse2 = new Image();
GameAsset.ihouse2.src = "assets/graphics/houseiconlit.png";

// Blood Splatters -------------------------------------------------------------

GameAsset.splatters = [
	new GameAsset(1.5, 1.5,true,"assets/graphics/particles/blood_large1.png"),
	new GameAsset(1.5, 1.5,true,"assets/graphics/particles/blood_large2.png"),
	new GameAsset(1.5, 1.5,true,"assets/graphics/particles/blood_large3.png"),
	new GameAsset(1.5, 1.5,true,"assets/graphics/particles/blood_large4.png")
];

GameAsset.getSplatter = function(){
	return GameAsset.splatters[(Math.random()*GameAsset.splatters.length)<<0];
}