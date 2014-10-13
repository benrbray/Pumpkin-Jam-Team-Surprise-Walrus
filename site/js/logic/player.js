////////////////////////////////////////////////////////////////////////////////

function playerThink(player) {
	player.wx = 0;
	player.wy = 0;
	if (Keyboard.LEFT)  {
		player.wx = -1;
	}
	if (Keyboard.RIGHT) {
		player.wx = 1;
	}
	if (Keyboard.UP)    {
		player.wy = -1;
	}
	if (Keyboard.DOWN)  {
		player.wy = 1;
	}
}