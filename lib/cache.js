var lru = require('lru-cache'),
	fs = require('fs'),
	size = require('./size'),
	stream = require('stream');

module.exports = function (cacheSize) {
	var _cache = lru({
		max: size(cacheSize) || size('100mb'),
		length: function (item) {
			return item.length;
		}
	});

	var cache = {
		/* Returns a stream if the file is not in cache yet, or the
	 	 * files contents if it has been cached already */
		get: function (key) {
			var result = _cache.get(key);
			
			//cache hit
			if(result) {
				if(typeof result === 'string') {
					return result;
				}
				else {
					var rs = result;
					var passthrough = new stream.PassThrough();
					passthrough.write(rs._buffer);
					result.pipe(passthrough);
					return passthrough;
				}
			}
			//cache miss, open file
			else {
				var rs = fs.createReadStream(key, {encoding: 'base64'});
				rs._buffer = "";

				rs.on('data', function (data) {
					rs._buffer += data.toString();
				});

				rs.on('end', function () {
					_cache.set(key, rs._buffer);
				});

				return rs;
			}
		},

		/* Removes an entry from the cache */
		invalidate: function (key) {
			_cache.remove(key);
		},

		/* Removes all entries from the cache */
		reset: function () {
			_cache.removeAll();
		},

		_cache: _cache
	};

	return cache;
};