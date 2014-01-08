var express = require('express');
var app = express();
var wan = require('../../express');

app.use(express.compress());
app.use(wan({
	route: '/wan', 
	location: 'public',
	cacheControl: 'public, max-age=60'
}));
app.use(express.static('public'));
app.use(express.static('../../client'));

app.listen(3000);