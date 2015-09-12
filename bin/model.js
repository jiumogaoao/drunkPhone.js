// JavaScript Document
;(function($,obj,config){
	var modelArry={};//class
	var idArry={};//obj
	function get(target,id,name,fn){
		function runObj(){
			function order(target,id){
				idArry[id].target=$('#'+id).appendTo($(target));
				}
			if(idArry[id]){
				if(idArry[id].loaded){
				order(target,id);
				fn(idArry[id]);
				}else{
					if(!idArry[id].callbackArry){
						idArry[id].callbackArry=[];
						}
					idArry[id].callbackArry.push({target:target,id:id,fn:fn});
					}
				}else{
				idArry[id]=	new modelArry[name].fn();
				if((modelArry[name].html.length||modelArry[name].css.length)&&(modelArry[name].htmlArry.length!==modelArry[name].html.length||modelArry[name].cssArry.length!==modelArry[name].css.length)){
					var frame=$('<div class="model" id="'+id+'"></div>').appendTo($(target));
					var totalUrl=0;
				function finish(){
					if(totalUrl === modelArry[name].css.length+modelArry[name].html.length){
								idArry[id].loaded=false;
								idArry[id].name=name;
								idArry[id].target=frame;
								idArry[id].id=id;
								idArry[id].html=modelArry[name].htmlArry;
								idArry[id].css=modelArry[name].cssArry;
								idArry[id].hide=function(){this.target.hide()};
								idArry[id].show=function(){this.target.show();};
								idArry[id].remove=function(){
									$(target).find("#"+id).remove();
									delete idArry[id];
									};
								idArry[id].init();
								idArry[id].loaded=true;
								if(!idArry[id].callbackArry){
									idArry[id].callbackArry=[];
									}
								fn(idArry[id]);
								$.each(idArry[id].callbackArry,function(i,n){
									order(n.target,n.id);
									n.fn(idArry[id]);
									});
								
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
							modelArry[name].cssArry[urlNum]="<style>"+data+"</style>";
							totalUrl++;
							finish();
							}
						});
					});
				$.each(modelArry[name].html,function(i,n){	
						var urlNum=i;
						config.loadingOn();
						$.ajax({ 
							url:"html/"+n+".html",
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
					}else{
						fn(idArry[id]);
						}
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
		modelArry[data.name].htmlArry=[];
		modelArry[data.name].cssArry=[];
		};
	obj.set=function(data){
		set(data);
		}
	obj.get=function(target,id,name,fn){
		get(target,id,name,fn);
		}	
	})($,app.model,config);