var Wan = require('../lib/wan'),
	assertions = require('../lib/assertions');

module.exports = function (opts) {
	assertions(opts);
	var wan = Wan(opts);

	return function (req, res, next) {
		if(opts.route === req.path) {
			wan.handler(req, res, req.query)
		}
		else {
			next();
		}
	};
}
