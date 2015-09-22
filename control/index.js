// JavaScript Document
;(function($,obj,config){
	obj.control.set({
		name:"index",
		par:[],
		fn:function(data){
			obj.model.get("#scroller","seguesOne","segues",function(model){
				model.show();
				model.goto("pageOne",function(target,fn){target.clean();
					obj.model.get(target,"testOne","test",function(model){
						console.log(model)
						console.log(1)
					});
					obj.model.get(target,"testtwo","test",function(model){
						model.show();
						console.log(2)
						});
					obj.model.get(target,"testtree","test",function(model){
						console.log(model)
						console.log(3)
						});
					obj.model.get(target,"testfour","test",function(model){
						console.log(model)
						console.log(4)
						});
					
					fn();
					},{w:"1080px"});
					
				})
			
			}
		});
	})($,app,config);