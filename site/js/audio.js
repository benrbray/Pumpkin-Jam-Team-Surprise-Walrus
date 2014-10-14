var Sounds = {};
function getAudioData(url, callback, audioContext) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	request.onload = function() {
		audioContext.decodeAudioData(request.response, function(data) {
				callback(data, undefined);
			},
			function() {
				console.log("Error decoding file '" + url + "'" );
			});
	}
	request.send();
}

Sounds.sound = function(url){
	this.url = url;
	this.buffer = null;
	this.audioContext = new AudioContext();

	this.play = function(loop){
		var obj = this;
		getAudioData(this.url, function(data) {
			obj.source = obj.audioContext.createBufferSource();
			obj.source.buffer = data;
			obj.source.loop = loop;
			obj.source.connect(obj.audioContext.destination);
			obj.source.start(0);
		}, this.audioContext);
	}

	this.pause = function() {
		this.source.stop(0);
	}
}

Sounds.musicMeadow = new Sounds.sound("/assets/audio/wandering.mp3");
Sounds.musicMeadow.play(true);
