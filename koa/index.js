var Wan = require('../lib/wan'),
	stream = require('stream'),
	assertions = require('../lib/assertions');

/* TODO:
1) allow for user defined cache control
*/

module.exports = function (opts) {
	assertions(opts);
	var wan = new Wan(opts);
	return function * middleware(next) {
		if(opts.route === this.path) {
			var passthrough = new stream.PassThrough();
			this.set('Connection', 'keep-alive');
			this.set('Transfer-Encoding', 'chunked');
			this.set('Content-type', 'text/html; charset=utf-8');
			
			if(opts.cacheControl) {
				this.set('Cache-control', opts.cacheControl);
			}
			
			this.set('X-Accel-Buffering', 'no');
			this.body = passthrough;

			wan.handler(this.req, passthrough, this.query, function (status) {
				this.status = status;
			}.bind(this));
		}
		else {
			yield next;
		}
	};
}