/* GRIDOBJECT.JS
 * Class for static objects aligned to the grid.
 */
 
function GridObject(xTile, yTile, gameAsset){
	// Instance Variables ------------------------------------------------------
	this.xTile = xTile;
	this.yTile = yTile;	
	this.gameAsset = gameAsset;
	
	var halfWidth = 0;
	var halfHeight = 0;
	
	// Management --------------------------------------------------------------
	
	// Write to Global Grid
	for (var localX = 0; localX < gameAsset.width; localX++) {
		for (var localY = 0; localY < gameAsset.height; localY++) {
			if (!gameAsset.walkGrid[localX][localY]) {
				var globalX = this.xTile + localX - halfWidth;
				var globalY = this.yTile + localY - halfHeight;
				World.grid[globalX][globalY] = true;
			}
		}
	}
	
	// Stage this object for drawing
	GridObject.gridObjects.push(this);
 }
 
 GridObject.prototype.draw = function(){
	this.gameAsset.draw(this.xTile, this.yTile);
 }
 
////////////////////////////////////////////////////////////////////////////////

// TODO:  GridObject.worldInit() adds and keeps track of all static objects

// Adds a GridObject to the stage to be drawn
/*GridObject.add = function(gridObject){
	GridObject.gridObjects.push(gridObject);
}*/

//// STATIC FUNCTIONS //////////////////////////////////////////////////////////

GridObject.gridObjects = [];

// Calls the draw() for all staged GridObjects
GridObject.drawAll = function(){
	var gridObjects = GridObject.gridObjects;
	
	for(var i = 0; i < gridObjects.length; i++){
		var obj = gridObjects[i];
		obj.draw();
	}
}
