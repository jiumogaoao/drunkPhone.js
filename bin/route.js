// JavaScript Document
;(function($,obj,config){
	var routeArry={};
	function changePage(){
		$(".model").hide();
		var hash="index";
		if(location.hash){
			hash=location.hash.replace("#","");
			}
		var hashArry=hash.split("/");
		function runRoute(){	
				var dataObj={
					css:[],
					html:[]
					};
				if(routeArry[hashArry[0]].par){
					var dataArry=routeArry[hashArry[0]].par;
					for(var i=0;i<dataArry.length;i++){
				dataObj[dataArry[i]]=hashArry[i+1];
				}
					}
				var totalCount = 0;
				function finish(){
					totalCount++;
					if(totalCount===(routeArry[hashArry[0]].css.length+routeArry[hashArry[0]].html.length)){
						routeArry[hashArry[0]].fn(dataObj);	
						}
					}
				$.each(routeArry[hashArry[0]].css,function(i,n){
					var num = i;
					config.loadingOn();
					$.ajax({ 
							url:"css/"+n+".css",
							dataType:"text",
							cache:true,
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								window.location.hash="";
								},
							success: function(data){
								dataObj.css[num]='<style>'+data+'</style>';
								finish();
							}
						});
					});
				$.each(routeArry[hashArry[0]].html,function(i,n){
					var num = i;
					config.loadingOn();
					$.ajax({ 
							url:"html/"+n+".html",
							dataType:"html",
							cache:true,
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								window.location.hash="";
								},
							success: function(data){
								dataObj.html[num]=data;
								finish();
							}
						});
					});
				
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