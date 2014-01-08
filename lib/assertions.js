var fs = require('fs'),
	path = require('path'),
	assert = require('assert');

module.exports = function (opts) {
	assert.notStrictEqual(opts, undefined, "Wan missing required paramater [options]");
	assert.notStrictEqual(opts.route, undefined, "Wan missing required option [route]");
	assert.notStrictEqual(opts.location, undefined, "Wan missing required option [location]");
	assert.doesNotThrow(function () {
		stats = fs.statSync(path.join(process.cwd(), opts.location))
	}, "Cannot access location '" + path.join(process.cwd(), opts.location) + "'");
	assert.ok(stats.isDirectory(), "Option [location] must be a directory");
}