#Wan
The goal of Wan is to reduce http overhead by cutting requests to static resources,
without requiring you to make any significant changes to your current sites. Currently,
the only feature implemented is *data URI spriting*, which lets you stream all of your 
site's static images to a client in a single HTTP request, without having to maintain
a sprite-sheet.

Wan is a two part library, containing a single file for the client, and a node module for the
server, available currently as a piece of Koa middleware.

##Creating Wan on the client
```
var wan = new Wan(options)
```
Where options may contain any of the following:
 - `memCache` (default `true`): Enables caching requests in memory on the client side
 - `diskCache` (default `true`): Enables persistent caching in Local Storage
 - `cachePrefix` (default `"wan-cache-"): Prefixes all keys stored in Local Storage
 - `route` (default `"/wan"`): The route which is `GET` requested from your server for Wan

###Data URI Spriting (client)
Allows you to get all images on a page with a single xmlHttpRequest, by calling `wan.getImages()`.
Every `img` tag in the DOM when `getImages` is called that has a `data-src` attribute will be
added to the request, and have its `src` set to a data URI as soon as it has been send to the client.
The response is chunked and evaluated on every progress update in order to display images as soon as
possible, without needing to wait for the response to finish.
```
<img data-src="o.png" width="20" height="100"></img>
<img data-src="m.png" width="20" height="100"></img>
<img src="f.png" width="20" height="100"></img>
<img data-src="g.png" width="20" height="100"></img>

<script src="wan-client.js"></script>
<script>
	var wan = new Wan({
		memCache: true,
		diskCache: false
	});
	wan.getImages();
</script>
```
The example above will make a single request to your server, pulling `o.png`, `m.png`, and `g.png`.
Notice that `f.png` is unaffected because it does not have a `data-src` attribute. Once an image has
been loaded with Wan, it loses its `data-src` attribute for a `src` attribute.

If `diskCache` is enabled, then the client will check Local Storage for the file before requestng it
from the server;

##Creating Wan on the server
Requiring `'wan'` gives you a function which generates middleware for Koa. The function takes two
parameters: `route` and `location`. The first, `route`, specifies where the client should post to,
and the second, `location` specifies the folder (relative to the CWD) where the assets are located.
```
require('wan');

app.use(wan('/wan', 'public'));

```