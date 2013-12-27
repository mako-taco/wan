function Wan (opts) {
	var opts = opts || {};

	Wan.options = {
		cachePrefix: "wan-cache-",
		diskCache: true,
		memCache: true,
		route: "/wan"
	};

	Wan.memCache = {};

	for(i in Wan.options) {
		if(opts[i] !== undefined) {
			Wan.options[i] = opts[i];
		}
	}

	if(Wan.options.diskCache && !window.localStorage) {
		Wan.options.diskCache = false;
		console.warn("Local storage not supported -- setting diskCache to false")
	}

	return Wan;
}

Wan.getImages = function () {
	var imgs = document.getElementsByTagName('img')
	,	diskCache = Wan.options.diskCache
	,	memCache = Wan.options.memCache
	,	parserIndex = 0		//how far into the responseText we have parsed
	,	imagesDone = 0		//number of completed image loads
	, 	query = []			//builds the querystring
	,	img
	,	xhr
	,	src
	,	priority
	,	imgMap = {}				//maps data-srcs to an array of img elements, and their highest priority
	, 	uniqueImgs = 0;			//number of items in imgMap

	for (var i=0, l=imgs.length; i<l; i++) {
		img = imgs[i];
		src = img.getAttribute('data-src');
		priority = ~~img.getAttribute('priority');

		if(src) {
			//Check mem cache
			if(memCache) {
				var cacheHit = Wan.memCache[src];
				if(cacheHit) {
					img.src = cacheHit;
					continue;
				}
			}

			//Check local storage cache
			if(diskCache) {
				var cacheHit = localStorage.getItem(Wan.getCacheKey(img))
				if(cacheHit) {
					img.src = cacheHit;
					if(Wan.options.memCache) {
						Wan.memCache[src] = cacheHit;
					}
					continue;
				}
			}

			//Add src path to imgMap to grab from server if not cached
			var desc = imgMap[src];
			if(!desc) {
				imgMap[src] = desc = [];
				desc.priority = Infinity;
				desc.order = i;
				desc.src = src;
				uniqueImgs++;
			}
			desc[desc.length] = img;

			if(priority && (priority < desc.priority)) {
				desc.priority = priority;
			}
		}
	};

	if(uniqueImgs) {
		var imgArray = [];
		var j=0;
		for(src in imgMap) {
			imgArray[j++] = imgMap[src]
		};

		imgArray.sort(function (a, b) {
			if(a.priority === b.priority) {
				return a.order - b.order;	//keeps the sort stable
			}
			else return a.priority-b.priority;
		});

		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 3) {
				var relevant = xhr.responseText.substring(parserIndex)
				,	parts = relevant.split('\n')
				,	part;

				if(parts.length > 1) {
					for(var i=0, l=parts.length-1; i<l; i++) {
						
						part = parts[i]
						var imgList = imgArray[imagesDone++];
						for(var j=0, ll=imgList.length; j<ll; j++) {
							imgList[j].src = part;
						}

						if(memCache) {
							Wan.memCache[Wan.getCacheKey(img)] = part;
						}

						if(diskCache) {
							localStorage.setItem(Wan.getCacheKey(img), part);
						}

						img.removeAttribute('data-src');
						parserIndex += parts[i].length + 1; //account for newline which was consumed in split
					}
				}
			}
		}.bind(Wan);

		//Loaded in reverse-reverse order
		query = [];
		for (var i=0, l=imgArray.length; i<l; i++) {
			query[query.length] = i + "=" + encodeURI(imgArray[i].src);
		};
		
		if(query.length > 0) {
			xhr.open("GET", Wan.options.route + "?" + query.join('&'));
			xhr.setRequestHeader('Cache-Control','max-age=86400');
			xhr.send();
		}
	}
}

Wan.getCacheKey = function (img) {
	return Wan.options.cachePrefix + img.getAttribute('data-src');
}