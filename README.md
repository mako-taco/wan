#Wan for Node.js
The goal of Wan is to reduce http overhead by cutting requests to static resources,
without requiring you to make any significant changes to your current sites. Wan will radically affect
your site's request footprint. Click to see a [video side-by-side comparisson](http://www.youtube.com/watch?v=yZwwAi0MHzE&feature=youtu.be) of a website with and without `wan`.

[![99 Requests, 1.5MB, load: 17.45s](https://s3.amazonaws.com/wan.js/youtube.png "without Wan")](http://www.youtube.com/watch?v=yZwwAi0MHzE&feature=youtu.be)

####Before & After:
![99 Requests, 1.5MB, load: 17.45s](https://s3.amazonaws.com/wan.js/before.png "without Wan")

![62 Requests, 1.4MB, load: 14.47s](https://s3.amazonaws.com/wan.js/after.png "with Wan")

Currently, the only feature implemented is *data URI spriting*, which lets you stream all of your 
site's static images to a client in a single HTTP request, without having to maintain
a sprite-sheet.

Wan is a two part library, containing a single file for the client, and a node module for the
server, available currently as a piece of Koa middleware.

##Installing
Wan is available for node.js via npm
```
npm install wan
```

##Creating Wan on the client
```javascript
var wan = new Wan(options)
```
Where options may contain any of the following:
 - `memCache` (default `true`): Enables caching requests in memory on the client side
 - `diskCache` (default `true`): Enables persistent caching in Local Storage
 - `cachePrefix` (default `"wan-cache-"`): Prefixes all keys stored in Local Storage
 - `expirationKey` (default `"wan-expires"`): Local Storage key which contains cache expiration info
 - `route` (default `"/wan"`): The route which is `GET` requested from your server for Wan

###Data URI Spriting (client)
Allows you to get all images on a page with a single xmlHttpRequest, by calling `wan.getImages()`.
Every `img` tag in the DOM when `getImages` is called that has a `data-src` attribute will be
added to the request, and have its `src` set to a data URI as soon as it has been send to the client.
The response is chunked and evaluated on every progress update in order to display images as soon as
possible, without needing to wait for the response to finish.
```html
<img data-src="o.png" width="20" height="100">
<img data-src="m.png" width="20" height="100">
<img src="f.png" width="20" height="100">
<img data-src="g.png" width="20" height="100">

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
from the server. A response with a `Cache-Control: max-age` or `Expires` header will store a special value
in local storage that will serve to invalidate the Local Storage cache appropriately.

####Controlling the loading order
You can control the order that your images load by adding the `priority` attribute to your `img` tags.
Priorities should be integers.  Images with lower priorities load before images with higher priorities.
Images without priorities are loaded after images with priorities. If image priorities are equal, then
their order in the DOM is compared, loading images that appear higher in the DOM first.

```html
<!-- Loads second-->
<img data-src="o.png" width="20" height="100" priority="3">

<!-- Loads last (no priority given) -->
<img data-src="m.png" width="20" height="100">

<!-- Loads third -->
<img data-src="f.png" width="20" height="100" priority="3">

<!-- Loads first -->
<img data-src="g.png" width="20" height="100" priority="1">
```

##Creating Wan on the server
Requiring `'wan/koa'` will give you middleware that you can use with Koa.  Requiring `'wan/express` will give you express middleware. 
```javascript
var wan = require('wan/koa');
app.use(wan(options));
```
Where options contains the following:
 - cacheSize (default `"100MB"`): Limits the size of the image cache in RAM
 - location (required): The path on disk where images served by wan are stored

##How it works
Wan employs data URIs, local cache, and the idea behind CSS spriting to reduce the number of requests a page needs to make to get images. When `getImages` is called, a request is made to your server that contains the paths of all the images on the page with a `data-src` attribute. This is sent as a query string (if the URL is under 2000 characters), or the body of a POST request.

On the server, the file paths are parsed out. Files are openned (or retrieved from the server's cache) and streamed one by one, base64 encoded, into the server response. 

On the client, the response is parsed as it streams in, setting the `src` attribute of each image requested as soon as the data has come through.  The result is a single, streamed process, which prevents any unecessary waiting for entire processess to finish before the next begins.
