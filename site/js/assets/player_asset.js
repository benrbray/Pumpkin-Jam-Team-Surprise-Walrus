/* PLAYER_ASSET.JS
 * 
 */

"use strict"

////////////////////////////////////////////////////////////////////////////////

// Player
GameAsset.player = new GameAsset(0.8, 0.8, true, function(x,y,asset,player) {
	context.save();
	// Precomputations ---------------------------------------------------------
	
	// Time-Oscillating tail wag amplitude, increases with proximity to meat
	var meatDist = meatProximity(player.x, player.y) + 1
	var tailWag = Math.sin(World.tick/meatDist/12)/3;
	
	// Player speed
	var playerSpeed =  magnitude(player.vx, player.vy);
	var legAmplitude = Math.min(0.16, 2 * ( 2/(1+Math.exp(-playerSpeed)) - 1));
	var legPhase = World.tick / 3;
	
	// Entering Player Coordinates ---------------------------------------------
	
	// Move origin to player center
	context.translate(x,y);
	asset.vel.x = player.vx;
	asset.vel.y = player.vy;
	
	// Draw Feet ---------------------------------------------------------------
	
	// Store body segments
	var frontBody = asset.segments[1];
	var backBody = asset.segments[2];
	
	// Center origin on front body segment
	context.save();
		context.translate(frontBody.pos.x, frontBody.pos.y);
		context.rotate(frontBody.dir.angle());
		// Front Right
		var fl_off = Math.sin( legPhase ) * legAmplitude;
		context.drawImage(asset.frontRightImg, -0.35+fl_off, 0.15, 0.4, 0.25);
		// Front Left
		var fr_off = Math.sin( legPhase + Math.PI ) * legAmplitude;
		context.drawImage(asset.frontLeftImg, -0.35+fr_off, -0.12, 0.4, -0.25);
	context.restore();
	
	// Center origin on back body segment
	context.save();
		context.translate(backBody.pos.x, backBody.pos.y);
		context.rotate(backBody.dir.angle());
		// Back Right
		var bl_off = Math.sin( legPhase + Math.PI / 2) * legAmplitude;
		context.drawImage(asset.backRightImg, -0.35+bl_off, 0.15, 0.4, 0.25);
		// Back Left
		var br_off = Math.sin( legPhase + 3 * Math.PI / 2 ) * legAmplitude;
		context.drawImage(asset.backLeftImg, -0.35+br_off, -0.12, 0.4, -0.25);
	context.restore();
	
	// Move Trailing Segments --------------------------------------------------
	
	// Draw and position remaining segments
	for(var i = 1; i < asset.segments.length; i++){
		var follow = asset.segments[i-1];	// segment to follow
		var segment = asset.segments[i];	// current segment to control
		
		// Move towards back end of 'follow'
		var goalPos = follow.pos.subtract(follow.dir.norm().multiply(follow.size+follow.offset));
		segment.pos = segment.pos.add( 
			segment.pos.to( goalPos )
		);
		
		// Rotate in direction of 'follow'
		segment.dir = segment.dir.rotateTowards2(follow.dir, segment.spring);
		
		// Draw
		context.save();
			context.translate(segment.pos.x, segment.pos.y);
			context.rotate(segment.dir.angle()+(i==3?tailWag:0));
			if(segment.img){
				context.drawImage(
					 segment.img,		// image
					-segment.size,		// top-left x
					-segment.width/2, 	// top-left y
					 segment.size,		// length
					 segment.width		// thickness
				);
			}
		context.restore();
	}
	
	// Move Head (needs to draw on top) ----------------------------------------
	
	// First Segment
	var headSegment = asset.segments[0];
	
	// If player is moving, rotate head in direction of velocity
	if(asset.vel.mag() > 0.03){
		headSegment.dir = headSegment.dir.rotateTowards2(asset.vel, 1/10);
		player.drawx = headSegment.dir.x;
		player.drawy = headSegment.dir.y;
	}
	
	// Draw first segment
	context.save();
	context.fillStyle = "rgba(0,0,0,0.5)";
	context.rotate( headSegment.dir.angle(), 1/5 );
	context.drawImage(
		headSegment.img,
		-headSegment.size,
		-headSegment.width/2,
		headSegment.size,
		headSegment.width
	);
	context.restore();
	
	// Exiting Player Coordinates ----------------------------------------------
	context.restore();
});

