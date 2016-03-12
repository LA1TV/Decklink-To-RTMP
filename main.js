const config = require("./config.json");
const spawn = require('child_process').spawn;
const path = require('path');

console.log("Starting...");

for (var i=0; i<config.streams.length; i++) {
	startStream(config.streams[i]);
}

console.log("All streams started.");

function startStream(streamConfig) {
	const inputNum = streamConfig.input;
	const formatMode = streamConfig.formatMode;
	const videoBitrate = streamConfig.videoBitrate;
	const audioBitrate = streamConfig.audioBitrate;
	const audioSampleRate = streamConfig.audioSampleRate;
	const frameRate = streamConfig.frameRate;
	const url = streamConfig.url;

	console.log("Starting stream. Input "+inputNum+" => \""+url+"\".");
	const handle = spawn('bash', [path.resolve(__dirname, "stream.sh")], {
		detached: false,
		env: {
			INPUT_NUMBER: inputNum+"",
			FORMAT_MODE: formatMode+"",
			VIDEO_BITRATE: videoBitrate+"",
			AUDIO_BITRATE: audioBitrate+"",
			AUDIO_SAMPLE_RATE: audioSampleRate+"",
			STREAM_URL: url,
			FRAME_RATE: frameRate+"",
			GOP_LENGTH: (frameRate*2)+""
		}
	});

	handle.stdout.on('data', function(data) {
		console.log(data.toString());
	});

	handle.stderr.on('data', function(data) {
		console.error(data.toString());
	});

	handle.stderr.on('error', function(data) {
		console.error("Failed to start: "+data.toString());
	});

	handle.on('close', function(code) {
		console.log("Stream terminated with code "+code+". Restarting in 5.");		
		setTimeout(function() {
			console.log("Restarting...");
			startStream(streamConfig);
		}, 5000);
	});
}
