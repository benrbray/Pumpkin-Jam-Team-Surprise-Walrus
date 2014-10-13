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
	GameObject.add(player);
	
	// Manually add trees
	World.addTree(10,10);
	World.addTree(10,11);
	World.addTree(12,13);
	
	// Spawn Trees
	// Spawn Mortals
});