var type="videofeed", version="1.0.1", widgetURI=baseURI+'/'+type+'/'+version, dependencies=[];
/* check for dependencies. make a list of what we don't already have */
("JSON" in window)			||dependencies.push('http://z.cdn.turner.com/cnn/.e/js/libs/json2.min.js');
("ko" in window)			||dependencies.push("http://z.cdn.turner.com/cnn/.e/js/libs/knockout-2.1.0.js"); //Knockout JS
//("videoModel" in window)	||dependencies.push(baseURI+'/BaseVideoModel/1.0.1/BaseVideoModel.js');
("videoFeedModel" in window)||dependencies.push(widgetURI+'/model.js');
var elInit=function(el){
	var feedName=el.getAttribute("feed_name"),
		feedURL=el.getAttribute("feed_url"),
		model=new videoFeedModel(feedName, feedURL);
	var callbackName="parseNowPlayingJSON_"+model.uniqueId();
			window[callbackName]=function (data){
				for(var i=0,l=data.length;i<l;i++){
					var video=new SimpleVideoModel();
					video.id(data[i].id);
					video.headline(data[i].headline);
					video.description(data[i].description);
					video.clickbackUrl(data[i].url);
					video.trt(data[i].trt);
					video.thumbnail(data[i].thumbnail);
					model.videos().push(video);
				}
				ko.applyBindings(model,el);
			};
			var url=model.feedUrl()+'?callback='+callbackName,
				id=createId(url),
				tag=createTag("SCRIPT", {
					defer:true,
					async:true,
					src:url,
					id:id
					}, function () {
						if (this.readyState && (this.readyState === "complete" || this.readyState === "loaded")) {
							callback();
							(function(){document.removeChild(tag);}());
						}
					}
				);
}
loadWidget(type, version, dependencies, elInit);
function createId(url) {
	var id = url,
		liSlash = url.lastIndexOf('/') + 1,
		liDot = url.lastIndexOf('.');
	id = url.substring(liSlash, liDot).replace(/\W/, '_');
	return id;
}
function createTag(d, c, e) {
	var b = document.createElement(d);
	Object.keys(c).forEach(function (f) {
		b[f] = c[f];
	});
	b.onload = b.onreadystatechange = e;
	document.getElementsByTagName('body')[0].appendChild(b);
	return b;
}
