// JavaScript Document
;(function($,obj,config){
	var modelArry={};//class
	var idArry={};//obj
	function get(target,id,name,fn){
		function runObj(){
			if(idArry[id]){
				fn(idArry[id]);
				}else{
				idArry[id]=	new modelArry[name].fn(target);
				if((modelArry[name].html.length||modelArry[name].css.length)&&(!(modelArry[name].htmlArry.length||modelArry[name].cssArry.length))){
					var count=0;
				$.each(modelArry[name],function(i,n){
					
					});
					}
				
				
				fn(idArry[id]);
					}
			}
		if(modelArry[name]){
			runObj();
			}else{
				config.loadingOn();
				$.ajax({ 
							url:"model/"+name+".js",
							dataType:"script",
							cache:true,
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								window.location.hash="";
								},
							success: function(data){
								config.loadingOff();
								runObj();								
							}
						});	
				}
		};
	function set(data){
		modelArry[data.name]=data;
		};
	function changePage(){
		var hash="index";
		if(location.hash){
			hash=location.hash.replace("#","");
			}
		var hashArry=hash.split("/");
		function runRoute(){	
				var dataObj={};
				if(routeArry[hashArry[0]].par){
					var dataArry=routeArry[hashArry[0]].par.split("/");
					for(var i=0;i<dataArry.length;i++){
				dataObj[dataArry[i]]=hashArry[i+1];
				}
					}
				routeArry[hashArry[0]].fn(dataObj);	
			}
		if(routeArry[hashArry[0]]){
			runRoute();
			}else{
				config.loadingOn();
				
			
			}
		}
	
	})($,app.model,config);