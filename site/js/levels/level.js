/* LEVEL.JS
 * Manages the world and all associated assets during a single level/night.
 */

"use strict";

var Levels = [];

///////////////////////////////////////////////////////////////////////////////

function Level(label, initFunction){
	// Non-unique label for this level
	this.label = label;
	
	// List of GridRegions where no procedural content should be placed
	this.staticRegions = [];
	
	// Initialization Method
	this.init = function(worldSize){
		World.clear(worldSize || 150);
		GameObject.clearAll();
		GridObject.clearAll();
		initFunction(this);
		this.generateContent();
	}
}

Level.prototype.generateContent = function(){
	// Generate Trees?
	var numTrees = 200;
	var treeDensity = numTrees / (World.size*World.size);
	var animalDensity = 1 / 240;
	var rockDensity = 1/100;
	// Each grid cell has independent probability of containing tree
	for(var x = Math.floor(-World.size/2); x < World.size/2; x++){
		for(var y = Math.floor(-World.size/2); y < World.size; y++){
			// Skip cell if contained in a static region
			var skip = false;
			for(var i=0; i < this.staticRegions.length; i++) {
				if(this.staticRegions[i].contains(x,y) || World.isSolid(x,y)) {
					skip = true;
					break;
				}
			}
			if(skip) break;
			
			// Add tree with probability
			if(Math.random() < treeDensity) {
				World.addTree(x,y);
			} else {
				if (Math.random() < animalDensity) {
					World.addAnimal(x,y);
				} else {
					if (Math.random() < rockDensity) {
						new GridObject(x,y, GameAsset.rock);
					}
				}
			}
			var logPlace = true;
			for (var j = x; j >= x - 3; j--) {
				if (World.isSolid(j,y)) {
					logPlace = false;
				}
			}
			if (logPlace && Math.random() < 1/400) {
				new GridObject(x-3,y,GameAsset.log);

			}

		}
	}
	// Generate Rocks?

	// Generate Paths?
}