var Wan = require('../lib/wan'),
	assertions = require('../lib/assertions');

module.exports = function (opts) {
	assertions(opts);
	var wan = Wan(opts);

	return function (req, res, next) {
		if(opts.route === req.path) {
			res.setHeader('Connection', 'keep-alive');
			res.setHeader('Transfer-Encoding', 'chunked');
			res.setHeader('Content-type', 'text/html; charset=utf-8');
			res.setHeader('Cache-control', 'public, max-age=6000');
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
