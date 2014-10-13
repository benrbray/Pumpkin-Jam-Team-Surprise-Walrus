/* GAMEASSET.JS
 * Class representing a single asset, with information about shape, size, and
 * walkability.
 *
 */

function GameAsset(width, height, walkGrid, path){
	// Instance Variables ------------------------------------------------------
	
	this.width = width;			// width of asset, in tiles
	this.height = height;		// height of asset, in tiles
	this.walkGrid = walkGrid;	// 2d array of walkability 'grid' of this asset
	this.imagePath = path;		// image path
	
	// Draw --------------------------------------------------------------------
	
	this.draw = function(x,y){
		// TODO
		context.fillStyle = "white";
		context.fillRect(x,y, this.width, this.height);
	}
 }