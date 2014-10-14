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
		World.clear(worldSize || 100);
		GameObject.clearAll();
		initFunction();
		this.generateContent();
	}
}

Level.prototype.generateContent = function(){
	// Generate Trees?
	var numTrees = 200;
	var density = numTrees / (World.size*World.size);
	var animals = 0;
	var animalDensity = 1 / 240;
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
			if(Math.random() < density) {
				World.addTree(x,y);
			} else {
				if (Math.random() < animalDensity) {
					World.addAnimal(x,y);
					animals++;
				}
			}
		}
	}
	// Generate Rocks?
	
	// Generate Paths?
}