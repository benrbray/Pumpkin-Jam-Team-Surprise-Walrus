////////////////////////////////////////////////////////////////////////////////

function playerThink(player) {
	if (player.leapwait === undefined) {
		player.leapwait = 0;
		player.leapx = 0;
		player.leapy = 1;
	}
	player.wx = 0;
	player.wy = 0;
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

	if (Mouse.down) {
		var dx = Mouse.worldx - player.x;
		var dy = Mouse.worldy - player.y;
		player.wx = dx;
		player.wy = dy;
	}

	var vm = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
	if (Keyboard.SPACE && player.leapwait === 0 && vm > 0.05) {
		player.leapwait = 60;
		player.leapx = player.vx / vm;
		player.leapy = player.vy / vm;
	}
	if (player.leapwait > 50) {
		player.maxSpeed = 0.11;
		player.vx = player.leapx * 0.4;
		player.vy = player.leapy * 0.4;
	} else {
		player.maxSpeed = 0.11;
	}
	player.leapwait = Math.max(0, player.leapwait - 1);
}