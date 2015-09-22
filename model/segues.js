// JavaScript Document
;(function($,obj,config){
	obj.model.set({
		name:"segues",
		css:[],
		html:[],
		fn:function(){
			var oldPage="";
			var newPage="";
			
			var pageArry={}
			var source=this;
			//init
			source.init=function(){
				};
			//set
			source.set=function(data){};
			var changePage=function(type){
				console.log("o "+oldPage)
				console.log("n "+newPage)
				if(!oldPage.length||oldPage===newPage){
					source.target.find(".segues_page#"+newPage).show();
					}else{
					var page=source.target.find(".segues_page#"+newPage);
					page.css({left:"100%","z-index":"99"});
					page.show();
					source.target.css({
						width:page.width(),
						height:page.height()
						});
					page.animate({left:"0px"},1000,function(){
						page.css({"z-index":"auto"});
					source.target.find(".segues_page#"+oldPage).hide();	
						});
					
						}
				};
			//goto
			source.goto=function(id,fn,op){
				var option={
				w:"auto",
				bg:"#fff"
				};
				if(op){
					$.extend(option,op);
					}
				if(newPage.length){
					oldPage=newPage;
					}
				newPage=id;
				if(!pageArry[id]){
					var page=$("<div class='segues_page' id='"+id+"'></div>").appendTo(source.target);
					page.css({"position":"absolute","top":"0px","left":"0px","width":option.w,"background-color":option.bg});
					page.clean=function(){
						page.children(".model").hide();
						}
					pageArry[id]={
						target:page,
						fn:fn
						};
					}
				pageArry[id].fn(pageArry[id].target,changePage);
				};
			}
		});
	})($,app,config);