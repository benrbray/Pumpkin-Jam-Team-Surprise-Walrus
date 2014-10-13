// PARTICLE.JS

// Particle constructor
// (r,g,b) is color, ranging 0-255
// lifetime is in frames (@ 60fps)
function Particle(x,y,radius, r,g,b, lifetime) {
	var theta = Math.random() * Math.PI * 2;
	var speed = Math.random() / 8 + 0.01;
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.vx = speed * Math.cos(theta);
	this.vy = speed * Math.sin(theta);
	this.r = r;
	this.g = g;
	this.b = b;
	this.lifetime = lifetime / (speed * 60);
	this.time = 0;
	Particle.particles.push(this);
}


Particle.particles = []; // All active particles

Particle.drawParticles = function() {
	for (var i = 0; i < Particle.particles.length; i++) {
		var p = Particle.particles[i];
		if (p.lifetime <= p.time) {
			Particle.particles.splice(i,1);
			i--;
			continue;
		}
		var alpha = Math.sqrt(Math.sin( p.time / p.lifetime * Math.PI ));
		context.fillStyle = htmlColor( p.r, p.g, p.b, alpha );
		context.beginPath();
		context.arc(p.x,p.y,p.radius,0,Math.PI*2);
		context.fill();
		p.x += p.vx;
		p.y += p.vy;
		p.time++;
	}
}