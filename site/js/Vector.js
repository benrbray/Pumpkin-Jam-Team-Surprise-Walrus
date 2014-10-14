/* VECTOR.JS
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////

function Vector(x,y){
	this.x = x || 0;
	this.y = y || 0;
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

// vector pointing from this to that
Vector.prototype.to = function(v){
	return v.subtract(this);
}

// vector pointing from that to this
Vector.prototype.from = function(v){
	return this.to(v).multiply(-1);
}

// normal vector
Vector.prototype.norm = function(){
	if(this.mag()<0.0001){ console.log("TAKING NORM OF ZERO"); }
	return this.multiply(this.mag());
}

// rotate this vector by theta radians
Vector.prototype.rotate = function(radians){
	var c = Math.cos(radians);
	var s = Math.sin(radians);
	return new Vector(this.x * c - this.y * s, this.x * s + this.y * c);
}

Vector.prototype.rotateTowards = function(v){
	var dotprod = this.norm().dot(v.norm());
	var t = 0.1 * Math.acos(dotprod);
	
	var u1 = this.rotate(t);
	var u2 = this.rotate(-t);
	var d1 = v.distanceTo(u1);
	var d2 = v.distanceTo(u2);
	var d3 = v.distanceTo(this);
	
	if (d3 < d1 && d3 < d2) {
	return this;
	}
	
	if(d1 < d2) return u1;
	else return u2;
	
}

Vector.prototype.rotateTowards2 = function(v, amount){
	var angle = this.angleTo(v);
	if(angle >  Math.PI) angle = angle - 2*Math.PI;
	if(angle < -Math.PI) angle = 2*Math.PI + angle;
	return this.rotate(angle*amount);
}

Vector.prototype.crossMag = function(v){
	return this.x*v.y - this.y*v.x;
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
Vector.prototype.distanceTo = function(v){
	return this.to(v).mag();
}

Vector.prototype.angle = function(){
	return Math.atan2(this.y, this.x);
}

Vector.prototype.angleTo = function(v){
	/*var difference = v.angle() - this.angle();
	difference = (difference + (Math.PI * 2)) % (Math.PI * 2);
	if (difference > Math.PI) {
		
	} else {
		
	}*/
	return v.angle() - this.angle();
}