//// Player Setup --------------------------------------------------------------

// Create HTML Img elements
GameAsset.player.headImg = new Image();
GameAsset.player.headImg.src = "assets/graphics/wolf/wolf-head.png";
GameAsset.player.frontImg = new Image();
GameAsset.player.frontImg.src = "assets/graphics/wolf/wolf-front.png";
GameAsset.player.behindImg = new Image();
GameAsset.player.behindImg.src = "assets/graphics/wolf/wolf-behind.png";
GameAsset.player.tailImg = new Image();
GameAsset.player.tailImg.src = "assets/graphics/wolf/wolf-tail.png";
GameAsset.player.frontLeftImg = new Image();
GameAsset.player.frontLeftImg.src = "assets/graphics/wolf/wolf_fl_leg.png";
GameAsset.player.frontRightImg = new Image();
GameAsset.player.frontRightImg.src = "assets/graphics/wolf/wolf_fr_leg.png";
GameAsset.player.backLeftImg = new Image();
GameAsset.player.backLeftImg.src = "assets/graphics/wolf/wolf_bl_leg.png";
GameAsset.player.backRightImg = new Image();
GameAsset.player.backRightImg.src = "assets/graphics/wolf/wolf_br_leg.png";

// Things
var segmentImages = [GameAsset.player.headImg, 
				 GameAsset.player.frontImg,
				 GameAsset.player.behindImg,
				 GameAsset.player.tailImg];
var segmentSizes = [0.6,0.6,0.6,0.8];
var segmentWidths =[0.6,0.5,0.6,0.2];
var segmentOffsets=[-0.1,-0.15,-0.1,0];
var segmentSpring =[1,1/5,1/10,1/10];

// Segments
GameAsset.player.segments = [];
var numSegments = 4;
var positionSum = 0;
var offsetSum = 0;
for(var i=0; i < numSegments; i++){
	GameAsset.player.segments.push({
		pos: new Vector(positionSum, 0),// position (tiles)
		dir: new Vector(1,0).norm(),	// vector in direction of segment
		size: segmentSizes[i],
		offset: segmentOffsets[i],
		width: segmentWidths[i],
		img: segmentImages[i],
		spring: segmentSpring[i]
	});
	// accumulate sizes
	positionSum += segmentSizes[i] + segmentOffsets[i];
}
GameAsset.player.vel = new Vector(0,0);

////////////////////////////////////////////////////////////////////////////////

/*GameAsset.player = new GameAsset(0.8, 0.8, true, function(x,y,asset,obj) {
	// Save coordinate transforms to leave untouched by this function
	context.save();
	
	// Move context origin to player's center
	context.translate(x,y);
	
	// If the player is moving at least a little...
	if (magnitude(obj.vx, obj.vy) > 0.03) {
		// turning in the direction they're moving
		obj.drawx = obj.drawx * 0.9 + 0.1 * obj.vx;
		obj.drawy = obj.drawy * 0.9 + 0.1 * obj.vy;
	}
	
	// We're centered on the player's center so rotate in the right direction
	context.rotate( Math.atan2(  obj.drawy, obj.drawx ) + Math.PI / 2 );
	
	// Move up a little to center on neck
	context.translate(0, 0.44);
	
	// If we're currently leaping...
	if (obj.leapwait > 45) {
		// Motion blur
		for (var i = 0; i < 1.2; i += 0.4) {
			context.globalAlpha = (1 - i);
			context.drawImage(asset.img,-.25,-.75 + i, 0.5, 1.5);
		}
		context.globalAlpha = 1;
	}
	
	// Draw the wolf
	context.drawImage(asset.img,-.25,-.75, 0.5, 1.5);
	
	// Put the context like it was before
	context.restore();
});*/