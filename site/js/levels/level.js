/* LEVEL.JS
 * Manages the world and all associated assets during a single level/night.
 */

"use strict";

var Levels = [];

///////////////////////////////////////////////////////////////////////////////

function Level(label, initFunction){
	this.label = label;
	this.init = function(worldSize){
		World.clear(worldSize || 128);
		GameObject.clearAll();
		initFunction();
	}
}