/* GRIDOBJECT.JS
 * Class for static objects aligned to the grid.
 */
 
function GridObject(xTile, yTile, gameAsset){
	this.xTile = xTile;
	this.yTile = yTile;
	this.gameAsset = gameAsset;
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
