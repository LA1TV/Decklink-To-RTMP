const config = require("./config.json");
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

var counter = 0;
// hold all running children
var processes = [];

process.on('exit', onExit);
process.on('SIGINT', onExit);

console.log("Starting...");

prepare(function() {

	for (var i=0; i<config.streams.length; i++) {
		startStream(config.streams[i]);
	}

	console.log("All streams started.");
});

function prepare(callback) {
	fs.mkdir(path.resolve(__dirname, "progress"), function() {
		clearFolder(path.resolve(__dirname, "progress"));
		callback();
	});
}

function startStream(streamConfig) {
	const inputNum = streamConfig.input;
	const formatMode = streamConfig.formatMode;
	const videoBitrate = streamConfig.videoBitrate;
	const audioBitrate = streamConfig.audioBitrate;
	const audioSampleRate = streamConfig.audioSampleRate;
	const frameRate = streamConfig.frameRate;
	const url = streamConfig.url;
	const progressFile = path.resolve(__dirname, "progress/"+(counter++)+"-"+inputNum+".progress");
	var killed = false;	

	console.log("Starting stream. Input "+inputNum+" => \""+url+"\".");
	const child = spawn('bash', [path.resolve(__dirname, "stream.sh")], {
		detached: true,
		env: {
			INPUT_NUMBER: inputNum+"",
			FORMAT_MODE: formatMode+"",
			VIDEO_BITRATE: videoBitrate+"",
			AUDIO_BITRATE: audioBitrate+"",
			AUDIO_SAMPLE_RATE: audioSampleRate+"",
			STREAM_URL: url,
			FRAME_RATE: frameRate+"",
			GOP_LENGTH: (frameRate*2)+"",
			PROGRESS_FILE: progressFile
		}
	});
	processes.push(child);

	// this checks to make sure the progress file exists and contains content,
	// if it does it means the stream is still running.
	// It then clears the contents of the file.
	// If the file is empty when we check then ffmpeg hasn't made any more progress
	// so assume something's gone wrong.
	const workingCheckTimerId = setInterval(function() {
		if (killed) {
			return;
		}	
		if (fileExists(progressFile)) {
			const data = fs.readFileSync(progressFile, 'utf8');
			if (data.length === 0) {
				console.error("It looks like the stream has failed. Terminating.");
				killed = true;		
				process.kill(-child.pid, "SIGKILL");
				onClosed();
			}
			else {
				fs.truncateSync(progressFile);
			}
		}
	}, 6000);

	child.stdout.on('data', function(data) {
		console.log(data.toString());
	});

	child.stderr.on('data', function(data) {
		console.error("ERROR: "+data.toString());
	});

	child.stderr.on('error', function(data) {
		console.error("Failed to start: "+data.toString());
	});

	child.on('close', function(code) {
		if (killed) {
			// onClosed() will already have been called
			return;
		}
		console.log("Stream terminated with code "+code+".");
		onClosed();
	});

	function onClosed() {
		processes.splice(processes.indexOf(child), 1);
		console.log("Restarting stream in 5.");		
		clearInterval(workingCheckTimerId);
		setTimeout(function() {
			console.log("Restarting...");
			startStream(streamConfig);
		}, 5000);
	}
}

function fileExists(file) {
	try {
		return fs.statSync(file).isFile();
	}
	catch(e) {
		return false;
	}
}

function clearFolder(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				clearFolder(curPath);
			}
			else { // delete file
				fs.unlinkSync(curPath);
			}
		});
	}
}

function onExit() {
	console.log("Terminating...");
	console.log("Killing child processes...");
	processes.forEach(function(child) {
		process.kill(-child.pid, "SIGKILL");
	});
	console.log("Done.");
	process.exit();
}
