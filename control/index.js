// JavaScript Document
;(function($,obj,config){
	obj.control.set({
		name:"index",
		par:"a/b/f/e/k",
		fn:function(data){
			obj.model.get("#scroller","testOne","test",function(model){
				console.log(model)
				console.log(1)
				});
			obj.model.get("#scroller","testtwo","test",function(model){
				console.log(model)
				console.log(2)
				});
			obj.model.get("#scroller","testtree","test",function(model){
				console.log(model)
				console.log(3)
				});
			obj.model.get("#scroller","testfour","test",function(model){
				console.log(model)
				console.log(4)
				});
			}
		});
	})($,app,config);