var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var compress = require('koa-compress');
var wan = require('../../koa');

app.use(compress());
app.use(wan({
	route: '/wan', 
	location: 'public',
	cacheControl: 'public, max-age=60'
}));
app.use(serve('public', {maxage: 10000}));
app.use(serve('../../client'));
app.listen(3000);