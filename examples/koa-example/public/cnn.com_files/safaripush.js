 var safaripushLib = function (param) {

	var userAgent = '7.0 Safari';
	var rootURL = 'https://redalert.cnn.com/push';
	var appNS = 'web.com.cnn.redalert';
	var pushToken = '';
	
	var permGranted = 'granted';
	var permDenied = 'denied';
	var permDefault = 'default';



         	function requestPermissions(clientID, callback) {

         		var clientPermission = permDenied;
         		
	          	window.safari.pushNotification.requestPermission(rootURL, appNS, {"id": clientID}, function(result) {
	          		
	          		clientPermission = result.permission;

		            if(result.permission === permGranted) {
		                console.log("user gratned permission");
		            }
		            else if(result.permission === permDenied) {
		                console.log("permission denied");
		            }
	        	});
		        if(callback) callback(clientPermission);
		     };


		     function checkPermissions(clientID, callback){

		     	//make sure we are in the right browser
		     	if(this.checkEnv()){

			     	//get the current permission state in the browser
			     	var pResult = window.safari.pushNotification.permission(appNS);
			     	var clientPermission = pResult.permission;

			     	if(clientPermission === permDefault) {
			            //request permission from user
			            requestPermissions(clientID, function(clientPermission){

			            	pResult = window.safari.pushNotification.permission(appNS);

			            	var clientResult = {
					        	pushToken : pushToken,
					        	permission : clientPermission,
					        	clientID : clientID
					        }

					        if(callback) callback(clientResult);
			            });

			        }
			        else {
				        
				        if(clientPermission === permGranted) {
				            
				            pushToken = pResult.deviceToken;
				        }
				        else if(clientPermission === permDenied) {
				            pushToken = '';
				        }

				        var clientResult = {
				        	pushToken : pushToken,
				        	permission : clientPermission,
				        	clientID : clientID
			        	}

				        if(callback) callback(clientResult);
				    }
			    }
			    else {
			    	//we are not in safari so nothing here.  Set everything to not going to work
			    	pushToken = null;
			    	clientPermission = permDenied;

			    	var clientResult = {
			        	pushToken : pushToken,
			        	permission : clientPermission,
			        	clientID : clientID
			        }

			        if(callback) callback(clientResult);
			    }
		     };


		     function checkEnv (){
		     	if(window.navigator.userAgent.indexOf(userAgent) > -1){
		     		return true;
		     	}
		     	else {
		     		return false;
		     	}
		     };

		    function currentPermissions(){
		    	if(checkEnv()){
			    	var pResult = window.safari.pushNotification.permission(appNS);

			    	return pResult.permission;
			    }
			    else{
			    	return permDenied;
			    }
		    };

            return{
                requestPermissions:requestPermissions,
                checkPermissions:checkPermissions,
                checkEnv:checkEnv,
                currentPermissions:currentPermissions
            }

}();