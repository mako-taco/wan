var fs = require('fs'),
	path = require('path'),
	mime = require('mime'),
	path = require('path'),
	Writable = require('stream').Writable;

module.exports = function (opts) {
	var cache = require('./cache')(opts.cacheSize || '100MB');

	return {
		handler: function (req, res, query, setStatus) {
			var files = query;
			if(files[0] === undefined) {
				setStatus(400);
				res.end("No images to load");
				return;
			}
			
			setStatus(200);
			res.write("");

			function pipeStream (i) {
				var asset = cache.get(path.join(opts.location, files[i]));
				res.write('data:' + mime.lookup(files[i]) + ';charset=utf-8;base64,');
				
				if(typeof asset === 'string') {
					res.write(asset);
					streamDone(++i);
				}
				else {
					var stream = asset;
					stream.on('error', function (err) {
						if(process.env.NODE_ENV != 'test') {
							console.error(err.stack ? err.stack : err.toString());
						}
						streamDone(++i);
					});

					stream.on('end', function () {
						streamDone(++i);
					});

					stream.pipe(res, {end: false});
				}
			};

			function streamDone (i) {
				res.write("\n");
				if(files[i]) {
					pipeStream(i);
				}
				else {
					res.end();
				}
			};

			pipeStream(0);
		},
		cache: cache
	}
}