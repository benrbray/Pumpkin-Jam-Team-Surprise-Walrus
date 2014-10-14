/* LEVEL0.JS
 * Test level.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

Levels[0] = new Level("Test Level", function(level){

	//level.staticRegions.push(new GridRegion(x,y,w,h));
	
	// Define Player
	World.addPlayer(-10,-10);
	World.addTree(-15,-15);
	World.addTree(-15,-12);
	World.addTree(-15,-15);
	
	// Cabin Settlement
	level.staticRegions.push( new GridRegion(2,2, 4,7 ) );
	var cabin = new GridObject(2,2, GameAsset.cabin);
	new Light({x:4,y:4}, 6, 0.5, 200, 200, 100);
	World.addHuman("Cabin",6,5,false);
	World.addHuman("Cabin",7,6,false);
	World.addHuman("Cabin",1,1,false);
	World.addHuman("Cabin",6,9,false);

	// Tents Settlement
	new GridObject(-10,30, GameAsset.tent);
	new GridObject(-11,34, GameAsset.tent);
	new GridObject(-9,34, GameAsset.tent);
	new Light({x:-10.5,y:33},3, 0.5, 200, 200, 100);
	World.addHuman("Tents",-7,30,true);
	World.addHuman("Tents",-11,30,true);
	World.addHuman("Tents",-8,33,false);
	World.addHuman("Tents",-10,33,false);
	new GridObject(-12,26, GameAsset.tent);

	// Horde Settlement
	new GridObject(30, -30, GameAsset.tent);
	new Light({x:31,y:-28},4,0.5,200,200,100);
	World.addHuman("Horde",30,-30,true);
	World.addHuman("Horde",30,-35,false);
	World.addHuman("Horde",30,-35,true);
	World.addZombie("Horde",30,-35);
	World.addZombie("Horde",30,-35);
	World.addZombie("Horde",30,-35);
	World.addZombie("Horde",30,-25);
	World.addZombie("Horde",30,-25);
	World.addZombie("Horde",30,-35);
	World.addZombie("Horde",30,-35);
	World.addZombie("Horde",30,-35);
	World.addZombie("Horde",30,-25);
	World.addZombie("Horde",30,-25);

	
});