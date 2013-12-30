
if(typeof($Trumba)=="undefined"){try{if(typeof asual=="undefined")var asual={};if(typeof asual.util=="undefined")asual.util={};asual.util.Browser=new function(){var _agent=navigator.userAgent.toLowerCase(),_safari=/webkit/.test(_agent),_opera=/opera/.test(_agent),_msie=/msie/.test(_agent)&&!/opera/.test(_agent),_mozilla=/mozilla/.test(_agent)&&!/(compatible|webkit)/.test(_agent),_version=parseFloat(_msie?_agent.substr(_agent.indexOf('msie')+4):(_agent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,'0'])[1]);this.toString=function(){return'[class Browser]';};this.getVersion=function(){return _version;};this.isMSIE=function(){return _msie;};this.isSafari=function(){return _safari;};this.isOpera=function(){return _opera;};this.isMozilla=function(){return _mozilla;};}
asual.util.Events=new function(){var DOM_LOADED='DOMContentLoaded',STOP='onstop',_w=window,_d=document,_cache=[],_util=asual.util,_browser=_util.Browser,_msie=_browser.isMSIE(),_safari=_browser.isSafari();this.toString=function(){return'[class Events]';};this.addListener=function(obj,type,listener){_cache.push({o:obj,t:type,l:listener});if(!(type==DOM_LOADED&&(_msie||_safari))){if(obj.addEventListener)
obj.addEventListener(type,listener,false);else if(obj.attachEvent)
obj.attachEvent('on'+type,listener);}};this.removeListener=function(obj,type,listener){for(var i=0,e;e=_cache[i];i++){if(e.o==obj&&e.t==type&&e.l==listener){_cache.splice(i,1);break;}}
if(!(type==DOM_LOADED&&(_msie||_safari))){if(obj.removeEventListener)
obj.removeEventListener(type,listener,false);else if(obj.detachEvent)
obj.detachEvent('on'+type,listener);}};this.removeAllListeners=function(){for(var i=0,e;e=_cache[i];i++){if(e.o.removeEventListener)
e.o.removeEventListener(e.t,e.l,false);else if(e.o.detachEvent)
e.o.detachEvent('on'+e.t,e.l);}
_cache.length=0;}
var _unload=function(){for(var i=0,evt;evt=_cache[i];i++){if(evt.t!=DOM_LOADED)
_util.Events.removeListener(evt.o,evt.t,evt.l);}};var _unloadFix=function(){if(_d.readyState=='interactive'){function stop(){_d.detachEvent(STOP,stop);_unload();};_d.attachEvent(STOP,stop);_w.setTimeout(function(){_d.detachEvent(STOP,stop);},0);}};if(_msie||_safari){(function(){try{if((_msie&&_d.body)||!/loaded|complete/.test(_d.readyState))
_d.documentElement.doScroll('left');}catch(e){return setTimeout(arguments.callee,0);}
for(var i=0,e;e=_cache[i];i++)
if(e.t==DOM_LOADED)e.l.call(null);})();}
if(_msie)
_w.attachEvent('onbeforeunload',_unloadFix);this.addListener(_w,'unload',_unload);}
asual.util.Functions=new function(){this.toString=function(){return'[class Functions]';};this.bind=function(method,object,param){for(var i=2,p,arr=[];p=arguments[i];i++)
arr.push(p);return function(){return method.apply(object,arr);}};}
var SWFAddressEvent=function(type){this.toString=function(){return'[object SWFAddressEvent]';};this.type=type;this.target=[SWFAddress][0];this.value=SWFAddress.getValue();this.path=SWFAddress.getPath();this.pathNames=SWFAddress.getPathNames();this.parameters={};var _parameterNames=SWFAddress.getParameterNames();for(var i=0,l=_parameterNames.length;i<l;i++)
this.parameters[_parameterNames[i]]=SWFAddress.getParameter(_parameterNames[i]);this.parameterNames=_parameterNames;}
SWFAddressEvent.INIT='init';SWFAddressEvent.CHANGE='change';SWFAddressEvent.INTERNAL_CHANGE='internalChange';SWFAddressEvent.EXTERNAL_CHANGE='externalChange';var SWFAddress=new function(){var _getHash=function(){var index=_l.href.indexOf('#');return index!=-1?_ec(_dc(_l.href.substr(index+1))):'';};var _getWindow=function(){try{top.document;return top;}catch(e){return window;}};var _strictCheck=function(value,force){if(_opts.strict)
value=force?(value.substr(0,1)!='/'?'/'+value:value):(value==''?'/':value);return value;};var _ieLocal=function(value,direction){return(_msie&&_l.protocol=='file:')?(direction?_value.replace(/\?/,'%3F'):_value.replace(/%253F/,'?')):value;};var _searchScript=function(el){if(el.childNodes){for(var i=0,l=el.childNodes.length,s;i<l;i++){try{if(el.childNodes[i].src)
_url=String(el.childNodes[i].src);if(s=_searchScript(el.childNodes[i]))
return s;}catch(e){}}}};var _titleCheck=function(){if(_d.title!=_title&&_d.title.indexOf('#')!=-1)
_d.title=_title;};var _listen=function(){if(!_silent){var hash=_getHash();var diff=!(_value==hash);if(_safari&&_version<523){if(_length!=_h.length){_length=_h.length;if(typeof _stack[_length-1]!=UNDEFINED)
_value=_stack[_length-1];_update.call(this,false);}}else if(_msie&&diff){if(_version<7)
_l.reload();else
this.setValue(hash);}else if(diff){_value=hash;_update.call(this,false);}
if(_msie)
_titleCheck.call(this);}};var _bodyClick=function(e){if(_popup.length>0){var popup=window.open(_popup[0],_popup[1],eval(_popup[2]));if(typeof _popup[3]!=UNDEFINED)
eval(_popup[3]);}
_popup=[];};var _swfChange=function(){for(var i=0,id,obj,value=SWFAddress.getValue(),setter='setSWFAddressValue';id=_ids[i];i++){obj=document.getElementById(id);if(obj){if(obj.parentNode&&typeof obj.parentNode.so!=UNDEFINED){obj.parentNode.so.call(setter,value);}else{if(!(obj&&typeof obj[setter]!=UNDEFINED)){var objects=obj.getElementsByTagName('object');var embeds=obj.getElementsByTagName('embed');obj=((objects[0]&&typeof objects[0][setter]!=UNDEFINED)?objects[0]:((embeds[0]&&typeof embeds[0][setter]!=UNDEFINED)?embeds[0]:null));}
if(obj)
obj[setter](value);}}else if(obj=document[id]){if(typeof obj[setter]!=UNDEFINED)
obj[setter](value);}}};var _jsDispatch=function(type){this.dispatchEvent(new SWFAddressEvent(type));type=type.substr(0,1).toUpperCase()+type.substr(1);if(typeof this['on'+type]==FUNCTION)
this['on'+type]();};var _jsInit=function(){if(_util.Browser.isSafari())
_d.body.addEventListener('click',_bodyClick);_jsDispatch.call(this,'init');};var _jsChange=function(){_swfChange();_jsDispatch.call(this,'change');};var _update=function(internal){_jsChange.call(this);if(internal){_jsDispatch.call(this,'internalChange');}else{_jsDispatch.call(this,'externalChange');}
_st(_functions.bind(_track,this),10);};var _track=function(){};var _htmlWrite=function(){var doc=_frame.contentWindow.document;doc.open();doc.write('<html><head><title>'+_d.title+'</title><script>var '+ID+' = "'+_getHash()+'";</script></head></html>');doc.close();};var _htmlLoad=function(){var win=_frame.contentWindow;var src=win.location.href;_value=(typeof win[ID]!=UNDEFINED?win[ID]:'');if(_value!=_getHash()){_update.call(SWFAddress,false);_l.hash=_ieLocal(_value,TRUE);}};var _canAccessLocation=function(){try{_l.href;}
catch(e){return false;}
return true;};var _load=function(){if(!_canAccessLocation()){_supported=false;return;}
if(!_loaded){_loaded=TRUE;if(_msie&&_version<8){var framesetCollection=_d.getElementsByTagName('frameset');var frameset=framesetCollection[framesetCollection.length-1];_frame=_d.createElement((frameset?'':'i')+'frame');if(frameset){frameset.insertAdjacentElement('beforeEnd',_frame);frameset[frameset.cols?'cols':'rows']+=',0';_frame.src='javascript:false';_frame.noResize=true;_frame.frameBorder=_frame.frameSpacing=0;}else{_frame.src='javascript:false';_frame.style.display='none';_d.body.insertAdjacentElement('afterBegin',_frame);}
_st(function(){_events.addListener(_frame,'load',_htmlLoad);if(typeof _frame.contentWindow[ID]==UNDEFINED)
_htmlWrite();},50);}else if(_safari){if(_version<418){_d.body.innerHTML+='<form id="'+ID+'" style="position:absolute;top:-9999px;" method="get"></form>';_form=_d.getElementById(ID);}
if(typeof _l[ID]==UNDEFINED)_l[ID]={};if(typeof _l[ID][_l.pathname]!=UNDEFINED)_stack=_l[ID][_l.pathname].split(',');}
_st(_functions.bind(function(){_jsInit.call(this);_jsChange.call(this);_track.call(this);},this),1);if(_msie&&_version>=8){_d.body.onhashchange=_functions.bind(_listen,this);_si(_functions.bind(_titleCheck,this),50);}else{_si(_functions.bind(_listen,this),50);}}};var ID='swfaddress',FUNCTION='function',UNDEFINED='undefined',TRUE=true,FALSE=false,_util=asual.util,_browser=_util.Browser,_events=_util.Events,_functions=_util.Functions,_version=_browser.getVersion(),_msie=_browser.isMSIE(),_mozilla=_browser.isMozilla(),_opera=_browser.isOpera(),_safari=_browser.isSafari(),_supported=FALSE,_t=_getWindow(),_d=_t.document,_h=_t.history,_l=_t.location,_si=setInterval,_st=setTimeout,_dc=decodeURI,_ec=encodeURI,_frame,_form,_url,_title=_d.title,_length=_h.length,_silent=FALSE,_loaded=FALSE,_justset=TRUE,_juststart=TRUE,_ref=this,_stack=[],_ids=[],_popup=[],_listeners={},_value=_getHash(),_opts={history:TRUE,strict:TRUE};if(_msie&&_d.documentMode&&_d.documentMode!=_version)
_version=_d.documentMode!=8?7:8;_supported=(_mozilla&&_version>=1)||(_msie&&_version>=6)||(_opera&&_version>=9.5)||(_safari&&_version>=312);if(_supported)
_supported=_canAccessLocation();if(_supported){if(_opera)
history.navigationMode='compatible';for(var i=1;i<_length;i++)
_stack.push('');_stack.push(_getHash());if(_msie&&_l.hash!=_getHash())
_l.hash='#'+_ieLocal(_getHash(),TRUE);_searchScript(document);var _qi=_url?_url.indexOf('?'):-1;if(_qi!=-1){var param,params=_url.substr(_qi+1).split('&');for(var i=0,p;p=params[i];i++){param=p.split('=');if(/^(history|strict)$/.test(param[0])){_opts[param[0]]=(isNaN(param[1])?/^(true|yes)$/i.test(param[1]):(parseInt(param[1])!=0));}
if(/^tracker$/.test(param[0]))
_opts[param[0]]=param[1];}}
if(_msie)
_titleCheck.call(this);if(window==_t)
_events.addListener(document,'DOMContentLoaded',_functions.bind(_load,this));_events.addListener(_t,'load',_functions.bind(_load,this));}
this.disable=function(){_events.removeAllListeners();_supported=false;};this.toString=function(){return'[class SWFAddress]';};this.back=function(){_h.back();};this.forward=function(){_h.forward();};this.up=function(){var path=this.getPath();this.setValue(path.substr(0,path.lastIndexOf('/',path.length-2)+(path.substr(path.length-1)=='/'?1:0)));};this.go=function(delta){_h.go(delta);};this.href=function(url,target){target=typeof target!=UNDEFINED?target:'_self';if(target=='_self')
self.location.href=url;else if(target=='_top')
_l.href=url;else if(target=='_blank')
window.open(url);else
_t.frames[target].location.href=url;};this.popup=function(url,name,options,handler){try{var popup=window.open(url,name,eval(options));if(typeof handler!=UNDEFINED)
eval(handler);}catch(ex){}
_popup=arguments;};this.getIds=function(){return _ids;};this.getId=function(index){return _ids[0];};this.setId=function(id){_ids[0]=id;};this.addId=function(id){this.removeId(id);_ids.push(id);};this.removeId=function(id){for(var i=0;i<_ids.length;i++){if(id==_ids[i]){_ids.splice(i,1);break;}}};this.addEventListener=function(type,listener){if(typeof _listeners[type]==UNDEFINED)
_listeners[type]=[];_listeners[type].push(listener);};this.removeEventListener=function(type,listener){if(typeof _listeners[type]!=UNDEFINED){for(var i=0,l;l=_listeners[type][i];i++)
if(l==listener)break;_listeners[type].splice(i,1);}};this.dispatchEvent=function(event){if(this.hasEventListener(event.type)){event.target=this;for(var i=0,l;l=_listeners[event.type][i];i++)
l(event);return TRUE;}
return FALSE;};this.hasEventListener=function(type){return(typeof _listeners[type]!=UNDEFINED&&_listeners[type].length>0);};this.getBaseURL=function(){var url=_l.href;if(url.indexOf('#')!=-1)
url=url.substr(0,url.indexOf('#'));if(url.substr(url.length-1)=='/')
url=url.substr(0,url.length-1);return url;};this.getStrict=function(){return _opts.strict;};this.setStrict=function(strict){_opts.strict=strict;};this.getHistory=function(){return _opts.history;};this.setHistory=function(history){_opts.history=history;};this.getTracker=function(){return _opts.tracker;};this.setTracker=function(tracker){_opts.tracker=tracker;};this.getTitle=function(){return _d.title;};this.setTitle=function(title){if(!_supported)return null;if(typeof title==UNDEFINED)return;if(title=='null')title='';title=_dc(title);_st(function(){_title=_d.title=title;if(_juststart&&_frame&&_frame.contentWindow&&_frame.contentWindow.document){_frame.contentWindow.document.title=title;_juststart=FALSE;}
if(!_justset&&_mozilla)
_l.replace(_l.href.indexOf('#')!=-1?_l.href:_l.href+'#');_justset=FALSE;},10);};this.getStatus=function(){return _t.status;};this.setStatus=function(status){if(!_supported)return null;if(typeof status==UNDEFINED)return;if(status=='null')status='';status=_dc(status);if(!_safari){status=_strictCheck((status!='null')?status:'',TRUE);if(status=='/')status='';if(!(/http(s)?:\/\//.test(status))){var index=_l.href.indexOf('#');status=(index==-1?_l.href:_l.href.substr(0,index))+'#'+status;}
_t.status=status;}};this.resetStatus=function(){_t.status='';};this.getValue=function(){if(!_supported)return null;return _dc(_strictCheck(_ieLocal(_value,FALSE),FALSE));};this.setValue=function(value){if(!_supported)return null;if(typeof value==UNDEFINED)return;if(value=='null')value='';value=_ec(_dc(_strictCheck(value,TRUE)));if(value=='/')value='';if(_value==value)return;_justset=TRUE;_value=value;_silent=TRUE;_update.call(SWFAddress,true);_stack[_h.length]=_value;if(_safari){if(_opts.history){_l[ID][_l.pathname]=_stack.toString();_length=_h.length+1;if(_version<418){if(_l.search==''){_form.action='#'+_value;_form.submit();}}else if(_version<523||_value==''){var evt=_d.createEvent('MouseEvents');evt.initEvent('click',TRUE,TRUE);var anchor=_d.createElement('a');anchor.href='#'+_value;anchor.dispatchEvent(evt);}else{_l.hash='#'+_value;}}else{_l.replace('#'+_value);}}else if(_value!=_getHash()){if(_opts.history)
_l.hash='#'+_dc(_ieLocal(_value,TRUE));else
_l.replace('#'+_dc(_value));}
if((_msie&&_version<8)&&_opts.history){_st(_htmlWrite,50);}
if(_safari)
_st(function(){_silent=FALSE;},1);else
_silent=FALSE;};this.getPath=function(){var value=this.getValue();if(value.indexOf('?')!=-1){return value.split('?')[0];}else if(value.indexOf('#')!=-1){return value.split('#')[0];}else{return value;}};this.getPathNames=function(){var path=this.getPath(),names=path.split('/');if(path.substr(0,1)=='/'||path.length==0)
names.splice(0,1);if(path.substr(path.length-1,1)=='/')
names.splice(names.length-1,1);return names;};this.getQueryString=function(){var value=this.getValue(),index=value.indexOf('?');if(index!=-1&&index<value.length)
return value.substr(index+1);};this.getParameter=function(param){var value=this.getValue();var index=value.indexOf('?');if(index!=-1){value=value.substr(index+1);var p,params=value.split('&'),i=params.length,r=[];while(i--){p=params[i].split('=');if(p[0]==param)
r.push(p[1]);}
if(r.length!=0)
return r.length!=1?r:r[0];}};this.getParameterNames=function(){var value=this.getValue();var index=value.indexOf('?');var names=[];if(index!=-1){value=value.substr(index+1);if(value!=''&&value.indexOf('=')!=-1){var params=value.split('&'),i=0;while(i<params.length){names.push(params[i].split('=')[0]);i++;}}}
return names;};this.onInit=null;this.onChange=null;this.onInternalChange=null;this.onExternalChange=null;(function(){var _args;if(typeof FlashObject!=UNDEFINED)SWFObject=FlashObject;if(typeof SWFObject!=UNDEFINED&&SWFObject.prototype&&SWFObject.prototype.write){var _s1=SWFObject.prototype.write;SWFObject.prototype.write=function(){_args=arguments;if(this.getAttribute('version').major<8){this.addVariable('$swfaddress',SWFAddress.getValue());((typeof _args[0]=='string')?document.getElementById(_args[0]):_args[0]).so=this;}
var success;if(success=_s1.apply(this,_args))
_ref.addId(this.getAttribute('id'));return success;}}
if(typeof swfobject!=UNDEFINED){var _s2r=swfobject.registerObject;swfobject.registerObject=function(){_args=arguments;_s2r.apply(this,_args);_ref.addId(_args[0]);}
var _s2c=swfobject.createSWF;swfobject.createSWF=function(){_args=arguments;var swf=_s2c.apply(this,_args);if(swf)
_ref.addId(_args[0].id);return swf;}
var _s2e=swfobject.embedSWF;swfobject.embedSWF=function(){_args=arguments;if(typeof _args[8]==UNDEFINED)
_args[8]={};if(typeof _args[8].id==UNDEFINED)
_args[8].id=_args[1];_s2e.apply(this,_args);_ref.addId(_args[8].id);}}
if(typeof UFO!=UNDEFINED){var _u=UFO.create;UFO.create=function(){_args=arguments;_u.apply(this,_args);_ref.addId(_args[0].id);}}
if(typeof AC_FL_RunContent!=UNDEFINED){var _a=AC_FL_RunContent;AC_FL_RunContent=function(){_args=arguments;_a.apply(this,_args);for(var i=0,l=_args.length;i<l;i++)
if(_args[i]=='id')_ref.addId(_args[i+1]);}}})();}}catch(e){}
window.$Trumba={version:3.0,loadTime:new Date(),emptyFunction:function(){},baseUri:"",loaderUri:"s.aspx",busyImageUri:"images/spinner_trumba.gif",showDebugOutput:((typeof(trumba_showDebugOutput)!="undefined")&&trumba_showDebugOutput),prologQueue:[],iframeBgColor:"transparent"};(function(){var scripts=document.getElementsByTagName("script");var base="";var embedjs=false;for(var i=0;i<scripts.length;i++){var src=scripts[i].src;if(src&&/msie/i.test(navigator.userAgent))
src=scripts[i].getAttribute("src",4);var match=src?src.match(/\/scripts\/(_?spuds|embed)\.js(.*)?$/i):null;if(match){embedjs=("embed"==match[1].toLowerCase());base=match.input.substring(0,match.index+1);base=base.replace(/\/hash[0-9a-f]+\//i,'/');break;}}
$Trumba.baseUri=base;$Trumba.loaderUri=base+$Trumba.loaderUri;$Trumba.busyImageUri=base+$Trumba.busyImageUri;if(typeof(doV3BackCompat)!="undefined"||embedjs){$Trumba.iframeBgColor="transparent";}})();$Trumba.Class={create:function(){return function(){this.initialize.apply(this,arguments);}},extend:function(destination,source){for(property in source){destination[property]=source[property];}
return destination;},addNamespace:function(n){var parts=n.split('.');var root=window;for(var i=0;i<parts.length;i++){if(root[parts[i]]==null)
eval("root."+parts[i]+" = { };");root=root[parts[i]];}}}
$Trumba.Try={these:function(){var returnValue;for(var i=0;i<arguments.length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}
return returnValue;}}
$Trumba.$=function(id){var result=[];for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof(element)=="string")
element=document.getElementById(element);result.push(element);}
if(result.length==1)return result[0];return result;}
Function.prototype.$trumba_bind=function(){var __method=this,args=$Trumba.$A(arguments),object=$Trumba.Array.shift(args);return function(){return __method.apply(object,args.concat($Trumba.$A(arguments)));}}
Function.prototype.$trumba_bindStr=function(){var __method=this,args=$Trumba.$A(arguments),object=$Trumba.Array.shift(args);var f=function(){return __method.apply(object,args.concat($Trumba.$A(arguments)));}
var methodName="dynCb_"+Math.round(Math.random()*1000000000)+"_cb";window[methodName]=function(){f();};return methodName+"()";}
$Trumba.Class.addNamespace("$Trumba.Array");$Trumba.Array.shift=function(v){var result=v[0];for(var i=0;i<v.length-1;i++)
v[i]=v[i+1];v.length--;return result;}
$Trumba.Array.$break={};$Trumba.Array.$continue={};$Trumba.Array.each=function(array,iterator){var index=0;array=array||[];try{for(var i=0;i<array.length;i++){try{iterator(array[index],index++);}
catch(e){if(e!=$Trumba.Array.$continue)throw e;}}}
catch(e){if(e!=$Trumba.Array.$break)throw e;}}
$Trumba.$A=function(iterable){if(!iterable)
return[];if(iterable.toArray){return iterable.toArray();}else{var results=[];for(var i=0;i<iterable.length;i++)
results.push(iterable[i]);return results;}}
$Trumba.escape=function(sStr){return encodeURIComponent(sStr).replace(new RegExp("\\+","g"),'%2B').replace(new RegExp('\\\"',"g"),'%22').replace(new RegExp("\\'","g"),'%27').replace(new RegExp("\\/","g"),'%2F');}
$Trumba.Class.addNamespace("$Trumba.String");$Trumba.String={fill:function(c,count){var result=new Array(count);for(var i=0;i<count;i++)
result.push(c);return result.join("");},format:function(){if(arguments.length<=1)
return(arguments.length==1)?arguments[0]:"";var result=arguments[0];for(var i=1;i<arguments.length;i++)
result=result.replace(new RegExp("\\{"+(i-1)+"}","g"),arguments[i]);return result;}}
$Trumba.Event={}
$Trumba.Class.extend($Trumba.Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,element:function(event){return event.target||event.srcElement;},keyCode:function(event){if(event.charCode)
return event.keyCode>0?event.keyCode:event.charCode;return event.keyCode;},isAltKey:function(event){return(event.altKey&&event.altKey)||false;},isShiftKey:function(event){return(event.shiftKey&&event.shiftKey)||false;},isCtrlKey:function(event){return(event.ctrlKey&&event.ctrlKey)||false;},isLeftClick:function(event){return(((event.which)&&(event.which==1))||((event.button)&&(event.button==1)));},pointerX:function(event){return
event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));},pointerY:function(event){return
event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop));},stop:function(event){if(event.preventDefault){event.preventDefault();event.stopPropagation();}else{event.returnValue=false;event.cancelBubble=true;}},findElement:function(event,tagName){var element=$Trumba.Event.element(event);while(element.parentNode&&(!element.tagName||(element.tagName.toUpperCase()!=tagName.toUpperCase())))
element=element.parentNode;return element;},observers:false,_observeAndCache:function(element,name,observer,useCapture){if(!this.observers)this.observers=[];if(element.addEventListener){this.observers.push([element,name,observer,useCapture]);element.addEventListener(name,observer,useCapture);}else if(element.attachEvent){this.observers.push([element,name,observer,useCapture]);element.attachEvent('on'+name,observer);}},unloadCache:function(){if(!$Trumba.Event.observers)return;for(var i=0;i<$Trumba.Event.observers.length;i++){$Trumba.Event.stopObserving.apply(this,$Trumba.Event.observers[i]);$Trumba.Event.observers[i][0]=null;}
$Trumba.Event.observers=false;},observe:function(element,name,observer,useCapture){var element=$Trumba.$(element);useCapture=useCapture||false;if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.attachEvent))
name='keydown';this._observeAndCache(element,name,observer,useCapture);},stopObserving:function(element,name,observer,useCapture){var element=$Trumba.$(element);useCapture=useCapture||false;var permissionCheck=null;try{permissionCheck=element.tagName||element.location;}catch(ex){}
if(permissionCheck){if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.detachEvent))
name='keydown';if(element.removeEventListener){element.removeEventListener(name,observer,useCapture);}else if(element.detachEvent){element.detachEvent('on'+name,observer);}}}});$Trumba.EventSource={_eventSource_events:false,addEventListener:function(name,observer){if(name)name=name.toLowerCase();if(name&&observer){if(!this._eventSource_events)
this._eventSource_events={};if(typeof(this._eventSource_events[name])=="undefined")
this._eventSource_events[name]=[];for(var i=0;i<this._eventSource_events[name].length;i++){if(this._eventSource_events[name][i]==observer)
return;}
this._eventSource_events[name].push(observer);}},removeEventListener:function(name,observer){if(name)name=name.toLowerCase();if(name&&observer){if(!this._eventSource_events)return;if(typeof(this._eventSource_events[name])=="undefined")
return;var copy=[];for(var i=0;i<this._eventSource_events[name].length;i++){if(this._eventSource_events[name][i]!=observer)
copy.push(this._eventSource_events[name][i]);}
if(copy.length>0){this._eventSource_events[name]=copy;}
else{this._eventSource_events[name]=null;delete this._eventSource_events[name];}}},_fireEvent:function(name){if(name)name=name.toLowerCase();var args=$Trumba.$A(arguments);args.shift();if(this._eventSource_events[name]){for(var i=0;i<this._eventSource_events[name].length;i++){try{this._eventSource_events[name][i].apply(window,args);}
catch(ex){}}}}}
$Trumba.Logger=$Trumba.Class.create();$Trumba.Logger.LEVEL_ERROR=0x01;$Trumba.Logger.LEVEL_WARNING=0x02;$Trumba.Logger.LEVEL_INFO=0x03;$Trumba.Logger.prototype={initialize:function(){this.handlers=[];},addHandler:function(handler){if(handler){for(var i=0;i<this.handlers.length;i++){if(this.handlers[i]==handler)
return;}
this.handlers.push(handler);}},removeHandler:function(handler){if(handler&&this.handlers.length>0){var handlers=[];for(var i=0;i<this.handlers.length;i++){if(this.handlers[i]==handler)
continue;handlers[handlers.length]==this.handlers[i];}
this.handlers=handlers;}},_log:function(level,message,thrown,className,methodName){if(!this.handlers.length)return;var record={};record.level=level;record.message=message;record.thrown=thrown;record.className=className;record.methodName=methodName;for(var i=0;i<this.handlers.length;i++)
this.handlers[i].processRecord(record);},error:function(message){this._log.apply(this,[$Trumba.Logger.LEVEL_ERROR].concat($Trumba.$A(arguments)));},warning:function(message){this._log.apply(this,[$Trumba.Logger.LEVEL_WARNING].concat($Trumba.$A(arguments)));},info:function(message){this._log.apply(this,[$Trumba.Logger.LEVEL_INFO].concat($Trumba.$A(arguments)));}}
$Trumba.logger=new $Trumba.Logger();$Trumba.Debug={};$Trumba.Debug.ConsoleLogger=$Trumba.Class.create();$Trumba.Debug.ConsoleLogger.prototype={initialize:function(){if($Trumba.Debug.ConsoleLogger.init)return;if(typeof(console)=="undefined"||typeof(console.log)=="undefined")return;this._methods={};this._methods[$Trumba.Logger.LEVEL_INFO]=console.log;this._methods[$Trumba.Logger.LEVEL_WARNING]=console.warn||console.log;this._methods[$Trumba.Logger.LEVEL_ERROR]=console.error||console.log;$Trumba.Debug.ConsoleLogger.init=$Trumba.Debug.ConsoleLogger.init||true;$Trumba.logger.addHandler(this);},_getMethod:function(record){return this._methods[record.level]||function(){};},processRecord:function(record){var prefix='';prefix=prefix.length>4?prefix:"";this._getMethod(record).apply(console,[prefix+record.message]);}}
$Trumba.Debug.SpudDebugWindow=$Trumba.Class.create();$Trumba.Debug.SpudDebugWindow.prototype={initialize:function(){this.window=null;if($Trumba.Debug.SpudDebugWindow.instance==null)
$Trumba.Debug.SpudDebugWindow.instance=this;$Trumba.logger.addHandler(this);this._tryGetWindow();this.show();},processRecord:function(record){try{this.window.processRecord(record);}
catch(e){}},_tryGetWindow:function(){if(this.window)
return;try{var w=window.open("","spudDebug","scrollbars=1,status=1,resizable=yes,toolbar=no,menubar=yes");var doc;doc=w.document;if(typeof(w.processRecord)!="undefined"){this.window=w;$Trumba.logger.info("Attaching to existing debug window.");window.focus();}}
catch(e){}},show:function(){if(this.window&&!this.window.closed){return;}
this.window=null;var ie=/msie/i.test(navigator.userAgent);var width=(window.screen.availWidth*0.5)-10;var height=425;var left=ie?window.screen.availWidth*0.5+(window.screen.width-window.screen.availWidth):0;var top=window.screen.availHeight-height;var w=null;try{w=window.open("","spudDebug","scrollbars=1,status=1,resizable=yes,width="+width+",height="+height+",left="+left+",top="+top+",toolbar=no,menubar=no");var doc;doc=w.document;doc.write("<html><body>Loading...</body></html>");doc.close();w.moveTo(left,top);w.resizeTo(width,height);window.focus();}
catch(e){if(w!=null){try{w.close();}catch(e2){}
w=null;}
return;}
this.window=w;this.refresh();},refresh:function(){this.show();if(this.window){var w=this.window;var callbacks={onSuccess:function(result){if(!w.closed)w.document.write(result.body);w.document.close();},onTimeout:function(){if(!w.closed)w.document.write("Timeout");w.document.close();},onFailure:function(){if(!w.closed)w.document.write("Fetch error!");w.document.close();}}
var url=$Trumba.loaderUri+"?spud.relpath="+$Trumba.escape("spuddebug.html");if(typeof($Trumba.ScriptXmlHttpRequest)=="undefined")
$Trumba.prologQueue.push(function(){var u=url;var c=callbacks;eval("new $Trumba.ScriptXmlHttpRequest(u, c).invoke();");});else
new $Trumba.ScriptXmlHttpRequest(url,callbacks).invoke();}}}
$Trumba.Debug.SpudDebugWindow.instance=null;$Trumba.Debug.SpudDebugWindow.keyHandler=function(e){if(!e)e=window.event;var c=String.fromCharCode($Trumba.Event.keyCode(e)).toLowerCase();if(c=="z"&&$Trumba.Event.isAltKey(e)&&$Trumba.Event.isCtrlKey(e)){if($Trumba.Debug.SpudDebugWindow.instance==null)
new $Trumba.Debug.SpudDebugWindow();$Trumba.Debug.SpudDebugWindow.instance.show();}}
$Trumba.Event.observe(document,"keypress",$Trumba.Debug.SpudDebugWindow.keyHandler,false);if($Trumba.showDebugOutput){var o=null;if($Trumba.showDebugOutput['console']){o=new $Trumba.Debug.ConsoleLogger();if(/Safari/i.test(navigator.userAgent))
o=new $Trumba.Debug.SpudDebugWindow();}
if($Trumba.showDebugOutput['window']){o=new $Trumba.Debug.SpudDebugWindow();}
if(!o){if(typeof(console)=="undefined")
new $Trumba.Debug.SpudDebugWindow();else
new $Trumba.Debug.ConsoleLogger();}}
$Trumba.Class.addNamespace("$Trumba.Net");$Trumba.Net.QueryString=$Trumba.Class.create();$Trumba.Net.QueryString.prototype={initialize:function(search){this.pairs=[];if(search!=null){if(typeof(search)=="string")
this.from(search)
else if(typeof(search)=="object")
this.copyConstructor(search);}},copyConstructor:function(other){var t=this;other.visit(function(n,v){t.setAt(n,v);});},from:function(search){this.pairs=[];if(search==null||search=='')return;if(search.indexOf('?')==0)search=search.substring(1);search=search.split('&');for(var i=0;i<search.length;i++){if(search[i]!=''){var nv=search[i].split('=');if(nv.length==1)
this.pairs.push([decodeURIComponent(nv[0]),null]);else
this.pairs.push([decodeURIComponent(nv[0]),decodeURIComponent(nv[1])]);}}},isEmpty:function(){return this.pairs.length==0;},getCount:function(){return this.pairs.length;},setAt:function(name,value){var i=this.findByName(name);if(i!=-1)
this.pairs[i][1]=value;else
this.pairs.push([name,value]);},toString:function(){var r=new Array(this.pairs.length);for(var i=0;i<r.length;i++){if(this.pairs[i][1]==null)
r[i]=$Trumba.escape(this.pairs[i][0]);else
r[i]=$Trumba.escape(this.pairs[i][0])+'='+$Trumba.escape(this.pairs[i][1]);}
return r.join('&');},getAt:function(index){if(typeof(index)=="string"){index=this.findByName(index);if(index==-1)
return null;}
return this.pairs[index];},remove:function(name){var index=this.findByName(name);if(index!=-1)
this.removeAt(index);},removeAt:function(index){var temp=[];for(var i=0;i<this.pairs.length;i++){if(i!=index)temp.push(this.pairs[i]);}
this.pairs=temp;},length:function(){return this.pairs.length;},visit:function(v){for(var i=0;i<this.pairs.length;i++){v(this.pairs[i][0],this.pairs[i].length>1?this.pairs[i][1]:null);}},findByName:function(name){for(var i=0;i<this.pairs.length;i++){if(this.pairs[i][0]==name)return i;}
return-1;},insert:function(other){for(var i=0;i<other.length();i++){var op=other.getAt(i);this.setAt(op[0],op[1]);}},subtract:function(other){for(var i=0;i<other.length();i++){var i=this.findByName(other.getAt(i)[0]);if(i!=-1)this.removeAt(i);}},prefixWith:function(prefix){for(var i=0;i<this.pairs.length;i++){this.pairs[i][0]=prefix+this.pairs[i][0];}}}
$Trumba.Net.Url=$Trumba.Class.create();$Trumba.Net.Url.prototype={initialize:function(url){this._path='';this._queryString=new $Trumba.Net.QueryString();this._hash='';if(url!=null){if(typeof(url)=="string")
this.fromString(url);else if(url["href"])
this.fromString(url.href);else if(typeof(url)=="object")
this.copyConstructor(search);}},copyConstructor:function(other){this._path=other._path;this._queryString=new $Trumba.Net.QueryString(other._queryString);this._hash=other._hash;},fromString:function(url){this._path='';this._queryString=new $Trumba.Net.QueryString();this._hash='';var i=url.indexOf('#');if(i>=0){this._hash=url.substring(i+1);url=url.substring(0,i);}
i=url.indexOf('?');if(i>=0){this._queryString=new $Trumba.Net.QueryString(url.substring(i));url=url.substring(0,i);}
this._path=url;},getPath:function(){return this._path;},getHash:function(){return this._hash;},getQueryString:function(){return this._queryString;},toString:function(){var result=this._path;var qs=this._queryString.toString();if(qs.length)
result+='?'+qs;if(this._hash.length)
result+='#'+this._hash;return result;}}
$Trumba.Net.Cookie=$Trumba.Class.create();$Trumba.Net.Cookie.prototype={initialize:function(doc,name,hours,path,domain,secure){this._document=doc;this._name=name;if(hours)
this._expiration=new Date((new Date()).getTime()+hours*3600000);else
this._expiration=null;if(path)this._path=path;else this._path=null;if(domain)this._domain=domain;else this._domain=null;if(secure)this._secure=secure;else this._secure=null;},save:function(){var cookieval="";for(var prop in this){if((prop.charAt(0)=='_')||(typeof(this[prop])=='function'))
continue;if(cookieval!="")
cookieval+='&';var propName=prop;if(typeof(this[prop])=="number")
propName="[n]"+prop;else if(typeof(this[prop])=="boolean")
propName="[b]"+prop;cookieval+=propName+':'+$Trumba.escape(this[prop]);}
var cookie=this._name+'='+cookieval;if(this._expiration)
cookie+='; expires='+this._expiration.toGMTString();if(this._path)cookie+='; path='+this._path;if(this._domain)cookie+='; domain='+this._domain;if(this._secure)cookie+='; secure='+this._secure;this._document.cookie=cookie;},load:function(){var allcookies=this._document.cookie;if(typeof(allcookies)!="string")return false;var start=allcookies.indexOf(this._name+'=');if(start==-1)
return false;start+=this._name.length+1;var end=allcookies.indexOf(';',start);if(end==-1)
end=allcookies.length;var cookieval=allcookies.substring(start,end);var a=cookieval.split('&');for(var i=0;i<a.length;i++)
a[i]=a[i].split(':');for(var i=0;i<a.length;i++){var name=a[i][0];var typeParam=null;if(name.charAt(0)=='['){typeParam=name.charAt(1);name=name.substring(3);}
var value=decodeURIComponent(a[i][1]);if(typeParam!=null){if("n"==typeParam)
value=Number(value);else if("b"==typeParam)
value=(value=="true"?true:false);}
this[name]=value;}
return true;},expire:function(){var cookie=this._name+'=';if(this._path)
cookie+='; path='+this._path;if(this._domain)
cookie+='; domain='+this._domain;cookie+='; expires='+new Date(0).toGMTString();this._document.cookie=cookie;}}
$Trumba.Class.addNamespace("$Trumba.DOM");$Trumba.DOM={createElement:function(tag,attrs){attrs=attrs||[];var e=document.createElement(tag);for(var i=0;i<attrs.length;i++)
if(attrs[i][1]!='')e.setAttribute(attrs[i][0],attrs[i][1]);return e;},compareElements:function(e1,e2){if(e1==e2)return true;if(!e1||!e2)return false;if(e1.tagName!=e2.tagName)return false;if(e1.attributes.length!=e2.attributes.length)return false;for(var i=0;i<e1.attributes.length;i++){var name=e1.attributes[i].name;if(e2.attributes[name]==null)return false;if(e1.attributes[name].value!=e2.attributes[name].value)return false;}
return true;},appendChild:function(element,parent){var kids=parent.getElementsByTagName(element.tagName)||[];for(var i=0;i<kids.length;i++){if($Trumba.DOM.compareElements(element,kids[i]))
return;}
parent.appendChild(element);}};$Trumba.Class.addNamespace("$Trumba.Spuds");$Trumba.Spuds.nextSpudID=0;$Trumba.Spuds.createSpudId=function(){return"trumba.spud."+$Trumba.Spuds.nextSpudID++;}
$Trumba.addSpud=function(args){var webName=args["webName"];if(!webName||webName==""){var msg="ERROR : You must provide a webName parameter for your Spud!";alert(msg);throw msg;}
delete args["webName"];var spudType=args["spudType"];if(!spudType||spudType==""){var msg="ERROR : You must provide a spudType parameter for your Spud!";alert(msg);throw msg;}
if(spudType.toLowerCase()=="calendar")
spudType="main";delete args["spudType"];var spudId=args["spudId"];if(spudId)
delete args["spudId"];var urlArgs=args["url"];if(urlArgs)
delete args["url"];var objectType=args["objectType"];if(objectType){if(!urlArgs)
urlArgs={};urlArgs["objecttype"]=objectType;}
var detectMobile=args["detectMobile"];if(detectMobile!=null){if(!urlArgs)
urlArgs={};urlArgs["detectMobile"]=detectMobile;}
if(spudType=="main"&&(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))){if(!urlArgs)
urlArgs={};urlArgs["ismobile"]="1";}
var properties=args;$Trumba.logger.info("Creating "+spudType+" for calendar "+webName,null,"$Trumba","addSpud");var createContainer=spudId?false:true;if(createContainer){spudId=$Trumba.Spuds.createSpudId();if(args.position){args.position.removeOnClose=true;var div=document.createElement("div");div.id=spudId;div.style.position="absolute";div.style.zIndex=100000;div.style.backgroundColor=args['backgroundColor']||'transparent';document.body.appendChild(div);}
else{var html=$Trumba.String.format($Trumba.Spuds.DIV_FORMAT,spudId);document.write(html);}}
var createAndRegisterSpud=function(){var spud=$Trumba.Spuds.SpudFactory.create(webName,spudType,spudId,urlArgs,properties);$Trumba.Spuds.controller.addSpud(spud);}
if($Trumba.$(spudId)==null){window.setTimeout(function(){if($Trumba.$(spudId)==null){$Trumba.logger.error('Cannot find our spud div with id '+spudId,null,null,'$Trumba.addSpud');return;}
createAndRegisterSpud();},1);return spudId;}
createAndRegisterSpud();return spudId;}
$Trumba.Opera8Fixup=function(){window["trumba_opera_8_fix_1"]=document.getElementById("TrumbaIframe");}
$Trumba.addBackCompatSpud=function(webName,spudType,urlArgs,properties,frameID){var iframe=$Trumba.$(frameID);if(!iframe)return;iframe.style.display="none";var container=$Trumba.DOM.createElement("div",[["id",""+Math.random()]]);iframe.parentNode.insertBefore(container,iframe);$Trumba.addSpud($Trumba.Class.extend({webName:webName,spudType:spudType,spudId:container.id,url:urlArgs},properties));}
$Trumba.Spuds.IFRAME_FORMAT_SSL='<iframe src="javascript:\'<html><head>{5}</head><body style={4}>&nbsp;</body></html>\'" id="{0}" name="{0}" style="{1}" frameborder="no" width="100%" scrolling="no" marginheight="0" marginwidth="0" {2} {3}><\/iframe>';$Trumba.Spuds.IFRAME_FORMAT='<iframe src="javascript:\'<html><head>{5}</head><body style={4}></body></html>\'" id="{0}" name="{0}" style="{1}" frameborder="no" width="100%" scrolling="no" marginheight="0" marginwidth="0" {2} {3}><\/iframe>';$Trumba.Spuds.DIV_FORMAT='<div id="{0}"></div>';$Trumba.Spuds.handleDocDomain=function(){return(/msie/i.test(navigator.userAgent)&&document.domain!=document.location.hostname);}
$Trumba.Spuds.renderIFrameHTML=function(id,style,width,height,transparent){height=height||"35";if(typeof(transparent)=="undefined")
transparent=true;var ie=/msie/i.test(navigator.userAgent);var secure=window.location.protocol.toLowerCase()==("https:");var format=(ie&&secure)?$Trumba.Spuds.IFRAME_FORMAT_SSL:$Trumba.Spuds.IFRAME_FORMAT;var freeForm='height="'+height+'" ';if(width){if(typeof(width)=="number")
width=width+"px";freeForm+='width="'+width+'" ';}
var html=$Trumba.String.format(format,id,style||"",freeForm,(transparent?'allowtransparency="true"':''),"background-color:transparent",$Trumba.Spuds.handleDocDomain()?"<script>window.onload=function(){document.write(\\'<script>document.domain=\\\\\\\'"+document.domain+"\\\\\\\';<\\\\/script>\\');document.close();};<\/script>":"");return html;}
$Trumba.Spuds.createIFrame=function(id,style,width,height,transparent){var iframe=document.createElement("iframe");if(typeof(transparent)=="undefined")
transparent=true;iframe.setAttribute("id",id);iframe.setAttribute("name",id);iframe.frameBorder="no";iframe.setAttribute("width",width||"100%");if(height)
iframe.setAttribute("height",height);iframe.setAttribute("scrolling","no");iframe.setAttribute("marginheight","0");iframe.setAttribute("marginwidth","0");if(transparent)
iframe.setAttribute("allowtransparency","true");if(style)
iframe.setAttribute("style",style);return iframe;}
$Trumba.Class.addNamespace("$Trumba.Spuds.SpudFactory");$Trumba.Spuds.SpudFactory.create=function(webName,spudType,id,urlArgs,properties){return new $Trumba.Spuds.SimpleSpud(webName,spudType,id,urlArgs,properties);}
$Trumba.Spuds.removeList={eventid:{},view:{},objectid:{},objecttype:{},key:{}}
$Trumba.Spuds.TransientParams={_params:{"calendar":{eventid:{},view:{},seriesid:{},parenteventid:{},objectid:{},objecttype:{},key:{}},"main":{eventid:{},view:{},seriesid:{},parenteventid:{},objectid:{},objecttype:{},key:{}},"mainobject":{eventid:{},view:{},seriesid:{},parenteventid:{},objectid:{},objecttype:{},key:{}},"ryomain.*":{eventid:{},view:{},seriesid:{},parenteventid:{},objectid:{},objecttype:{},key:{}}},getParams:function(spudType){for(var t in $Trumba.Spuds.TransientParams._params){var reg=new RegExp(t,"i");if(reg.test(spudType))
return $Trumba.Spuds.TransientParams._params[t];}
return{};}}
$Trumba.Spuds.DivContainer=$Trumba.Class.create();$Trumba.Spuds.DivContainer.prototype={initialize:function(parent,spud){this._spud=spud;this.parentDiv=parent;this.id=parentDiv.id;},setHTML:function(html,wrapInHTML){this.parentDiv.innerHTML=html;},onSpudLoaded:function(){this.resize();},resize:function(){},getWindow:function(){return window;},fetch:function(queryString,callbacks){this.queryString=new $Trumba.Net.QueryString(queryString);this.queryString.setAt("spud.con","div");callbacks=callbacks||{};var myCallbacks={onSuccess:this._onDataSuccess.$trumba_bind(this),onTimeout:callbacks.onTimeout||this._onDataTimeout.$trumba_bind(this),onFailure:callbacks.onFailure||this._onDataFailure.$trumba_bind(this)}
$Trumba.Spuds.controller.loader.request(this.queryString.toString(),myCallbacks,{cache:this._spud.getProperty("cache"),id:this.id});},_setErrorHTML:function(){var html="<div style=\"padding:10px;font-family:Arial;\">We're sorry, there was an error loading the Spud.</div>";this.setHTML(html);},_onDataSuccess:function(result){this.setHTML(result.body.body);this._fireEvent("onFetched");},_onDataTimeout:function(e){$Trumba.logger.error(this.parentDiv.id+" <b>Timeout Error</b> loading("+this.queryString.toString()+")",null,"$Trumba.Spuds.DivContainer","_onDataTimeout");this._setErrorHTML();},_onDataFailure:function(e){$Trumba.logger.error(this.parentDiv.id+" <b>Data Failure </b> loading("+this.queryString.toString()+")",null,"$Trumba.Spuds.DivContainer","_onDataFailure");this._setErrorHTML();}}
$Trumba.Class.extend($Trumba.Spuds.DivContainer.prototype,$Trumba.EventSource);$Trumba.Spuds.IFrameContainer=$Trumba.Class.create();$Trumba.Spuds.IFrameContainer.prototype={initialize:function(parentDiv,spud){this._spud=spud;this.parentDiv=parentDiv;this.id=parentDiv.id;this.iframeStyle=this._getDefaultStyle();this._position=this._spud.getProperty("position");this._initIFrame();this._loaded=false;if(this._position!=null){this.parentDiv.style.display="";this.parentDiv.style.position="absolute";this.parentDiv.style.left=this._position.left+"px";this.parentDiv.style.top=this._position.top+"px";this.parentDiv.style.width=this._position.width+"px";if(this._position.height)
this.parentDiv.style.height=this._position.height+"px";this.parentDiv.style.overflow="hidden";this.parentDiv.style.zIndex=100000;this.parentDiv.style.backgroundColor=this._spud.getProperty('backgroundColor')||'transparent';if(/msie/i.test(navigator.userAgent))
this.parentDiv.style.visibility="hidden";else
this.parentDiv.style.height="0px";}
if(navigator.userAgent.indexOf("Gecko")!=-1){this._unloadCallback=this._removeIFrame.$trumba_bind(this)
$Trumba.Spuds.controller.addEventListener("unload",this._unloadCallback);}},_initIFrame:function(){var height=this._spud.getProperty("initialHeight")||35;var imgBusy="";if(!this._spud.getProperty("position"))
imgBusy=$Trumba.String.format('<img id="{0}" src="{1}"></img>',this._spud._getBusyImageId(),$Trumba.busyImageUri);var html=$Trumba.String.format('<div id="{0}" style="background-color:transparent;height:{1}px;padding:0px;">{2}</div>',this._getIFrameId(),height,imgBusy);this.parentDiv.innerHTML=html;this.iframe=$Trumba.$(this._getIFrameId());},_getDefaultStyle:function(){var bgcolor;try{bgcolor=this.parentDiv.style.backgroundColor||this.parentDiv.parentNode.style.backgroundColor||$Trumba.iframeBgColor;}
catch(e){bgcolor="transparent";}
bgcolor=$Trumba.String.format("background-color:{0};",bgcolor)
return bgcolor;},close:function(){this.parentDiv.innerHTML="";this.parentDiv.style.display="none";$Trumba.Spuds.controller.removeEventListener("unload",this._unloadCallback);if(this._position!=null&&this._position.removeOnClose){this.parentDiv.parentNode.removeChild(this.parentDiv);this.parentDiv=null;}},setHTML:function(html,wrapInHTML){if(wrapInHTML)
html=$Trumba.String.format("<html><body>{0}</body></html>",html);var result={body:html};this._onDataSuccess(result);this._resizeIFrameWithWait(400);},onSpudLoaded:function(){$Trumba.logger.info(this._getIFrameId()+'<span style="color:red"> onSpudLoaded!</span>',null,"$Trumba.Spuds.IFrameContainer","onSpudLoaded");this._loaded=true;this._resizeIFrameWithWait();this._fireEvent("onFetched");this._spudLoaded();},_spudLoaded:function(){},resize:function(){this._resizeIFrame();},scrollIntoView:function(){var offset=this.getLocation();var height=window.innerHeight||document.documentElement.offsetHeight;var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;var top=offset.top-scrollTop;if(top>=0&&top<height)return;window.scrollTo(scrollLeft,offset.top);},cumulativeOffset:function(element){var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;}while(element);return[valueL,valueT];},getLocation:function(){if(this.iframe==null)
return{left:0,top:0,width:0,height:0};var co=this.cumulativeOffset(this.iframe);return{left:co[0],top:co[1],width:this.iframe.offsetWidth,height:this.iframe.offsetHeight};},getScroll:function(){var value={left:0,top:0};if(this.iframe==null)
return value;for(var element=this.iframe.parentNode;element!=null&&element!=document.body;element=element.parentNode)
{value.top+=element.scrollTop||0;value.left+=element.scrollLeft||0;}
return value;},getWindow:function(){if(this.iframe){if(this.iframe.contentWindow)
return this.iframe.contentWindow;else
return window.frames[this._getIFrameId()];}
return null;},fetch:function(queryString,callbacks){this.queryString=queryString;callbacks=callbacks||{};var con=this;var myCallbacks={onSuccess:this._onDataSuccess.$trumba_bind(this),onTimeout:callbacks.onTimeout||this._onDataTimeout.$trumba_bind(this),onFailure:callbacks.onFailure||this._onDataFailure.$trumba_bind(this),cbid:this.id}
this._loaded=false;if(this._spud.getProperty("popupHTML"))
{myCallbacks.onSuccess({body:this._spud.getProperty("popupHTML")});return;}
$Trumba.Spuds.controller.loader.request(this.queryString.toString(),myCallbacks,{cache:this._spud.getProperty("cache"),id:this.id});},_getIFrameId:function(){return this.id+".iframe";},_resizeIFrameWithWait:function(delay){var con=this;delay=delay||200;window.setTimeout(function(){con._resizeIFrame();},delay);},_resizeIFrame:function(){if(!this._loaded||this._spud.closed)return;var iframe=this.iframe;var con=this;var firstAttempt=(arguments.length==0);var b4=iframe.height;var path="unk";var adjustWidth=this._spud.properties.autoWidth;$Trumba.Try.these(function(){path="Moz-"+iframe.contentDocument.body.offsetHeight;if(!/Safari/i.test(navigator.userAgent)&&iframe.contentDocument.body.offsetHeight>32000){iframe.height=32000;iframe.scrolling="yes";}
else
iframe.height=iframe.contentDocument.body.offsetHeight;var autoWidthRootDiv=iframe.contentDocument.getElementById('autoWidthRootDiv');if(adjustWidth&&autoWidthRootDiv)
iframe.width=autoWidthRootDiv.scrollWidth;else if(autoWidthRootDiv&&autoWidthRootDiv.offsetWidth>iframe.offsetWidth)
{autoWidthRootDiv.style.width=iframe.offsetWidth+"px";}},function(){path="IE-"+iframe.Document.body.scrollHeight;var newHeight=iframe.Document.body.scrollHeight;if(newHeight!=iframe.height)
{iframe.height=newHeight;if(/msie/i.test(navigator.userAgent)){window.setTimeout(function(){iframe.style.display="none";iframe.style.display="";},1);}}
if(adjustWidth&&iframe.Document.getElementById('autoWidthRootDiv'))
{var newWidth=iframe.Document.getElementById('autoWidthRootDiv').scrollWidth;if(newWidth!=iframe.width)
{iframe.width=newWidth;if(/msie/i.test(navigator.userAgent)){window.setTimeout(function(){iframe.style.display="none";iframe.style.display="";},1);}}}
else
{var autoWidthRootDiv=iframe.Document.getElementById('autoWidthRootDiv');if(autoWidthRootDiv&&autoWidthRootDiv.offsetWidth>iframe.offsetWidth)
{autoWidthRootDiv.style.width=iframe.offsetWidth+"px";autoWidthRootDiv.style.overflowX="scroll";}
else if(autoWidthRootDiv&&autoWidthRootDiv.style.overflowX!="scroll")
{autoWidthRootDiv.style.height=(autoWidthRootDiv.offsetHeight+18).toString()+"px";autoWidthRootDiv.style.overflow="hidden";autoWidthRootDiv.style.overflowX="scroll";}}},function(){path="frames[]-"+frames[iframe.id].document.body.scrollHeight;iframe.height=frames[iframe.id].document.body.scrollHeight;if(adjustWidth)
iframe.width=frames[iframe.id].document.body.scrollWidth;},function(){$Trumba.logger.warning(this._getIFrameId()+" Cannot figure out how to set IFRAME height!",null,"$Trumba.Spuds.IFrameContainer","_resizeIFrame");if(firstAttempt){window.setTimeout(function(){con._resizeIFrame(false);},200);}});if(con._position!=null){con.parentDiv.style.height=iframe.height+"px";if(con.parentDiv.style.visibility=="hidden")
con.parentDiv.style.visibility="visible";}
this._spud._hideBusyImage();if(iframe.height!=b4){this._sizeChanged()}
if(this._position){this._fireEvent("resize",{left:this._position.left,top:this._position.top,width:this._position.width,height:parseInt(iframe.height)});}
this._spud.setSpudCookieProperty("initialHeight",Number(iframe.height));},_sizeChanged:function(){if(this._position!=null){this.parentDiv.style.overflow="hidden";this.parentDiv.style.width=this._position.width+"px";}
else{this.parentDiv.style.overflow="";this.parentDiv.style.width="";this.parentDiv.style.height="";}},getPosition:function(){return this._position;},setPosition:function(position){if(!this._position)return;this._position.left=position.left||this._position.left;this._position.top=position.top||this._position.top;this._position.width=position.width||this._position.width;this.parentDiv.style.left=this._position.left+"px";this.parentDiv.style.top=this._position.top+"px";this.parentDiv.style.width=this._position.width+"px";},_removeIFrame:function(){$Trumba.logger.info("<b>_removeIFrame</b> "+this._getIFrameId());var doc;if(this.iframe.contentWindow)
doc=this.iframe.contentWindow.document;else
doc=window.frames[this._getIFrameId()].document;doc.write("<html><body></body></html>");doc.close();},getIFrameDocument:function(iframe){if(iframe.contentDocument)
return iframe.contentDocument;else if(iframe.contentWindow)
return iframe.contentWindow.document;else if(iframe.document)
return iframe.document;return null;},_setErrorHTML:function(){this.setHTML('<html><body><div style="font-style:italic;font-size:0.8em;font-family:Arial, Helvetica, Verdana;padding:10px;">Calendar is temporarily unavailable.</div></body></html>',false);},_rebuildIFrame:function(html){if(this._spud.closed){$Trumba.logger.warning(this._getIFrameId()+"("+this.queryString.toString()+") Spud Closed - Not Rebuilding");return;}
var height=this.iframe.offsetHeight;var divHeight=height;var initialHeight=this._spud.getProperty("initialHeight");if((height==0)&&(initialHeight!=null))
divHeight=initialHeight;this.parentDiv.style.overflow="hidden";this.parentDiv.style.height=divHeight+"px";this.parentDiv.removeChild(this.iframe);this.iframe=null;this.parentDiv.innerHTML=$Trumba.Spuds.renderIFrameHTML(this._getIFrameId(),this.iframeStyle,null,height,this._position==null);this.iframe=$Trumba.$(this._getIFrameId());if($Trumba.Spuds.handleDocDomain()){this.html=html.replace("{{document.domain}}",document.domain);window.setTimeout(this._populateIFrame.$trumba_bind(this),1);}
else{this.html=html;this._populateIFrame();}},_populateIFrame:function(){if(this.iframe.contentWindow){var doc=this.iframe.contentWindow.document;this._writeAndClose(doc,this.html);this._resizeIFrameWithWait();}
else if(window.frames){var id=this._getIFrameId();var con=this;var f=function(){if(!frames[id]){window.setTimeout(arguments.callee,1);return;}
con._writeAndClose(frames[id].document,this.html);con._resizeIFrameWithWait();}
window.setTimeout(f,1);}
else{$Trumba.logger.error("Ugh - no frames support, how did we get here?");}},_onDataSuccess:function(result){this._rebuildIFrame(result.body);return;},_onDataTimeout:function(e){$Trumba.logger.error(this._getIFrameId()+" <b>Timeout Error</b> loading("+this.queryString.toString()+")");this._setErrorHTML();},_onDataFailure:function(e){$Trumba.logger.error(this._getIFrameId()+" <b>Data Failure </b> loading("+this.queryString.toString()+")");this._setErrorHTML();},_writeAndClose:function(doc,html){this._spud._hideBusyImage();doc.write(html);doc.close();}}
$Trumba.Class.extend($Trumba.Spuds.IFrameContainer.prototype,$Trumba.EventSource);$Trumba.Spuds.SimpleSpud=$Trumba.Class.create();$Trumba.Spuds.SimpleSpud.prototype={initialize:function(webName,spudType,id,urlArgs,properties){urlArgs=urlArgs||{};this.spudType=spudType;this.spudConfig=properties.spudConfig||'';this.spudConfigSuffix=(this.spudConfig==''?'':('_'+this.spudConfig));this.id=id;this.webName=webName;this._initProperties(properties,urlArgs);this.setQueryString(this._getEmbedArguments(),urlArgs);this.firstFetch=true;this.parentDiv=$Trumba.$(id);try{this.parentDiv.innerHTML="<div></div>";}catch(e){this._fixDivInsideInline();}
if(true===this.getProperty("divContainer"))
this.container=new $Trumba.Spuds.DivContainer(this.parentDiv,this);else
this.container=new $Trumba.Spuds.IFrameContainer(this.parentDiv,this);this.container.addEventListener("onFetched",this.onFetched.$trumba_bind(this));if(this.getProperty("position")!=null){new $Trumba.Spuds.PopUpBehavior(this,this.getProperty("closeOnFocus"),this.getProperty("closeOnFocus"));}
$Trumba.logger.info(this.getUniqueID()+" Created for "+webName+"/"+spudType+" "+this.queryString.toString());},_initProperties:function(properties,urlArgs){this.properties=properties||{};var cookie=new $Trumba.Spuds.CalendarCookie(document,this.webName);cookie.load();var overrides=cookie.getAllSpudProperties(this.spudType+this.spudConfigSuffix);$Trumba.Class.extend(this.properties,overrides);if(urlArgs.objecttype)
this.properties.ignoreCookie=true;if(urlArgs.preview)
this.properties.ignoreCookie=true;if(this.getProperty('ignoreCookie'))
return;overrides=cookie.getAllSpudProperties('*'+this.spudConfigSuffix);for(var n in overrides){if(0==n.indexOf("url."))
urlArgs[n.substring(4)]=overrides[n];else
this.properties[n]=overrides[n];}},getPermalink:function(){var win=this.container.getWindow();if(win){var doc=win.document;if(doc){var permaLink=doc.getElementById("permaLink");if(permaLink&&permaLink.childNodes&&permaLink.childNodes.length>0&&permaLink.childNodes[0].href){return permaLink.childNodes[0].href;}}}
return window.top.location.href;},getEventSummary:function(){var win=this.container.getWindow();if(win&&win.eventSummary)
return win.eventSummary;return null;},setTitle:function(spudTitle){if(typeof(this.container.iframe)!="undefined"&&this.container.iframe!=null)
this.container.iframe.setAttribute("title",spudTitle);},setSpudCookieProperty:function(name,value){var cookie=new $Trumba.Spuds.CalendarCookie(document,this.webName);cookie.load();cookie.setSpudProperty(/^url\./i.test(name)?'*':this.spudType+this.spudConfigSuffix,name,value);cookie.save();},close:function(){if(this.closed){$Trumba.logger.info("ALREADY CLOSED:"+this.queryString.toString());return;}
$Trumba.logger.info("Closing Spud:"+this.queryString.toString());this._hideBusyImage();this.closed=true;this._fireEvent("close");this.container.close();$Trumba.Spuds.controller.removeSpud(this);},_fixDivInsideInline:function(){$Trumba.logger.warning("Spud container embedded in a "+this.parentDiv.parentNode.tagName.toUpperCase(),null,"$Trumba.Spuds.SimpleSpud","_fixDivInsideInline");var container=$Trumba.DOM.createElement("div",[["id",""+Math.random()]]);var parent=this.parentDiv.parentNode;var done=false;while(!done&&parent){var testCon=parent.parentNode.insertBefore(container,parent.nextSibling);try{testCon.innerHTML="<div></div>";done=true;}catch(e2){if(/BODY/i.test(parent.tagName))
parent==null
else
parent=parent.parentNode;}}
if(!done){var msg="We're sorry but you have placed your Trumba Spud inside of a "+
parent.tagName.toUpperCase()+" element which is not supported.  You must place it inside of a DIV.";alert(msg);throw msg;}
this.id=container.id;this.parentDiv=$Trumba.$(this.id);},onFetched:function(){var resize=false;var win=this.container.getWindow();var doc=win?win.document:null;if(win&&win.trumba_addStyleRules){var rules=this.getProperty("styleRules");if(rules&&rules.length){win.trumba_addStyleRules(rules);resize=true;}}
if(win&&doc){var sheets=this.getProperty("styleSheets");if(sheets&&sheets.length){var parent=doc.getElementsByTagName("head")[0];for(var i=0;i<sheets.length;i++){var link=doc.createElement("link");link.setAttribute("href",sheets[i]);link.setAttribute("rel","stylesheet");parent.appendChild(link);}
doc.body.style.visibility="visible";}}
if(resize)
this.resize();},onSpudLoaded:function(){this.container.onSpudLoaded();},_getEmbedArguments:function(){var qs1=new $Trumba.Net.QueryString(location.search);var qs=qs1.getAt("trumbaEmbed");if(qs==null||qs.length==1)
return null;if(qs[1]=='view=event'){var qsid=qs1.getAt("eventid");if(qsid!=null&&qs.length>1)
qs[1]+='&eventid='+qsid[1];}
return new $Trumba.Net.QueryString(qs[1]);},getProperty:function(name){var result=this.properties[name];if(typeof(result)=="undefined")result=null;return result;},setProperty:function(name,value){this.properties[name]=value;},getIFrameId:function(){if(this.container._getIFrameId)
return this.container._getIFrameId();return window.name;},resize:function(){this.container.resize();},getQueryString:function(){return this.queryString.toString();},setQueryString:function(queryString,urlArgs){var qs;if(urlArgs!=null){if(this.getProperty('lateAdd')){qs=new $Trumba.Net.QueryString(queryString);for(var name in urlArgs){qs.setAt(name,urlArgs[name]);}}
else{qs=new $Trumba.Net.QueryString();for(var name in urlArgs){qs.setAt(name,urlArgs[name]);}
qs.insert(new $Trumba.Net.QueryString(queryString));}}
else{qs=new $Trumba.Net.QueryString(queryString);}
qs.setAt("calendar",this.webName);qs.setAt("widget",this.spudType);if(this.spudConfig=='')
qs.removeAt("spudConfig",this.spudConfig);else
qs.setAt("spudConfig",this.spudConfig);this.queryString=qs;},refresh:function(){this._fetchHTML();},navigate:function(url,absolute,baseUrl){var savedBaseUrl=baseUrl;baseUrl=this.getProperty(baseUrl);if(absolute){$Trumba.logger.info(this.getUniqueID()+" abs navigate("+url+")");window.top.location.href=url;}
else if(baseUrl&&baseUrl.length){$Trumba.logger.info(this.getUniqueID()+" base navigate("+baseUrl+" -- "+url+")");var savedQueryString=this.queryString;this._mergeQueryString(url,true);var gotoUrl=new $Trumba.Net.Url(baseUrl);var openInNewWindow=this.getProperty("openInNewWindow");if("detailBase"==savedBaseUrl&&!openInNewWindow){var permissionCheck=null;try{permissionCheck=window.top.location.href;}
catch(ex){}
if(permissionCheck){var tempQueryString=new $Trumba.Net.QueryString(url);var returnUrl=new $Trumba.Net.Url(window.top.location);tempQueryString.setAt("returnUrl",returnUrl.toString());url=tempQueryString.toString();}}
if(url!="")
gotoUrl.getQueryString().setAt("trumbaEmbed",url);if(openInNewWindow){var closeWindowOnReturn=this.getProperty("closeWindowOnReturn");if(!closeWindowOnReturn||closeWindowOnReturn=="true")
gotoUrl.getQueryString().setAt("winClose","1");try{var newWin=window.open(gotoUrl.toString(),"trumbaNewWin");newWin.focus();}catch(ex){}}
else{try{window.top.location.href=gotoUrl.toString();}
catch(e){window.top.location=gotoUrl.toString();}}}
else{$Trumba.logger.info(this.getUniqueID()+" rel navigate("+url+")");this.ignoreNav=true;$Trumba.Spuds.controller._navigate(url);if(this.closed)return;this._fetchHTML(new $Trumba.Net.QueryString(url),true);$Trumba.Spuds.controller.historyIndex=this.queryHistory.length-1;if(this.getProperty("scrollTopOnNav"))
window.scrollTo(0,0);}},getUniqueID:function(){return"("+this.id+"-"+this.spudType+")";},onNavigate:function(queryString){$Trumba.logger.info(this.getUniqueID()+" onNavigate("+queryString+")");if(this.getProperty("closeOnNav")){this.close();return;}
if(this.ignoreNav){this.ignoreNav=false;return;}
this._fetchHTML(queryString,false);},onNavigateBack:function(){this._navigate(this.removeHistoryQueryString(),false);},onNavigateHistory:function(index){this._navigate(this.getHistoryQueryString(index),true);},_navigate:function(qs,navigateHistory){if(qs!=null){var qsEqual=this._compareQueryString(qs);this.setQueryString(qs);if(!qsEqual)
this._fetchHTML(null,false,navigateHistory);}},_mergeQueryString:function(queryString,ignoreRemoveList,ignoreYankList){ignoreRemoveList=ignoreRemoveList||false;ignoreYankList=ignoreYankList||false;var a=new $Trumba.Net.QueryString(this.queryString);var b=new $Trumba.Net.QueryString(queryString);var transientParams=$Trumba.Spuds.TransientParams.getParams(this.spudType);if(!ignoreYankList){var yankList=[];if(transientParams!=null){a.visit(function(name){if(transientParams[name])
yankList.push(name);});}
for(var i=0;i<yankList.length;i++)
a.remove(yankList[i]);}
for(var i=0;i<b.length();i++){var item=b.getAt(i);var remove=(item[0].charAt(0)=='-')||(($Trumba.Spuds.removeList[item[0]]!=null&&!ignoreRemoveList)&&(transientParams==null||transientParams[item[0]]==null));if(remove){if(item[0].charAt(0)=='-')
a.remove(item[0].substring(1));else
a.remove(item[0]);}
else
a.setAt(item[0],item[1])}
var objectTypeArg=b.getAt("objecttype");if(!objectTypeArg){var objectTypeProp=this.getProperty("objectType");if(objectTypeProp)
a.setAt("objecttype",objectTypeProp);}
var save=new $Trumba.Net.QueryString(this.queryString);this.setQueryString(a);a=save;b=new $Trumba.Net.QueryString(this.queryString);var diff={};for(var i=0;i<a.length();i++){var itema=a.getAt(i);var itembIndex=b.findByName(itema[0]);var itemb=itembIndex!=-1?b.getAt(itembIndex):null;if(itemb!=null){var valuesSame;if(this.spudType=="datefinder"&&itema[0]=="date")
valuesSame=itema[1].substring(0,6)==itemb[1].substring(0,6);else
valuesSame=itema[1]==itemb[1];if(!valuesSame)
diff[itema[0]]={from:itema[1],to:itemb[1]};}
else
diff[itema[0]]={from:itema[1],to:null};b.removeAt(itembIndex);}
for(var i=0;i<b.length();i++){var itemb=b.getAt(i);if(this.spudType=="datefinder"&&itemb[0]=="date"&&this.pageDate.substring(0,6)==itemb[1].substring(0,6))
continue;diff[itemb[0]]={from:null,to:itemb[1]};}
var same=false;diff["widget"]=null
delete diff["widget"];if(typeof(this.argList)!="undefined"){same=true;for(var n in diff){if(typeof(this.argList[n])!="undefined"){same=false;if(!ignoreRemoveList){var values=diff[n];this._fireEvent("onArgumentChanged",{name:n,oldValue:values.from,newValue:values.to});}}}}
else if(!ignoreRemoveList){for(var n in diff){var values=diff[n];this._fireEvent("onArgumentChanged",{name:n,oldValue:values.from,newValue:values.to});}}
return same;},_compareQueryString:function(qs){if(!qs.pairs)
return false;if(typeof(this.argList)!="undefined"){for(var arg in this.argList){var v1=this.queryString.getAt(arg);var v2=qs.getAt(arg);v1=v1==null?"":v1[1];v2=v2==null?"":v2[1];if(v1!=v2)
return false;}
return true;}
return false;},addHistoryQueryString:function(queryString,firstFetch,historyNavigate){firstFetch=firstFetch||false;historyNavigate=historyNavigate||false;if(!this.queryHistory)
this.queryHistory=[];if(!historyNavigate){var c=$Trumba.Spuds.controller;if(typeof(c.historyIndex)!="undefined"&&(c.historyIndex+1)<this.queryHistory.length)
this.queryHistory.length=c.historyIndex+1;this.queryHistory.push(new $Trumba.Net.QueryString(queryString));var newValue="/?i="+(this.queryHistory.length-1).toString();if(c.supportsHistory&&!firstFetch&&newValue!=SWFAddress.getValue()){SWFAddress.setValue(newValue);}}},removeHistoryQueryString:function(){if(this.queryHistory&&this.queryHistory.length>0){this.queryHistory.pop();return this.queryHistory.pop();}
return null;},getHistoryQueryString:function(index){if(this.queryHistory&&this.queryHistory.length>index)
return this.queryHistory[index];return null;},_fetchHTML:function(queryString,selfNavigate,historyNavigate){selfNavigate=selfNavigate||false;historyNavigate=historyNavigate||false;var firstFetch=this.firstFetch;if(this.firstFetch){this.firstFetch=false;}
else if(queryString){var same=this._mergeQueryString(queryString,false,selfNavigate);if(this.getProperty("noAsyncNav")){var search=new $Trumba.Net.QueryString(window.location.search);search.setAt("trumbaEmbed",this.getQueryString());window.location.search='?'+search.toString();}
if(same){this.addHistoryQueryString(this.queryString,firstFetch,historyNavigate);return;}}
this.addHistoryQueryString(this.queryString,firstFetch,historyNavigate);var qs=new $Trumba.Net.QueryString(this.queryString);var sheets=this.getProperty("styleSheets");if(sheets&&sheets.length){qs.setAt("ssOverrides",1);}
var handler=this.getProperty("navigateHandler");if(!firstFetch&&handler&&typeof handler=="function"){if(handler(qs,selfNavigate))
return;}
var spudPosition=this.getProperty("position");if(this.container._loaded||spudPosition!=null){if(spudPosition!=null)
this._showBusyImage(spudPosition);else{var spudLocation=this.container.getLocation();var busyImageOffsetTop=this.getProperty("busyImageOffsetTop");if(busyImageOffsetTop){spudLocation.top+=busyImageOffsetTop;this.setProperty("busyImageOffsetTop",null);}
this._showBusyImage(spudLocation);}}
this.container.fetch(qs);},_setLoadingHTML:function(){var bgcolor="";try{if(this.parentDiv.currentStyle){var div=this.parentDiv;while(div&&div.currentStyle){bgcolor=div.currentStyle.backgroundColor;if(bgcolor=="transparent")
div=div.parentNode;else
break;}}
else if(window.getComputedStyle)
bgcolor=window.getComputedStyle(this.parentDiv,null).backgroundColor;}catch(e){$Trumba.logger.error("RIP getting background color!",e,"$Trumba.Spuds.SimpleSpud","_setLoadingHTML");}
if(bgcolor.length)
bgcolor=$Trumba.String.format("background-color:{0};",bgcolor)
var html=$Trumba.String.format('<div style="{0}margin:0px;padding:0px;font-size:0.8em;font-family:Arial, Helvetica, Verdana;font-style:italic;"><img src="',bgcolor)+
$Trumba.baseUri+'images/spinner.gif">&nbsp;&nbsp;Loading&nbsp;.&nbsp;.&nbsp;.</div>';this.container.setHTML(html,true);this.container.resize();},_getBusyImageId:function(){return this.id+".busy";},_showBusyImage:function(pos){var hideBusyImage=this.getProperty("hideBusyImage")||false;if(!hideBusyImage){var imgLoading=$Trumba.DOM.createElement("img",[["id",this._getBusyImageId()]]);imgLoading.style.position="absolute";imgLoading.style.left=pos.left+"px";imgLoading.style.top=pos.top+"px";imgLoading.style.zIndex=100000;imgLoading.src=$Trumba.busyImageUri;document.body.appendChild(imgLoading);$Trumba.logger.info(this._getBusyImageId()+", parent:"+imgLoading.parentNode.tagName,null,"$Trumba.Spuds.SimpleSpud","_showBusyImage");}},_hideBusyImage:function(){var imgLoading=$Trumba.$(this._getBusyImageId());if(imgLoading){$Trumba.logger.info(this._getBusyImageId()+", parent:"+imgLoading.parentNode.tagName,null,"$Trumba.Spuds.SimpleSpud","_hideBusyImage");imgLoading.parentNode.removeChild(imgLoading);}}}
$Trumba.Class.extend($Trumba.Spuds.SimpleSpud.prototype,$Trumba.EventSource);$Trumba.Spuds.PopUpBehavior=$Trumba.Class.create();$Trumba.Spuds.PopUpBehavior.prototype={initialize:function(spud,closeOnEscape,closeOnLostFocus){this._spud=spud;if(closeOnEscape){this._makeKeyHandler(window.document);var spuds=$Trumba.Spuds.controller.getSpuds();for(var i=0;i<spuds.length;i++){this._makeKeyHandler(spuds[i].container.getWindow().document);}}
if(closeOnLostFocus){this._makeClickHandler(window.document);var spuds=$Trumba.Spuds.controller.getSpuds();for(var i=0;i<spuds.length;i++){if(spuds[i]==spud)continue;this._makeClickHandler(spuds[i].container.getWindow().document);}}},_makeKeyHandler:function(element){this._makeHandler(element,"keypress",function(e){if($Trumba.Event.keyCode(e)==$Trumba.Event.KEY_ESC){this.spud.close();this.stop(true);}},false);},_makeClickHandler:function(element){this._makeHandler(element,"click",function(e){this.spud.close();this.stopObserving();},false);},_makeHandler:function(element,name,observer,capture){var args=$Trumba.$A(arguments);args.shift();args.shift();args.shift();args.shift();var o={onEvent:function(e){this._event=e||window.event;args=[];args.push(this._event);return this.observer.apply(this,args.concat(this.args));},stop:function(stopObserving){$Trumba.Event.stop(this._event);if(stopObserving)
this.stopObserving();},stopObserving:function(){$Trumba.Event.stopObserving(this.element,this.name,this.boundObserver,this.capture);},element:element,name:name,observer:observer,capture:capture,boundObserver:null,args:args};this._spud.addEventListener("close",o.stopObserving.$trumba_bind(o));o.spud=this._spud;o.boundObserver=o.onEvent.$trumba_bind(o);$Trumba.Event.observe(o.element,o.name,o.boundObserver,o.capture);}};$Trumba.Spuds.CalendarCookie=$Trumba.Class.create();$Trumba.Spuds.CalendarCookie.prototype={_cookieLifeTimeHours:8760,getSpudProperty:function(spudType,name){return this[spudType+"_"+name];},getAllSpudProperties:function(spudType){var result={};var prefix=spudType+'_';var len=prefix.length;for(var prop in this){if(prop.indexOf(prefix)==0)
result[prop.substring(len)]=this[prop];}
return result;},setSpudProperty:function(spudType,name,value){this[spudType+"_"+name]=value;}}
$Trumba.Class.extend($Trumba.Spuds.CalendarCookie.prototype,$Trumba.Net.Cookie.prototype);$Trumba.Spuds.CalendarCookie.prototype.base_initialize=$Trumba.Spuds.CalendarCookie.prototype.initialize;$Trumba.Spuds.CalendarCookie.prototype.initialize=function(doc,calendar){this.base_initialize(doc,"spudCookie_"+calendar,this._cookieLifeTimeHours);}
$Trumba.Spuds.Cache=$Trumba.Class.create();$Trumba.Spuds.Cache.prototype={initialize:function(lifetime){this._cache={};this._lifetime=lifetime>=0?lifetime:(10*60*1000);},empty:function(){this._cache={};},getItem:function(key){var item=this._cache[key];if(item){if(item.expires>new Date())
return item.value;this.removeItem(key);}
return null;},addItem:function(key,value){this._cache[key]={expires:new Date()-0+this._lifetime,value:value};},removeItem:function(key){if(this._cache[key]){this._cache[key]=null;delete this._cache[key];}}}
$Trumba.Spuds.Loader=$Trumba.Class.create();$Trumba.Spuds.Loader.prototype={initialize:function(){this._nextDomain=0;this._domains=['','a.','b.','c.'];this._domainMap={};this._cache=new $Trumba.Spuds.Cache(10*60*1000);this._requests={};},_queueRequest:function(request,options){if(options.replace&&request.id){var pending=this._requests[request.id];if(pending){$Trumba.logger.info("Replacing pending request for Spud "+request.id);pending.cancel();this._removeFromQueue(request.id);}}
if(request.delay<=0){request.execute();return;}
if(request.id){$Trumba.logger.info("Queueing request for Spud "+request.id);this._requests[request.id]=request;request.onComplete=this._removeFromQueue.$trumba_bind(this,request.id);}},_removeFromQueue:function(id){$Trumba.logger.info("Removing request for Spud "+id);this._requests[id]=null;delete this._requests[id];},_setDomain:function(url){var m=/http:\/\/(qa|webstage|dev|www)\.trumba\.com/i.exec(url)
if(!m)m=/http:\/\/(www)\.addtomycalendar\.com/i.exec(url)
if(!m)m=/http:\/\/(qatrumbaweb)\.unival\.com/i.exec(url)
if(!m){return url;}
var r=new RegExp('//'+m[1]+'.','i');url=url.replace(r,'//'+this._domains[this._nextDomain]+m[1]+'.');this._nextDomain++;this._nextDomain%=this._domains.length;return url;},_getSpudUrl:function(queryString){var url;if(queryString.indexOf("preview=")!=-1)
url=$Trumba.loaderUri;else{url=this._domainMap[queryString];if(!url){url=this._setDomain($Trumba.loaderUri)
this._domainMap[queryString]=url;}}
return url+"?"+queryString;},_onSuccess:function(queryString,cb,result){$Trumba.logger.info("Caching "+queryString);this._cache.addItem(queryString,result);cb(result);},request:function(queryString,callbacks,options){options=$Trumba.Class.extend({id:null,replace:true,delay:0.001,cache:false},options||{});var url=this._getSpudUrl(queryString);$Trumba.logger.info("Loading "+url,null,"$Trumba.Spuds.Loader","request");if(options.cache){var hit=this._domainMap[queryString];var value=this._cache.getItem(queryString);if(hit&&value){$Trumba.logger.info("CACHE HIT : "+queryString);callbacks.onSuccess(value);return;}
if(hit){var cb=callbacks.onSuccess;callbacks.onSuccess=this._onSuccess.$trumba_bind(this,queryString,cb)}}
this._queueRequest(new $Trumba.Spuds.Loader.Request(url,callbacks,options),options);}}
$Trumba.Spuds.Loader.Request=$Trumba.Class.create();$Trumba.Spuds.Loader.Request.prototype={initialize:function(url,callbacks,options){this._oldOnSuccess=callbacks.onSuccess;callbacks.onSuccess=this._onSuccess.$trumba_bind(this)
this.id=options.id;this._url=url;this._callbacks=callbacks;this._cancelled=false;if(options.delay>0)
this._timer=window.setTimeout(this.execute.$trumba_bind(this),options.delay*1000);},_onSuccess:function(){if(this._cancelled){$Trumba.logger.warning("Ignoring Dead Spud Request "+this.id);return;}
$Trumba.logger.warning("Data Received for Spud Request "+this.id);if(this.onComplete)
this.onComplete();this._oldOnSuccess.apply(this,arguments);},cancel:function(){$Trumba.logger.warning("Cancelling Spud Request "+this.id);this._cancelled=true;window.clearTimeout(this._timer);},execute:function(){if(this._cancelled)
return;$Trumba.logger.info("Executing Spud Request "+this.id);var sxhr=new $Trumba.ScriptXmlHttpRequest(this._url,this._callbacks);sxhr.invoke();}};$Trumba.Spuds.PageController=$Trumba.Class.create();$Trumba.Spuds.PageController.prototype={initialize:function(){this.spuds={};this.historyIndex=0;this.loader=new $Trumba.Spuds.Loader();$Trumba.Event.observe(window,'unload',this.onPageUnload.$trumba_bind(this),false);var con=this;$Trumba.Event.observe(window,'resize',function(){con.resize();},false);if(/msie/i.test(navigator.userAgent)&&(typeof(window.opera)=="undefined")){this.resizeTimeoutTicks=0;this.resizeTimeoutId=window.setInterval(this.onResizeTimeout.$trumba_bind(this),1000);}},getHostWindow:function(){return window;},getSpudById:function(spudId){return this.spuds[spudId];},addHead:function(tag,attrs){var heads=document.getElementsByTagName("head");if(heads.length){var e=$Trumba.DOM.createElement(tag,attrs);$Trumba.DOM.appendChild(e,heads[0]);}},onResizeTimeout:function(){this.resizeTimeoutTicks++;if(this.resizeTimeoutTicks>15){$Trumba.logger.info("Killing timer.");window.clearInterval(this.resizeTimeoutId);this.resizeTimeoutId=null;return;}
this.resize();},onPageUnload:function(){if(this.resizeTimeoutId!=null){window.clearInterval(this.resizeTimeoutId);this.resizeTimeoutId=null;}
$Trumba.Event.unloadCache();this._fireEvent("unload");},_navigate:function(url){if(typeof(url)=="string")
url=new $Trumba.Net.QueryString(url);this._fireEvent("navigate",url);for(var s in this.spuds){if(this.spuds[s].onNavigate)
this.spuds[s].onNavigate(url);}},navigate:function(url){this._navigate(url);for(var s in this.spuds){this.historyIndex=this.spuds[s].queryHistory.length-1;break;}},navigateBack:function(){if(window.location.hash==""||window.location.hash=="#"){var qs=new $Trumba.Net.QueryString(window.location.search);if(qs.getAt("winClose")){try{window.opener.focus();}catch(e){}
try{window.close();}catch(e){}
return;}
var arg=qs.getAt("trumbaEmbed");if(arg&&arg[1]){qs=new $Trumba.Net.QueryString(arg[1]);arg=qs.getAt("returnUrl");}
if(arg&&arg[1]){try{SWFAddress.back();}
catch(e){window.top.location.href=arg[1];}
return;}}
if(this.historyIndex==0){$Trumba.Spuds.controller.navigate('-view=&-eventid=&-parenteventid=&-seriesid=&-objectid=&-childview=');}
else{if(this.supportsHistory)
SWFAddress.back();else{for(var s in this.spuds){if(this.spuds[s].onNavigateBack)
this.spuds[s].onNavigateBack();}}}},navigateHistory:function(swfEvent){if(swfEvent){this.historyIndex=parseInt(swfEvent.parameters["i"]||"0");for(var s in this.spuds){if(this.spuds[s].onNavigateHistory)
this.spuds[s].onNavigateHistory(this.historyIndex);}}},checkSupportsHistory:function(){var usingSubmitHash=(typeof trumbaUsingSubmitHash!="undefined"&&trumbaUsingSubmitHash);var isIE8Mode=(typeof document.documentMode!="undefined"&&document.documentMode>=8);var forceHistoryDisabled=(typeof TrumbaDisableBrowserHistory!="undefined"&&TrumbaDisableBroswerHistory);var isDocDomainOldIE=$Trumba.Spuds.handleDocDomain()&&asual.util.Browser.isMSIE()&&asual.util.Browser.getVersion()<8;this.supportsHistory=(window.location.hash==""||window.location.hash=="#"||/#??\/\?i=\d+/.test(window.location.hash))&&!usingSubmitHash&&!isIE8Mode&&!forceHistoryDisabled&&!isDocDomainOldIE;if(this.supportsHistory){try{SWFAddress.addEventListener(SWFAddressEvent.EXTERNAL_CHANGE,function(swfEvent){$Trumba.Spuds.controller.navigateHistory(swfEvent);});}catch(e){this.supportsHistory=false;}}
if(!this.supportsHistory)
SWFAddress.disable();},disableHistory:function(){SWFAddress.disable();this.supportsHistory=false;},addSpud:function(spud){if(this.spuds[spud.id]==null){this.spuds[spud.id]=spud;spud.refresh();}},removeSpud:function(spud){if(this.spuds[spud.id]!=null){this.spuds[spud.id]=null;delete this.spuds[spud.id];}},getSpud:function(name){for(var s in this.spuds){if(this.spuds[s].getIFrameId&&this.spuds[s].getIFrameId()==name)
return this.spuds[s];}
return null;},getSpuds:function(){var result=[];for(var s in this.spuds){if(this.spuds[s].getIFrameId)
result.push(this.spuds[s]);}
return result;},refresh:function(){for(var s in this.spuds){if(this.spuds[s].refresh)
this.spuds[s].refresh();}},resize:function(){var i=0;for(var s in this.spuds){if(this.spuds[s].resize)
this.spuds[s].resize();}},findSpud:function(property,value){var spuds=this.getSpuds();for(var i=0;i<spuds.length;i++){var spudValue=spuds[i].getProperty(property);if(spudValue&&spudValue==value)
return spuds[i];}
return null;},promptForPassword:function(url){$Trumba.logger.error("Prompting!");var con=this;$Trumba.Event.observe(window,"focus",function(){$Trumba.logger.error("Focus!");$Trumba.Event.stopObserving(window,"focus",arguments.callee,false);con.refresh()},false);window.open(url,"trumba_embedLogin","width=750,height=325,scrollbars=1,status=1,resizable=yes,toolbar=no,menubar=no");}}
$Trumba.Class.extend($Trumba.Spuds.PageController.prototype,$Trumba.EventSource);$Trumba.Spuds.controller=new $Trumba.Spuds.PageController();$Trumba.Spuds.controller.baseUri=$Trumba.baseUri;function SizeTrumbaFrame(iframeName){}
$Trumba.ScriptXmlHttpRequest=$Trumba.Class.create();$Trumba.ScriptXmlHttpRequest.prototype={initialize:function(url,options){this.options=options||{};this.options.timeout=this.options.timeout||60;this.cbid=options.cbid||$Trumba.ScriptXmlHttpRequest.createCBID();this.url=url;var separator=(/\?/.test(this.url)?"&":"?");this.srcUrl=this.url+separator+"srpc.cbid="+this.cbid+"&srpc.get=true";},invoke:function(){window.setTimeout(this.onAsyncInvoke.$trumba_bind(this),1);},onAsyncInvoke:function(){try{this.doGet();}
catch(e){(this.options.onFailure||$Trumba.emptyFunction)(e);}},doGet:function(){this.script=document.createElement("sc"+"ript");this.script.setAttribute("type","text/javascript");$Trumba.ScriptXmlHttpRequest.addCallback(this.cbid,this.srcUrl,this.onComplete.$trumba_bind(this));this.timeoutID=window.setTimeout(this.onTimeout.$trumba_bind(this),this.options.timeout*1000);this.script.setAttribute("src",this.srcUrl);var scriptParent;scriptParent=document.getElementsByTagName("head")[0];scriptParent.appendChild(this.script);},cleanup:function(){if(this.script.parentNode!=null){this.script.parentNode.removeChild(this.script);}},onTimeout:function(){this.cleanup();(this.options.onTimeout||$Trumba.emptyFunction)();},onComplete:function(result){window.clearTimeout(this.timeoutID);var cu=this.cleanup.$trumba_bind(this);var r=result;var cb=(this.options.onSuccess||$Trumba.emptyFunction);window.setTimeout(function(){cu();cb(r);},1);}}
if(/(Safari\/)(\d+)/i.test(navigator.userAgent)&&parseFloat(/(Safari\/)(\d+)/i.exec(navigator.userAgent)[2])<=312){$Trumba.Class.extend($Trumba.ScriptXmlHttpRequest.prototype,{cleanup:function(){this.innerIFRAME.parentNode.removeChild(this.innerIFRAME);},doGet:function(){var html='<'+'html><'+'head><'+'script type="text/javascript">'+'\r\n'+'window["$Trumba"] = { };\r\n'+'$Trumba["ScriptXmlHttpRequest"] = { };\r\n'+'$Trumba.ScriptXmlHttpRequest.requestComplete = function(result) {'+'window.parent.$Trumba.ScriptXmlHttpRequest.requestComplete(result); }\r\n'+'document.write(\'<s\'+\'cript type="text/javascript" src="'+this.srcUrl+'"><\'+\'/script>\');\r\n'+'<'+'/script>\r\n<'+'/head>\r\n<'+'body><'+'/body>\r\n<'+'/html>\r\n';var pThis=this;var tryAppend=function(){if(document.body==null){window.setTimeout(arguments.callee.$trumba_bind(this),100);return;}
$Trumba.ScriptXmlHttpRequest.addCallback(pThis.cbid,pThis.srcUrl,pThis.onComplete.$trumba_bind(pThis));pThis.timeoutID=window.setTimeout(pThis.onTimeout.$trumba_bind(pThis),pThis.options.timeout*1000);var iframe=$Trumba.Spuds.createIFrame(pThis.cbid=".iframe","width:0px;height:0px;visibility:hidden;");pThis.innerIFRAME=document.body.appendChild(iframe);var doc;if(pThis.innerIFRAME.contentWindow)
doc=pThis.innerIFRAME.contentWindow.document;else
doc=window.frames[pThis.innerIFRAME.name].document;doc.write(html);doc.close();}
tryAppend();}});}
$Trumba.Class.extend($Trumba.ScriptXmlHttpRequest,{rpcID:0,rpcGUID:""+Math.random(),callbacks:{},requestComplete:function(result){result=eval(result);var cb=$Trumba.ScriptXmlHttpRequest.getCallback(result.cbid,result.url);if(cb==null){$Trumba.logger.error("No callback found for result "+result.cbid+":"+result.url,null,null,"$Trumba.ScriptXmlHttpRequest.requestComplete");return;}
$Trumba.ScriptXmlHttpRequest._removeCallback(result.cbid,result.url);cb(result);},getCallback:function(cbid,url){var lookupId=cbid+":"+url;var cb=this.callbacks[lookupId];if(cb&&typeof(cb.queue)!="undefined"){$Trumba.logger.info("Found "+cb.length+" callbacks.");return cb[0];}
return cb;},addCallback:function(cbid,url,cb){var lookupId=cbid+":"+url;if(this.callbacks[lookupId]){if(typeof(this.callbacks[lookupId].queue)=="undefined"){this.callbacks[lookupId]=[this.callbacks[lookupId],cb];this.callbacks[lookupId].queue=true;}
else{this.callbacks[lookupId].push(cb);}
return;}
this.callbacks[lookupId]=cb;},_removeCallback:function(cbid,url){var lookupId=cbid+":"+url;if(this.callbacks[lookupId]){if(this.callbacks[lookupId].queue){$Trumba.Array.shift(this.callbacks[lookupId]);if(this.callbacks[lookupId].length==0)
delete this.callbacks[lookupId];return;}
this.callbacks[lookupId]=null;delete this.callbacks[lookupId];}},createCBID:function(){var result=this.rpcGUID;result+="-"+this.rpcID++;return result;}});$Trumba.PostXmlHttpRequest=$Trumba.Class.create();$Trumba.PostXmlHttpRequest.prototype={initialize:function(url,options,postdata){this.options=options||{};this.options.timeout=this.options.timeout||60;this.postdata=postdata;this.cbid=$Trumba.ScriptXmlHttpRequest.createCBID();this.url=url;var separator=(/\?/.test(this.url)?"&":"?");this.srcUrl=this.url+separator+"srpc.cbid="+this.cbid+"&srpc.post=true";},invoke:function(){window.setTimeout(this.onAsyncInvoke.$trumba_bind(this),1);},onAsyncInvoke:function(){try{this.doPost();this.doGet();}
catch(e){(this.options.onFailure||$Trumba.emptyFunction)(e);}},getIFrameDocument:function(iframe){if(iframe.contentDocument)
return iframe.contentDocument;else if(iframe.contentWindow)
return iframe.contentWindow.document;else if(iframe.document)
return iframe.document;return null;},doPost:function(){this.iframe=document.createElement("iframe");var id='cbirame'+this.cbid;this.iframe.setAttribute('id',id);this.iframe.style.border='0px';this.iframe.style.width='0px';this.iframe.style.height='0px';this.iframe=document.body.appendChild(this.iframe);var doc=this.getIFrameDocument(this.iframe);doc.write('\<html\>\<body\>\<form method="post"\>\<\/form\>\<\/body\>\<\/html\>');var form=doc.getElementsByTagName("form")[0];form.action=this.srcUrl;for(var data in this.postdata){var input=doc.createElement("input");input.name=data;input.type="hidden";input.value=this.postdata[data];form.appendChild(input);}
this.timeoutID=window.setTimeout(this.onTimeout.$trumba_bind(this),(this.options.timeout||15)*1000);$Trumba.ScriptXmlHttpRequest.addCallback(this.cbid,this.srcUrl,this.onComplete.$trumba_bind(this));form.submit();},curDelay:0,delays:[1,1,2,3,5,8,13,21,34,55,89,144],doGet:function(){var options={onSuccess:this.getOnSuccess.$trumba_bind(this),onFailure:this.getOnFailure.$trumba_bind(this),onTimeout:this.onTimeout.$trumba_bind(this),timeout:this.options.timeout}
var url=this.url+"&srpc.origcbid="+this.cbid;var srpc=new $Trumba.ScriptXmlHttpRequest(url,options,null);srpc.invoke();},getOnFailure:function(){(this.options.onFailure||$Trumba.emptyFunction())();},getOnSuccess:function(result){if(result==null){if(this.timedOut){return;}
window.setTimeout(this.doGet.$trumba_bind(this),this.delays[this.curDelay++]*1000);return;}
eval(result);},cleanup:function(){if(typeof(this.iframe)!="undefined")
this.iframe.parentNode.removeChild(this.iframe);},onTimeout:function(){window.clearTimeout(this.timeoutID);this.timedOut=true;this.cleanup();(this.options.onTimeout||$Trumba.emptyFunction)();},onComplete:function(result){window.clearTimeout(this.timeoutID);var cu=this.cleanup.$trumba_bind(this);var r=result;var cb=(this.options.onSuccess||$Trumba.emptyFunction);window.setTimeout(function(){cu();cb(r);},1);}}
if(typeof(trumba_preSpudsJS)!="undefined"){$Trumba.logger.warning($Trumba.String.format("spuds.js took {0} seconds to download.",($Trumba.loadTime-trumba_preSpudsJS)/1000));}
for(var i=0;i<$Trumba.prologQueue.length;i++)
$Trumba.prologQueue[i]();$Trumba.prologQueue=[];$Trumba.Spuds.controller.checkSupportsHistory();}