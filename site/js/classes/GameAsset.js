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

	var randomRed = Math.random() * 255;
	var randomGreen = Math.random() * 255;
	var randomBlue = Math.random() * 255;
	this.draw = function(x,y){
		// TODO

		context.fillStyle = htmlColor(randomRed, randomGreen, randomBlue);
		context.fillRect(x,y, this.width, this.height);
	}
}