/* LEVEL0.JS
 * Test level.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

Levels[0] = new Level("Test Level", function(){
	// Camp Setup
	var cabin = new GridObject(2,2, GameAsset.cabin);
	
	// Define Player
	player = new GameObject(playerThink, 1,1, GameAsset.player);
	GameObject.add(player);
	
	// Manually add trees
	World.addTree(10,10);
	World.addTree(10,11);
	World.addTree(12,13);
	
	// Spawn Trees
	// Spawn Mortals
});