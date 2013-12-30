function videoModel(videoId){
	var self=this,p=new Promise();
	/** helper properties **/
	//create a private jsmd per video
	self.jsmd=ko.observable();
	//element that the video object is to be bound to
	self.element=ko.observable();
	//a unique ID for the bound element
	self.wrapperId=ko.observable('cvp_'+Math.floor(Math.random()*10001));
	//generic copyright statement
	self.copyright=ko.observable(((new Date()).getYear()+1900)+' Cable News Network. All Rights Reserved.');
	//bind the video to a player instance
	self.player=ko.observable();
	//local function to play the video
	self.play=null;
	self.loaded=ko.observable(false);
	self.promise=ko.observable(p);
	self.interval=ko.observable(null);
	self.pollInterval=ko.observable(0);
	self.uniqueId=ko.observable(Math.round(Math.random()*1000000));
	/** imported content XML properties **/
	self.id=ko.observable(videoId);
	self.canSyndicate=ko.observable(false);
	self.category=ko.observable();
	self.clickbackUrl=ko.observable('http://www.cnn.com/video/?/video/'+this.id());
	self.dateCreated=ko.observable('');
	self.description=ko.observable('');
	self.headline=ko.observable('');
	self.headlineUrl=ko.observable('');
	self.isAdSensitive=ko.observable(true);
	self.isEmbeddable=ko.observable(false);
	self.isExpired=ko.observable(false);
	self.lastModified=ko.observable('');
	self.length=ko.observable('0');
	self.newsBug=ko.observable('');
	self.relatedVideosUrl=ko.observable('');
	self.sectionName=ko.observable('');
	self.slug=ko.observable('');
	self.sortOrderOverride=ko.observable('');
	self.source=ko.observable('cnn');
	self.sourceUrl=ko.observable('http://www.cnn.com');
	self.subcategory=ko.observable('');
	self.timestamp=ko.observable('');
	self.toggleFullscreenQuality=ko.observable(false);
	self.trt=ko.observable(0);

	self.imagesArray=ko.observableArray([{name:'fallback',url:"http://i2.cdn.turner.com/cnn/.element/img/3.0/1px.gif"}]);
	self.filesArray=ko.observableArray([]);
	//TODO nested objects
	self.slates=ko.observableArray([]);
	self.urls=ko.observableArray([]);
	//self.metas=ko.observable({site:'cnn',keywords:[],branding:[]});
	self.metas={};
	self.metas.site=ko.observable('cnn');
	self.metas.keywords=ko.observableArray([]);
	self.metas.branding=ko.observableArray([]);

	/** Live **/
	self.isStarted=ko.observable(true);
	self.status=ko.observable("On now");
	/** TVE **/
	self.time=ko.observable();
	//self.nowPlayingURL=ko.observable("/.element/ssi/sect/CNN/Programs/nowPlayingSchedule.json");
	self.nowPlayingURL=ko.observable("http://data.cnn.com/jsonp/video/nowPlayingSchedule.json");
	self.channelImage=ko.observable('http://i.cdn.turner.com/cnn/.element/img/3.0/sect/tv/cnn_logo_64x36.png');
	self.channel=ko.observable((this.id()==='cvptve/cvpstream2')?'HLN':'CNN');

	/** computed properties **/
	self.videoId=ko.computed(function(){return this.id()},self);
	self.isLive=ko.computed(function(){return this.videoId().substring(0,7)==='cvplive'}, self)
	self.isTVE=ko.computed(function(){return this.videoId().substring(0,6)==='cvptve'}, self);
	self.isVOD=ko.computed(function(){return !this.isLive() && !this.isTVE()}, self);
	self.streamIndex=ko.computed(function(){return (this.isLive()||this.isTVE())?this.videoId().substring(this.videoId().length-1):null;}, self);
	self.link=ko.computed(function(){
		var link= (this.channel()==='HLN')?"http://www.cnn.com/video/data/2.0/video/cvptve/cvpstream2.html":"http://www.cnn.com/video/data/2.0/video/cvptve/cvpstream1.html";
		try{
			 if(/\b(iPad|iPod|iPhone|Android|webOS|Windows Phone OS|Blackberry|SymbianOS|Kindle|Fire|Silk)\b/ig.exec(window.navigator.userAgent)) {
				link='/about/tv/';
			 }
		}catch(e){}		
		return link;
	}, self);
	self.title=ko.computed(function(){return this.headline()}, self);
	self.description126=ko.computed(function(){return this.description().length<126 ? this.description() : this.description().substring(0,126)}, self);
	self.description80=ko.computed(function(){return this.description().length<80 ? this.description() : this.description().substring(0,80)}, self);
	self.headline30=ko.computed(function(){return this.headline().length<30 ? this.headline() : this.headline().substring(0,30)}, self);
	self.program=ko.computed(function(){return this.headline()}, self);
	self.images=ko.computed({
		read: function(){
			var imagesObj={}, arr=this.imagesArray(),count=(arr)?arr.length:0;
			for(var i=0;i<count;i++){
				imagesObj[arr[i].name]=arr[i].url;
			}
			return imagesObj;
		},
		write: writeImage,
		owner:self
	});
	self.files=ko.computed({
		read:function(){var filesObj={}, arr=this.filesArray(),count=(arr)?arr.length:0;
			for(var i=0;i<count;i++){
				filesObj[arr[i].name]=arr[i].url;
			}
			return filesObj;
		},
		write:function(file){
			log.info("adding file",file);
			this.filesArray.remove(function(item){return item.name==='custom'});
			this.filesArray.unshift({name:"custom",url:file});
		},
		owner:self
	});
	self.thumbnail=ko.computed({
		read: function () {
			return this.images()['custom']||this.images()['188x106']||this.images()['300x169']||this.images()['120x68']||this.images()['fallback']||"http://i2.cdn.turner.com/cnn/.element/img/3.0/1px.gif"; 
		},
		write: writeImage,
		owner:self
	});
	self.carouselThumbnail=ko.computed(function(){return this.images()['120x68']||this.thumbnail()}, self);
	self.contentURL=ko.computed(function(){return "/video/data/3.0/video/"+this.videoId()+"/index.xml"}, self);
	self.canonicalURL=ko.computed(function(){return "/video/data/2.0/video/"+this.videoId()+".html"}, self);
	self.canonicalURLFooter=ko.computed(function(){return "/video/?/video/"+this.videoId()}, self);
	self.pipelineURL=ko.computed(function(){return "/CNNLiveFlash/StreamStatus/metadata/stream_dvr_"+this.streamIndex()+".xml"}, self);

	/** static functions **/
	var attributes=['id','timestamp'];
	var properties=['canSyndicate','category','clickbackUrl','dateCreated','description','headline','headlineUrl','isAdSensitive','isEmbeddable','isExpired','lastModified','length','newsBug','relatedVideosUrl','sectionName','slug','sortOrderOverride','source','sourceUrl','subcategory','toggleFullscreenQuality','trt'];
	var objects=['images','files','metas','slates','urls'];
	 	
	function afterInit(){
		try{
			self.promise().done(null, "loaded", new Date());
			log.info(self.videoId(), "loaded", new Date());
		}catch(err){
			alert(err);
		}
	}
	function afterUpdate(){
		try{
			self.promise().done(null, "updated", new Date());
			log.info(self.videoId(), "updated", new Date());
		}catch(err){
			alert(err);
		}
	}
	self.update = function(callback){
		log.info(self.videoId(), "updating");
		try{
			var cb=function(){
				parseContentXML.apply(self, arguments);
				if(self.isTVE()){
					var callbackName="parseNowPlayingJSON_nowplaying_1_0_2";//+self.uniqueId();
					window[callbackName]=parseNowPlayingJSON;
					/* CNNVIDEO-1663: cachebuster variable added to the url on the next line
					   Safari was not getting the latest data before this was in place
					   uses minutes past unix epoch in order to group user requests at our server's cache layer */
					var url=self.nowPlayingURL()+'?callback='+callbackName+'&cachebuster='+Math.floor((new Date()).getTime()/(1000*60)),id=createId(url);
					log.log(callbackName, url);
					var tag=createTag("SCRIPT", {
							defer:true,
							async:true,
							src:url,
							id:id
						}, function () {
							if (this.readyState && (this.readyState === "complete" || this.readyState === "loaded")) {
								callback();
								//(function(){log.log("now remove the tag");document.removeChild(tag);}());
							}
						}
					);
				}else if(self.isLive()){
					getXML(self.pipelineURL(),parsePipelineXML, callback);
				}else{
					callback.apply(self, arguments);
				}
			}
			getXML(self.contentURL(),cb);
		} catch (err){
			self.headline("There was an error loading this video");
			self.description(err);
			self.promise().done(err, self.headline());
		}
	}
	function parseNowPlayingJSON(data){
		log.info(self.videoId(), "parseNowPlayingJSON");
		var channelObj=null;
		if(self.channel() && self.channel()!==''){
			for(var i=0;i<data.channel.length;i++){
				if(self.channel()==data.channel[i].id){
					channelObj=data.channel[i];
				}
			}
		}
		if(!channelObj){
			channelObj=data.channel.shift();
		}
		self.channel(channelObj.id);
		self.headline(channelObj.program);
		self.description(channelObj.description);
		self.time(channelObj.time);
		self.thumbnail(channelObj.images['120x68']);
	}
	function parseContentXML(data){
		log.info(self.videoId(), "parseContentXML");
		var videoXml=parseXML(data),videoNode = videoXml.getElementsByTagName('video')[0];
		if(getNodeValue(videoNode,'isExpired') === 'true') {
			self.headline('Currently unavailable');
			return;
		}
		for(var p=0,pl=properties.length;p<pl;p++){
			var property=properties[p];
			self[property](getNodeValue(videoNode,property));
		}
		self.imagesArray(childrenToHash(videoNode, "images", "name"));
		self.filesArray(childrenToHash(videoNode, "files", "bitrate"));
		
		var metasNode=videoNode.getElementsByTagName('metas')[0];
		if(metasNode && typeof(metasNode)!=="undefined"){
			self.metas.site(metasNode.getAttribute('site'));
			for(var i=0,keywordNodes=metasNode.getElementsByTagName('keywords')[0],ns=keywordNodes.childNodes,c=ns.length;i<c;i++){
				self.metas.keywords().push(ns[i]);
			}
			for(var i=0,brandingNodes=metasNode.getElementsByTagName('branding')[0],ns=brandingNodes.childNodes,c=ns.length;i<c;i++){
				self.metas.branding().push(ns[i]);
			}
		}
	};
	function parsePipelineXML(data){
		log.info(self.videoId(), "parsePipelineXML");
		var videoXml=parseXML(data);
		var videoNode = videoXml.getElementsByTagName('stream')[0];
		self.isStarted(videoNode.getAttribute('isLive')==="true");
		self.status(videoNode.getAttribute('status')||"Stream Ended");
		self.imagesArray.unshift({name:'custom',url:'http://i2.cdn.turner.com/cnn/.element/img/1.3/CNNLiveFlash/keyframes/188x106/stream'+self.streamIndex()+'.jpg'});
	};
	/** helper functions **/
	function getData(url, parser, callback){ //throws exception
		log.info(self.videoId(), "getData", url);
		/*var obj=JSON.parse(localStorage.getItem(url));
		if(obj && (((new Date()).getTime())-obj.timestamp)<300000){
			log.debug("from cache", url, obj);
			parser(obj.data);
			if(callback)callback();
			return;
		}*/
		var req=(window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
		if (req != undefined) {
			req.onreadystatechange = function () {
				if (req.readyState == 4) {
					try{
						log.debug(self.videoId(), "getData", url, req.status, req.statusText);
						if(req.status == 200||req.status == 304){
							var callbackWrapper=parser;
							eval(req.responseText);
							obj={
								timestamp: ((new Date()).getTime()),
								data:req.responseText
							};
							//localStorage.setItem(url, JSON.stringify(obj));
						}else{
							throw(req.statusText);
						}
					}catch(err){
						//self.headline('An error occurred while retrieving video data');
						if("QUOTA_EXCEEDED_ERR: DOM Exception 22"===err){
							//localStorage.clear();
						}
						log.error(err);
						log.error("status="+req.statusText+"("+req.status+")");
						log.error("could not retrieve "+url+"\n"+req.status+":\t"+req.statusText);
					}finally{
						if(callback)callback();
					}
				}
			};
			req.open("GET", url, true);
			req.send("");
		}
		
	}
	function getXML(url, parser, callback){ //throws exception
		log.info(self.videoId(), "getXML", url);
		/*var obj=JSON.parse(localStorage.getItem(url));
		if(obj && (((new Date()).getTime())-obj.timestamp)<300000){
			parser(obj.data);
			if(callback)callback();
			return;
		}*/
		var req=(window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
		if (req != undefined) {
			req.onreadystatechange = function () {
				if (req.readyState == 4) {
					log.debug(self.videoId(), "getXML", url, req.status, req.statusText);
					try{
						if(req.status == 200){
							var xml=req.responseText.replace(/\>\s+\</mg, '><').replace(/\n/g,'').replace(/\<\!\-\-.+?\-\-\>/mg,'');
							parser(xml);
							obj={
								timestamp: ((new Date()).getTime()),
								data:xml
							};
							//localStorage.setItem(url, JSON.stringify(obj));
						}else{
							throw(req.statusText);
						}
					}catch(err){
						//self.headline('An error occurred while retrieving video data');
						if("QUOTA_EXCEEDED_ERR: DOM Exception 22"===err){
							//localStorage.clear();
						}
						log.error(err);
						log.error("status="+req.statusText+"("+req.status+")");
						log.error("could not retrieve "+url+"\n"+req.status+":\t"+req.statusText);
					}finally{
						if(callback)callback();
					}
				}
			};
			req.open("GET", url, true);
			req.send("");
		}
		
	}
	function parseXML(data){
		log.info(self.videoId(), "parseXML");
		if(window.DOMParser){
			var parser=new DOMParser();
			xmlDoc=parser.parseFromString(data,"text/xml");
		} else {
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(data);
		}
		return xmlDoc;
	}
	function getNodeValue(doc, nodeName){
		if(!doc)return null;
		var els=doc.getElementsByTagName(nodeName),el=(els && els.length>0)?els[0]:null,textNode=(el)?el.childNodes[0]:null;
		return (textNode)?textNode.nodeValue:null;
	}
	function writeImage(image){
		this.imagesArray.remove(function(item){return item.name==='custom'});
		this.imagesArray.unshift({name:"custom",url:image});
	}
	function childrenToHash(doc, nodeName, nameAttribute){
		if(!doc)return null;
		var parentObj=[],parentNode=doc.getElementsByTagName(nodeName)[0];
		if(parentNode && parentNode.hasChildNodes()){
			var childNodes=parentNode.childNodes;
			for(var i=0,nodeCount=childNodes.length;i<nodeCount;i++){
				var obj=childNodes[i],name=obj.getAttribute(nameAttribute),value=obj.childNodes[0].nodeValue,newObj={name:name,url:value};
				newObj.width=obj.getAttribute('width');
				newObj.height=obj.getAttribute('height');
				parentObj.push(newObj);
			}
		}
		return parentObj;
	}
	/** initialize */
	/*(function(){
		update(afterInit);
	})();*/
	
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
function createId(url) {
	var id = url,
		liSlash = url.lastIndexOf('/') + 1,
		liDot = url.lastIndexOf('.');
	id = url.substring(liSlash, liDot).replace(/\W/, '_');
	return id;
}
function getType(url) {
	return (/\.([^\.]+)$/.exec(url)[1].toLowerCase());
}