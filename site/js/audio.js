var Sounds = {};
var loaded_sounds = 0;

// Get audio data from remote server
function getAudioData(url, obj, audioContext) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	request.onload = function() {
		loaded_sounds++;
		audioContext.decodeAudioData(request.response, function(data) {
				obj.data = data;

				// Alert the audio object that the sound is loaded
				obj.audioLoaded();
			},
			function() {
				obj.err = true;
				console.log("Error decoding file '" + url + "'" );
			});
	}
	request.send();
}

Sounds.sound = function(url){
	this.audio = new Audio(url);

	this.play = function(loop){
		this.audio.loop = loop
		this.audio.play()
	}

	this.setVolume = function(volume) {
		this.audio.volume = volume;
	}
}

Sounds.audio = function(url){
	this.url = url;
	this.data = null;
	this.audioContext = new AudioContext();
	this.err = false;

	// Volume Controller
	this.gain = this.audioContext.createGain();
	this.gain.connect(this.audioContext.destination);
	this.loadCallback = null;

	getAudioData(this.url, this, this.audioContext);

	this.audioLoaded = function(){
		if (this.loadCallback !== null) this.loadCallback();
	}

	this.onload = function(callback){
		if (!this.err && this.data !== null) callback();
		else this.loadCallback = callback;
	}

	this.play = function(loop){
		if (this.err || this.data === null) return;
		this.source = this.audioContext.createBufferSource();
		this.source.buffer = this.data;
		this.source.loop = loop;
		this.source.connect(this.gain);
		this.source.start(0);
	}

	this.stop = function() {
		this.source.stop(0);
	}

	/**
	 * Sounds.setVolume - Change volume of a sound
	 *
	 * @param decimal volume - the volume as a number between 0 and 1.
	 */
	this.setVolume = function(volume) {
		this.gain.gain.value = volume;
	}
}

if (typeof(MENUSCREEN) !== "undefined")
{
	Sounds.menuscreen = new Sounds.audio("assets/audio/title.mp3");

	Sounds.menuscreen.onload(function(){
		this.setVolume(.6);
		this.play(true);
	});
} else {
	Sounds.musicMeadow = new Sounds.audio("assets/audio/wandering.mp3");
	Sounds.musicAction = new Sounds.audio("assets/audio/action.mp3");
	Sounds.blood = new Sounds.sound("assets/audio/blood.mp3");
	Sounds.hoot = new Sounds.sound("assets/audio/owl_hoot.mp3");
	Sounds.bark = new Sounds.sound("assets/audio/angry_bark.mp3");
	Sounds.gun = new Sounds.sound("assets/audio/gun.mp3");
	Sounds.brains = new Sounds.sound("assets/audio/brains.mp3");

	Sounds.lose = new Sounds.sound("assets/audio/lose.mp3");
	Sounds.win = new Sounds.audio("assets/audio/win.mp3");

	Sounds.gun.setVolume(.6);

	Sounds.musicMeadow.onload(function(){
		this.setVolume(0);
		this.play(true);
	});
	Sounds.musicAction.onload(function(){
		this.setVolume(0);
		this.play(true);
	});
}
