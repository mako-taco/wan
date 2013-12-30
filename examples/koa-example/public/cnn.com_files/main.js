(function(){
	var type="nowplaying",
		version="1.0.2",
		widgetURI=baseURI+'/'+type+'/'+version,
		elements=document.querySelectorAll(".cnn_widget[type='"+type+"'][version='"+version+"']"),
		templateNames='',//((elements && elements.length>0)?elements[0].getAttribute('templates'):'template'),
		//templateNameArray=templateNames.split(/\s*,\s*/),
		resources=[];
		for(var i=0,l=elements.length;i<l;i++){
			templateNames+=elements[i].getAttribute('templates')+',';
		}
		resources=templateNames.split(/\s*,\s*/).reduce2(function(result, current, index, array){
			if(current!==''){
				result.push(widgetURI+'/templates/'+current+'.html');
				result.push(widgetURI+'/templates/'+current+'.css');
			}
			return result;
		},resources);
		log.log('nowplaying resources', resources);
		/* check for dependencies. make a list of what we don't already have */
		("ko" in window)			||resources.push("http://z.cdn.turner.com/cnn/.e/js/libs/knockout-2.1.0.js"); //Knockout JS
		("videoModel" in window)	||resources.push(baseURI+'/BaseVideoModel/1.0.2/BaseVideoModel.js');
		/* make sure we have at least one element to bind to */
		if(elements && elements.length>0){
			/* load our stuff in a closure, so we don't leak anything to the global namespace */
			var promises=resources.reduce2(function(result, current, index, array){result.push(function(error, result){return Loader.load(current)});return result;},[]);
			Promise.chain(promises).then(function(error, result){
				//FBCONNECTOR.initialize({appId:appId,appNameSpace:'cnn'});
				/* for each element passed into the closure, instantiate an instance of the model, initialize it, and bind it to the element */
				var models=[];
				for(var i=0,count=elements.length;i<count;i++){
					(function(target){
						var videoId=target.getAttribute('video')||'cvptve/cvpstream1', model;
						if(videoId in models){
							model=models[videoId];
						} else {
							model=new videoModel(videoId);
							model.contentURL=ko.computed(function(){
								return "/video/data/3.0/video/"+this.videoId()+"/index.xml"+
									"?caller="+encodeURIComponent(widgetURI)+
									'&pollInterval='+encodeURIComponent(this.pollInterval())+
									'&referrer='+encodeURIComponent(document.location.href);
							}, model);
							model.pollInterval(300000);
							model.update(function(){});
							model.interval(setInterval(function(){model.update(function(){});}, model.pollInterval()));
							log.log(model.interval());
							models[videoId]=model;
						}
						log.warn(model, target);
						(function(){ko.applyBindings(model,target);})();
					})(elements[i]);
				}
			});
		}
})();
/* global animation functions */
	function slideIn(elements){
		if(!Array.isArray(elements)){
			elements=[elements];
		}
		for(var e in elements){
			if(elements[e].nodeType!=1)continue;
			var t=elements[e],value = (parseInt(t.style.width||300)+100);
			t.style.left=(0-value)+'px';
			emile(t, 'left:0;', { 
				duration: 2000, easing: bounce
			});
		}
	}
	function slideDown(elements){
		if(!Array.isArray(elements)){
			elements=[elements];
		}
		for(var e in elements){
			if(elements[e].nodeType!=1)continue;
			var t=elements[e],
				top=parseInt(t.style.marginTop||0),
				target=(!top||isNaN(top)||top===0)?100:-100;
			t.style.height="20px";
			emile(t, 'display:block;top:'+target+'px', {duration: 2000, easing: bounce});
		}
	}
	function popOpen(elements, duration) {
		if(!Array.isArray(elements)){
			elements=[elements];
		}
		for(var e in elements){
			if(elements[e].nodeType!=1)continue;
			var element=elements[e],height=parseInt(element.style.height||0), target=(!height||height===0)?300:0;
			emile(element, 'height:'+target+'px', { 
				duration: 1000, easing: bounce
			});
		}
	}
	function bounce(pos) {
		if (pos < (1/2.75)) {
			return (7.5625*pos*pos);
		} else if (pos < (2/2.75)) {
			return (7.5625*(pos-=(1.5/2.75))*pos + .75);
		} else if (pos < (2.5/2.75)) {
			return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
		} else {
			return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
		}
	  }
