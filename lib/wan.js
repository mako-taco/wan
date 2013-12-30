var fs = require('fs'),
	path = require('path'),
	mime = require('mime'),
	path = require('path'),
	util = require('util'),
	qs = require('querystring'),
	Writable = require('stream').Writable;

function Wan (opts) {
	this.cache = require('./cache')(opts.cacheSize || '100MB');
	this.options = opts;
	return this;
}
module.exports = Wan;

/* As the body comes in, we parse out file names from it and push them
 * in to a queue.  This queue is constantly being read from, transforming
 * the file names into the file's content. Depending on if the file has
 * been cached in memory already, the content is either written to the
 * response in its entirety as a string, or piped to the response.
 *
 * When the file is finished writing its content to res, the next file in
 * the queue is accessed. This process ends when [null] is queued instead
 * of a file name. */
Wan.prototype.handler = function (req, res, query, setStatus) {
	var self = this;
	var buffer = "";
	var queue = [];
	var index = 0;
	var opts = self.options;
	var streamIsPiping = false;
	if(req.method == "POST") {
		req.on('data', function (data) {
			buffer += data.toString();
			emptyBuffer(false);
		});

		req.on('error', function (err) {
			emptyBuffer(true);
		});

		req.on('end', function () {
			if(queue.length == 0) {
				self.respondNoImages(res, setStatus);
			}
			else {
				emptyBuffer(true);
			}
		});
	}
	else if(req.method == "GET") {
		for(i in query) {
			queue[i] = query[i];
		}

		if(queue.length == 0) {
			self.respondNoImages(res, setStatus);
		}

		queue.push(null);
		pipeStream();
	}
	else {
		setStatus(404);
		res.end("Sorry, wan does not handle " + req.method + " requests");
	}

	//empties out all completed file paths from the buffer
	//only used when handling POST
	function emptyBuffer (end) {
		var files = buffer.split('&');
		if(!end) {
			buffer = files.pop();
		}

		if(files.length) {
			queue = queue.concat(files);
		}

		if(end) {
			if(queue.length == 0) {
				self.respondNoImages(res, setStatus);
				return;
			}
			else {
				queue.push(null);
			}
		}

		if(streamIsPiping) {
			return;
		}
		else {
			streamIsPiping = true;
			pipeStream();
		}
	}

	//gets the next file from the queue and either writes its cached content,
	//or pipes its stream
	function pipeStream () {
		if(queue[index] === null) {
			res.end();
		}
		else {
			var asset = self.cache.get(path.join(opts.location, queue[index]));
			res.write(mime.lookup(queue[index]) + ';');
			
			if(!asset) {
				streamDone();
			}
			else if(typeof asset === 'string') {
				res.write(asset);
				streamDone();
			}
			else {
				var stream = asset;
				stream.on('error', function (err) {
					if(process.env.NODE_ENV != 'test') {
						console.warn(err.stack ? err.stack : err.toString())
					}
					streamDone();
				});

				stream.on('end', function () {
					streamDone();
				});

				stream.pipe(res, {end: false});
			}
		}
	};

	//Called after a queued file has finished processing to prepare the next file in line
	function streamDone () {
		res.write("\n");
		index++;

		if(queue[index] !== undefined) {
			pipeStream();
		}
		else {
			streamIsPiping = false;
		}
	};
};

/* Called when either the body (POST) or querystring (GET) is empty,
 * because we cannot do anything without a list of file paths to images. */
Wan.prototype.respondNoImages = function (stream, setStatus) {
	setStatus(400);
	stream.end("No images to load");
};
