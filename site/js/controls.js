////////////////////////////////////////////////////////////////////////////////
var Keyboard = {};

function documentKeyUp(e) {
	// e.keyCode is a number representing key (ASCII for those)
	Keyboard[String.fromCharCode(e.keyCode)] = false;
}

function documentKeyDown(e) {
	// e.keyCode is a number representing key (ASCII for those)
	Keyboard[String.fromCharCode(e.keyCode)] = true;
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