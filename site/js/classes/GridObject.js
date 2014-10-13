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
			if (gameAsset.walkGrid[x][y]) {
				World.grid[
					this.xTile + x - HalfWidth
				][
					this.yTile + y - halfHeight
				] = true;
			}
		}
	}
 }
 
 GridObject.prototype.draw = function(){
	this.gameAsset.draw(this.xTile, this.yTile);
 }
 
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
 
GridObject.gridObjects = [];

////////////////////////////////////////////////////////////////////////////////

GridObject.drawAll = function(){
	var gridObjects = GridObject.gridObjects;
	
	for(var i = 0; i < gridObjects.length; i++){
		var obj = gridObjects[i];
		obj.draw();
	}
}
