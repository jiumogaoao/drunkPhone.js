// JavaScript Document
;(function($,obj,config){
	obj.model.set({
		name:"test",
		css:["common"],
		html:["dsc","download"],
		fn:function(){
			var source=this;
			//init
			source.init=function(){
				source.target.html(source.css[0]+source.html[0]+source.html[1]);
				};
			//set
			source.set=function(data){};
			}
		});
	})($,app,config);