/* LEVEL0.JS
 * Test level.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

Levels[0] = new Level("Test Level", function(){
	// Camp Setup
	var cabin = new GridObject(2,2, GameAsset.cabin);
	
	// Define Player
	World.addPlayer(1,1);
	
	// Manually add trees
	World.addTree(10,10);
	World.addTree(10,11);
	World.addTree(12,13);
	
	
	World.addHuman(6,5);
	World.addHuman(6,6);
	World.addHuman(6,7);
	World.addHuman(6,9);
	
	var playerLight = new Light(World.player, 2, 0.5, 200, 200, 100);
	
	// Spawn Trees
	// Spawn Mortals
});