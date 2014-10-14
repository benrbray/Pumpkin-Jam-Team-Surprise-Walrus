/* LEVEL0.JS
 * Test level.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

Levels[0] = new Level("Test Level", function(level){

	//level.staticRegions.push(new GridRegion(x,y,w,h));
	
	// Camp Setup
	var cabin = new GridObject(2,2, GameAsset.cabin);
	new Light({x:4,y:4}, 6, 0.5, 200, 200, 100);
	
	// Define Player
	World.addPlayer(-20,-20);
	
	// Manually add trees
	World.addTree(10,10);
	World.addTree(10,11);
	World.addTree(12,13);
	
	
	World.addHuman(6,5,false);
	World.addHuman(7,6,false);
	World.addHuman(1,1,false);
	World.addHuman(6,9,false);


	new GridObject(-10,30, GameAsset.tent);
	new GridObject(-11,34, GameAsset.tent);
	new GridObject(-9,34, GameAsset.tent);
	new Light({x:-10.5,y:33},3, 0.5, 200, 200, 100);
	World.addHuman(-7,30,true);
	World.addHuman(-11,30,true);
	World.addHuman(-8,33,false);
	World.addHuman(-10,33,false);
	new GridObject(-12,26, GameAsset.tent);

});