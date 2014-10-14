// MUSIC.JS
// Manages sound playback and volume

function updateMusic() {
	var mindist = 14;

	for (var i = 0; i < GameObject.gameObjects.length; i++) {
		var g = GameObject.gameObjects[i];
		if (g.human) {
			mindist = Math.min(
				mindist,
				distance(g.x,g.y,World.player.x,World.player.y)
			);
		}
	}
	if (mindist < 7) {
		// Apply action
		updateMusic.action += 1/180;
	} else {
		updateMusic.action -= 1/180;
	}
	updateMusic.action = Math.max(0,Math.min(updateMusic.action,1));
	Sounds.musicMeadow.setVolume( 1-updateMusic.action );
	Sounds.musicAction.setVolume( updateMusic.action );
}
updateMusic.action = 0;