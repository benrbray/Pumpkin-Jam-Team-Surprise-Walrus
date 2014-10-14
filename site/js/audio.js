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

Sounds.musicMeadow = new Sounds.sound("assets/audio/wandering.mp3");
Sounds.musicAction = new Sounds.sound("assets/audio/action.mp3");
Sounds.blood = new Sounds.sound("assets/audio/blood.mp3");

Sounds.musicMeadow.onload(function(){
	this.play(true);
	this.setVolume(0);
});
Sounds.musicAction.onload(function(){
	this.play(true);
	this.setVolume(0);
});