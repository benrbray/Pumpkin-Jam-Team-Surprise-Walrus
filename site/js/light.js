/* LIGHT.JS
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

/* LIGHT
 * @param (gameObject) Light will be centered around this object.
 * @param (radius)
 * @param (intensity) in [0,1]
 * @param (r,g,b) each in [0,255]
 */
function Light(gameObject, radius, intensity, r, g, b){
	// Set Parameters
	this.gameObject = gameObject;
	this.radius = radius;
	this.intensity = intensity;
	this.getColor = function(){
		return htmlColor(r,g,b,intensity);
	}
	Light.add(this);
}

Light.lights = [];
Light.time = 0;

Light.add = function(light){
	// add light to lights if it doesn't already exist
	if(Light.lights.indexOf(light) == -1){
		Light.lights.push(light);
	}
}

/* LIGHT.DRAWALL
 */
Light.drawAll = function(ctx){
	Light.time++;
	for(var i = 0; i < Light.lights.length; i++){
		Light.lights[i].drawLight(ctx, 0);
	}
}

/* LIGHT.DRAWLIGHT
 * Draws this light on the specified canvas.  Lights will be layered, and each
 * layer should have a slightly different size/location.
 * @param (ctx) Canvas context for drawing.
 * @param (layer) Integer >= 0
 */
Light.prototype.drawLight = function(ctx, layer){
	// Generate random size/location
	var rx = this.gameObject.x + rnd()*0.1;	// additive offset
	var ry = this.gameObject.y + rnd()*0.1;	// additive offset
	var rw = this.radius * (1+rnd()/100/(layer+1));	// multiplicative offset
	var rh = this.radius * (1+rnd()/100/(layer+1));	// multiplicative offset
	
	// Draw Ellipse
	//ctx.fillStyle = this.getColor();
	ctx.fillEllipse(rx, ry, rw, rh);
}



















var lightingCanvases = [];
for (var k = 0; k < 3; k++) {
	lightingCanvases.push(canvas());
}

function drawLighting() {
	var ctxs = [];
	// Go over 3 canvases
	for (var i = 0; i < lightingCanvases.length; i++) {
		ctxs[i] = lightingCanvases[i].getContext("2d");
		ctxs[i].width = ctxs[i].width;
		ctxs[i].setTransform(1,0,0,1,0,0);
		
		ctxs[i].fillStyle = "#6E809E"; // Medium
		ctxs[i].fillRect(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
		// Fill background with blue
		ctxs[i].save();
		Camera.transform(ctxs[i]);
		// Set their transform to be the same as the normal canvas's
		// to fit the Camera.
	}

	for (var i = 0; i < 3; i++) {
		ctxs[i].fillStyle = "#FFF3BA"; // Pale yellow
		Light.drawAll( ctxs[i] );
		ctxs[i].restore();
		// Draw each layer of lights
	}
	// Layer lighting canvases:
	ctxs[0].globalAlpha = 0.5;
	ctxs[0].drawImage(lightingCanvases[1],0,0);
	ctxs[0].globalAlpha = 0.333;
	ctxs[0].drawImage(lightingCanvases[2],0,0);
	// Multiply lighting onto main context:
	contextmultiply(context,ctxs[0]);
}


// Multiplies context `other` onto context `onto`
function contextmultiply(onto,other) {
	var edit = onto.getImageData(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
	var mult = other.getImageData(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	// Image data (bitmap arrays) for each context

	var e = edit.data;
	var m = mult.data;

	for (var i = 0; i < e.length; i += 4) {
		e[i] = e[i] * m[i] / 255;
		e[i+1] = e[i+1] * m[i+1] / 255;
		e[i+2] = e[i+2] * m[i+2] / 255;
	}

	// Writes data to `onto`
	onto.putImageData(edit,0,0);
}