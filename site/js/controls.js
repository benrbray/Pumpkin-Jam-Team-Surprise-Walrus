//// KEY MAP ///////////////////////////////////////////////////////////////////

var KeyMap = {};
KeyMap[65] = KeyMap[37] = "LEFT";
KeyMap[87] = KeyMap[38] = "UP";
KeyMap[68] = KeyMap[39] = "RIGHT";
KeyMap[83] = KeyMap[40] = "DOWN";
KeyMap[32] = "SPACE";

var Keyboard = {};

//// KEY EVENTS ////////////////////////////////////////////////////////////////

function documentKeyUp(e) {
	Keyboard[KeyMap[e.keyCode] || String.fromCharCode(e.keyCode)] = false;
}

function documentKeyDown(e) {
	Keyboard[KeyMap[e.keyCode] || String.fromCharCode(e.keyCode)] = true;
}

function documentMouseDown(e) {
	// offsetX, offsetY
	
}
function documentMouseUp(e) {
	// offsetX, offsetY
	
}
function documentMouseMove(e) {
	// offsetX, offsetY
	
}