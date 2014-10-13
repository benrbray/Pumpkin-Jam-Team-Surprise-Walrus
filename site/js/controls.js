//// KEY MAP ///////////////////////////////////////////////////////////////////

var KeyMap = {};
KeyMap[65] = KeyMap[37] = "LEFT";
KeyMap[87] = KeyMap[38] = "UP";
KeyMap[68] = KeyMap[39] = "RIGHT";
KeyMap[83] = KeyMap[40] = "DOWN";
KeyMap[32] = "SPACE";

var Mouse = {};
Mouse.x = 5;
Mouse.y = 5;

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
	documentMouseMove(e);
	Mouse.down = true;
}
function documentMouseUp(e) {
	// offsetX, offsetY
	documentMouseMove(e);
	Mouse.down = false;
}
function documentMouseMove(e) {
	// offsetX, offsetY
	Mouse.x = e.offsetX;
	Mouse.y = e.offsetY;
}