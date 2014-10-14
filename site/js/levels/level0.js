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

	World.settlements = ["Cabin","Tents","Horde","Campfire","Houses"];
	
	// Cabin Settlement
	level.staticRegions.push( new GridRegion(2,2, 4,7 ) );
	var cabin = new GridObject(2,2, GameAsset.cabin);
	new Light({x:4,y:4}, 6, 0.5, 200, 200, 100);
	World.addHuman("Cabin",6,5,false);
	World.addHuman("Cabin",7,6,false);
	World.addHuman("Cabin",1,1,false);
	World.addHuman("Cabin",6,9,false);

	// Tents Settlement
	level.staticRegions.push( new GridRegion(-11,29, 5,5 ) );
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
	level.staticRegions.push( new GridRegion(30,-30, 3,3 ) );
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

	// Campfire
	level.staticRegions.push( new GridRegion(-22,-22, 3,3 ) );
	new GridObject(-20,-20,GameAsset.campfire);
	new Light({x:-19.5,y:-19.5},7);
	World.addHuman("Campfire",-22,-22,true);
	World.addHuman("Campfire",-18,-22,true);
	World.addHuman("Campfire",-18,-18,true);
	World.addHuman("Campfire",-22,-18,true);

	// Houses
	level.staticRegions.push( new GridRegion(40, 30, 7,7) );
	new GridObject(40,30,GameAsset.cabin);
	new GridObject(44,30,GameAsset.cabin);
	new GridObject(48,34,GameAsset.cabin);
	new Light({x:46,y:31},5);
	World.addHuman("Houses",46,31,true);
	World.addHuman("Houses",46,31,true);
	World.addHuman("Houses",46,31,true);
	World.addZombie("Houses",40,34.5);
	World.addZombie("Houses",40,34.5);
	World.addZombie("Houses",40,34.5);
});