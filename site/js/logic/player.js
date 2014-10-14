////////////////////////////////////////////////////////////////////////////////

function playerThink(player) {
	if (player.leapwait === undefined) {
		// Setup leaping attributes
		player.leapwait = 0;
		player.leapx = 0;
		player.leapy = 1;
		player.wolf = true;
		player.attacks = 0;
		player.attacktarget = null;
	}
	// Stand still by default
	player.wx = 0;
	player.wy = 0;

	// Player motion by keyboard
	if (Keyboard.LEFT)  {
		player.wx += -1;
	}
	if (Keyboard.RIGHT) {
		player.wx += 1;
	}
	if (Keyboard.UP)    {
		player.wy += -1;
	}
	if (Keyboard.DOWN)  {
		player.wy += 1;
	}

	// Player motion by mouse
	if (Mouse.down) {
		var dx = Mouse.worldx - player.x;
		var dy = Mouse.worldy - player.y;
		player.wx = dx;
		player.wy = dy;
	}

	var vm = magnitude(player.vx, player.vy);
	// Speed

	var drawmag = magnitude(player.drawx,player.drawy);
	if (Keyboard.SPACE && player.leapwait === 0 && drawmag > 0) {
		// Start leaping
		Stat.lunge++;
		player.leapwait = 55;
		player.leapx = player.drawx / drawmag;
		player.leapy = player.drawy / drawmag;
	}
	if (player.attacks > 0) {
		player.leapwait = 15;
		player.x = player.attacktarget.x;
		player.y = player.attacktarget.y;
		player.attacktarget.vx = 0;
		player.attacktarget.vy = 0;
		player.attacktarget.friction = 1;
		if (!Keyboard.SPACE) {
			player.unspaced = true;
		}
		if (Keyboard.SPACE && player.unspaced) {
			player.unspaced = false;
			Sounds.blood.play(false);
			player.attacks--;
			for (var count = 0; count < 10; count++) {
				new Particle(
					player.x,player.y,
					0.1 + Math.random() * 0.2,
					Math.random() * 150 + 50,0,0,
					30
				);
				// Blood effect
			}
			if (player.attacks == 0) {
				player.health = Math.min( 9, player.health + 1 );
				console.log(player.attacktarget);
				player.attacktarget.die();
			}
		}
	}

	if (player.leapwait > 45) {
		// Leaping through air
		player.maxSpeed = 0.11;
		player.vx = player.leapx * 0.3;
		player.vy = player.leapy * 0.3;
		for (var i = 0; i < GameObject.gameObjects.length; i++) {
			var obj = GameObject.gameObjects[i];
			if (obj.meat) {
				if (distance(obj.x,obj.y,player.x,player.y) < 0.6) {
					// Close enough to smack each other
					player.attacks = obj.hits;
					player.attacktarget = obj;
					obj.reload = 95;
					// They have 1 second before being able to attack you
					Light.remove(obj);
					break;
				}
			}
		}
	} else {
		// Not leaping.
		player.maxSpeed = 0.11;
	}
	player.leapwait = Math.max(0, player.leapwait - 1);
}
