// JavaScript Document
;(function($,obj,config){
	var api={};
	var add=function(name,url,data,method){
		if(!api[name]){
			api[name]={url:url||"",
						data:data||null,
						cache:null,
						method:method||"get",
						cacheTime:0
			};
			return api[name];
			}
		};
	var run=function(name,data,suc,err){
		function runApi(){
			if(!data){
				data=api[name].cacheTime;
				}
			if(data&&typeof(data) === "object"){
				data.time=api[name].cacheTime;
				data=JSON.stringify(data);
				}
				var sendData=$.extend({},api[name].data);
				sendData.data=data;
				config.loadingOn();
			$.ajax({ 
							url:api[name].url,
							dataType:"json",
							method:api[name].method,
							data:sendData,
							error:function(){
								config.loadingOff();
								err();
								},
							success: function(returnData){
								config.loadingOff();
								if(returnData&&returnData.code !== 0){
									if(returnData.code === 1){
										api[name].cache=returnData.data;
										api[name].cacheTime=returnData.time;
										}
									if(typeof(api[name].cache) === "object"){
										suc($.extend({},api[name].cache));
										}else{
											suc(api[name].cache);
											}
									
								}else{
									err();
									}
								}
						});	
			}
		if(api[name]){
			runApi();
			}else{
				config.loadingOn();
				$.ajax({ 
							url:"api/"+name+".js",
							dataType:"script",
							cache:true,
							error:function(err){
								config.loadingOff();
								window.alert("错误"+JSON.stringify(err));
								return false;
								},
							success: function(){
								config.loadingOff();								
								runApi();
							}
						});
				}
		};
	obj.add=function(name,url,data,method){
		add(name,url,data,method);
		};
	obj.run=function(name,data,suc,err){
		run(name,data,suc,err);
		};
	})($,app.api,config);