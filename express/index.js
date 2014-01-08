var Wan = require('../lib/wan'),
	assertions = require('../lib/assertions');

module.exports = function (opts) {
	assertions(opts);
	var wan = new Wan(opts);

	return function (req, res, next) {
		if(opts.route === req.path) {
			res.setHeader('Transfer-Encoding', 'chunked');
			res.setHeader('Content-type', 'text/html; charset=utf-8');
			
			if(opts.cacheControl) {
				res.setHeader('Cache-control', opts.cacheControl);
			}

			res.setHeader('X-Accel-Buffering', 'no');
			wan.handler(req, res, req.query, function (status) {
				res.statusCode = status;
			});
		}
		else {
			next();
		}
	};
}
