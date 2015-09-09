// JavaScript Document
;(function($,obj,config){
	var routeArry={};
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
				/*if(routeArry[hashArry[0]].tem.length){
					var totalUrl=0;
					var urlArry=[];
					$.each(routeArry[hashArry[0]].tem,function(i,n){
						var urlNum=i;
						config.loadingOn();
						$.ajax({ 
							url:"view/"+n+".html",
							dataType:"html",
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								},
							success: function(data){
								config.loadingOff();								
							urlArry[urlNum]=data;
							totalUrl++;
							if(totalUrl === routeArry[hashArry[0]].tem.length){
								dataObj.tem=urlArry;
								routeArry[hashArry[0]].fn(dataObj);
								}
							}
						});
						});
					}else{
					routeArry[hashArry[0]].fn(dataObj);	
						}*/
			}
		if(routeArry[hashArry[0]]){
			runRoute();
			}else{
				config.loadingOn();
				$.ajax({ 
							url:"control/"+hashArry[0]+".js",
							dataType:"script",
							cache:true,
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								window.location.hash="";
								},
							success: function(data){
								config.loadingOff();								
								runRoute();
							}
						});
			
			}
		}
	window.onhashchange=function(){
		changePage();
		};
	var set=function(data){
		if(data&&data.name){
			routeArry[data.name]={
				par:data.par||"",
				tem:data.tem||[],
				fn:data.fn||function(){}
				};
			}
		};		
		obj.set=function(data){
			set(data);
			};
		obj.init=function(){
			changePage();
			};
	})($,app.route,config);