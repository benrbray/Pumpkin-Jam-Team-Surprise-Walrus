var Sounds = {};
var loaded_sounds = 0;

function getAudioData(url, obj, audioContext) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	request.onload = function() {
		loaded_sounds++;
		audioContext.decodeAudioData(request.response, function(data) {
				obj.data = data;
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
		this.source.connect(this.audioContext.destination);
		this.source.start(0);
	}

	this.pause = function() {
		this.source.stop(0);
	}
}

Sounds.musicMeadow = new Sounds.sound("assets/audio/wandering.mp3");
Sounds.blood = new Sounds.sound("assets/audio/blood2.mp3");

Sounds.musicMeadow.onload(function(){
	this.play(true);
});

Sounds.blood.play(false);
