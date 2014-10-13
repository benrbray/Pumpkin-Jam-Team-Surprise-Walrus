/* LEVEL0.JS
 * Test level.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

Levels[0] = new Level("Test Level", function(){
	// Camp Setup
	var cabin = new GridObject(2,2, GameAsset.cabin);
	
	// Define Player
	var player = World.addPlayer(1,1);
	
	// Manually add trees
	World.addTree(10,10);
	World.addTree(10,11);
	World.addTree(12,13);
	
	
	World.addHuman(5,5);
	World.addHuman(5,6);
	World.addHuman(5,7);
	World.addHuman(5,9);
	
	// Spawn Trees
	// Spawn Mortals
});