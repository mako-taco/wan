// http://xml/video/cnn/topvideos/archive.xml
//http://www.cnn.com/partners/android/video/video_feed_topvideos.xml
	function SimpleVideoModel(){
		var self=this;
		self.id=ko.observable();
		self.clickbackUrl=ko.observable('http://www.cnn.com/video/');
		self.description=ko.observable('');
		self.headline=ko.observable('');
		self.thumbnail=ko.observable("http://i2.cdn.turner.com/cnn/.element/img/3.0/1px.gif");
		self.trt=ko.observable(0);	
		self.formatTRT=ko.computed(function(){
			var seconds = "0" + self.trt() % 60;
			return (Math.floor(self.trt() / 60)) + ":" + (((seconds).length > 2) ? seconds.substring(1) : seconds);
		});

	}
	function videoFeedModel(feedName, feedUrl){
		var self=this;
		self.uniqueId=ko.observable(Math.round(Math.random()*1000000));
		self.feedName=ko.observable(feedName);
		self.feedUrl=ko.observable(feedUrl);
		self.videos=ko.observableArray([]);
		function getNodeValue(doc, nodeName){
			if(!doc)return null;
			var els=doc.getElementsByTagName(nodeName),el=(els && els.length>0)?els[0]:null,textNode=(el)?el.childNodes[0]:null;
			return (textNode)?textNode.nodeValue:null;
		}
		
		function parseVideoFeedXml(data){
			var doc=parseXML(data), promises=[];
			videoNodes=doc.firstChild.childNodes;
			for(var i=0,count=videoNodes.length;i<count;i++){
				var urlPrefix='http://www.cnn.com/video/?/video/',
					videoId=getNodeValue(videoNodes[i],'video_url').substring(urlPrefix.length);
				self.videos.push(new videoModel(videoId));
			}
		}
		function parseXML(data){
			log.trace(self.feedName(), "parseXML");
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
		function getXML(url, parser, callback){
			log.trace(self.feedName(), "getXML", url);
			/*var obj=JSON.parse(localStorage.getItem(url));
			if(obj && (((new Date()).getTime())-obj.timestamp)<300000){
				parser(obj.xml);
				if(callback)callback();
				return;
			}*/
			var req=(window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
			if (req != undefined) {
				req.onreadystatechange = function () {
					if (req.readyState == 4) {
						log.debug(self.feedName(), "getXML", url, req.status, req.statusText);
						try{
							if(req.status === 200){
								var xml=req.responseText.replace(/\>\s+\</mg, '><').replace(/\n/g,'').replace(/\<\!\-\-.+?\-\-\>/mg,'');
								parser(xml);
								/*obj={
									timestamp: ((new Date()).getTime()),
									xml:xml
								};
								localStorage.setItem(url, JSON.stringify(obj));*/
							}else{
								throw(req.statusText);
							}
						}catch(err){
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
		self.update=function(callback){
			log.trace(self.feedName(), "updating");
			//getXML(self.feedUrl(),parseVideoFeedXml, callback);
			
		}
		
		function onLoad(){log.info("updated "+self.feedName())};
		//update(onLoad);
		return self;
	}
