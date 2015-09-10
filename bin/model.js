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
				if((modelArry[name].html.length||modelArry[name].css.length)&&(!(modelArry[name].htmlArry.length!==modelArry[name].html.length||modelArry[name].cssArry.length!==modelArry[name].css.length))){
					var totalUrl=0;
				function finish(){
					if(totalUrl === modelArry[name].css.length+modelArry[name].html.length){
								idArry[id].html=modelArry[name].htmlArry;
								idArry[id].css=modelArry[name].cssArry;
								idArry[id].hide=function(){$(target).find("#"+id).hide()};
								idArry[id].show=function(){$(target).find("#"+id).show()};
								idArry[id].remove=function(){
									$(target).find("#"+id).remove();
									delete idArry[id];
									};
								fn(idArry[id]);
								}
					};
				$.each(modelArry[name].css,function(i,n){	
						var urlNum=i;
						config.loadingOn();
						$.ajax({ 
							url:"css/"+n+".css",
							dataType:"text",
							cache:true,
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								},
							success: function(data){							
							modelArry[name].cssArry[urlNum]=data;
							totalUrl++;
							finish();
							}
						});
					});
				$.each(modelArry[name].html,function(i,n){	
						var urlNum=i;
						config.loadingOn();
						$.ajax({ 
							url:"view/"+n+".html",
							dataType:"html",
							cache:true,
							error:function(err){
								config.loadingOff();
								alert("错误"+JSON.stringify(err));
								},
							success: function(data){							
							modelArry[name].htmlArry[urlNum]=data;
							totalUrl++;
							finish();
							}
						});
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
		
	})($,app.model,config);