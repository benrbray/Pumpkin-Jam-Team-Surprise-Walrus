/* GRIDOBJECT.JS
 * Class for static objects aligned to the grid.
 */
 
function GridObject(xTile, yTile, gameAsset){
	this.xTile = xTile;
	this.yTile = yTile;
	this.gameAsset = gameAsset;
	var halfWidth = gameAsset.width / 2 << 0;
	var halfHeight = gameAsset.height / 2 << 0;
	for (var x = 0; x < gameAsset.width; x++) {
		for (var y = 0; y < gameAsset.height; y++) {
			if (!gameAsset.walkGrid[x][y]) {
				World.grid[
					this.xTile + x - halfWidth
				][
					this.yTile + y - halfHeight
				] = true;
			}
		}
	}
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
