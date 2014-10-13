/* LEVEL0.JS
 * Test level.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

Levels[0] = new Level("Test Level", function(){
	// Camp Setup
	var cabin = new GridObject(2,2, GameAsset.cabin);
	
	// Manually add trees
	var g = new GridObject(10,10, GameAsset.tree);
	var g = new GridObject(10,11, GameAsset.tree);
	var g = new GridObject(12,13, GameAsset.tree);
	
	// Define Player
	player = new GameObject(playerThink, 1,1, GameAsset.player);
	GameObject.add(player);
	
	// Spawn Trees
	// Spawn Mortals
});