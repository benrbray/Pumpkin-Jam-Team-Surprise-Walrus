/* VECTOR.JS
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

function Vector(x,y){
	this.x = x;
	this.y = y;
}

// Vector Operations -----------------------------------------------------------

Vector.prototype.add = function(v){
	return new Vector(this.x + v.x, this.y + v.y);
}

Vector.prototype.subtract = function(v){
	return new Vector(this.x - v.x, this.y - v.y);
}

Vector.prototype.multiply = function(k){
	return new Vector(this.x*k, this.y*k);
}

Vector.prototype.to = function(v){
	return v.subtract(this);
}

Vector.prototype.from = function(v){
	return this.to(v).multiply(-1);
}

// normal vector
Vector.prototype.norm = function(){
	return this.multiply(this.mag());
}


// Scalar Operations -----------------------------------------------------------

// dot product
Vector.prototype.dot = function(v){
	return this.x*v.x+this.y*v.y;
}
// magnitude
Vector.prototype.mag = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y);
}
// distance to another vector
Vector.prototype.distTo = function(v){
	return this.subtract(v)

Vector.prototype.angle = function(){
	return Math.atan2(this.y/this.x);
}