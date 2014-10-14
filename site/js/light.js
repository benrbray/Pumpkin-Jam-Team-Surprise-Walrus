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
Light.drawAll = function(){
	Light.time++;
	for(var i = 0; i < Light.lights.length; i++){
		Light.lights[i].drawLight(context, 0);
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
	ctx.fillStyle = this.getColor();
	ctx.fillEllipse(rx, ry, rw, rh);
}

