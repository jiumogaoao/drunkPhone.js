// JavaScript Document
;(function($,obj,config){
	obj.control.bind=function(scope,data,eventArry){
		var cdata=$.extend({},data);
		function  targetBind(e){
			eventArry[type][eve](e,cdata[$(this).attr("D_data")]);
			}
		function typeFn(){
				var target=$(this);
				for (var eve in eventArry[type]){
					if(eve === "init"){
					eventArry[type][eve](target,cdata[target.attr("D_data")]);
					}else{
						$(this).unbind(eve).bind(eve,targetBind);
						}
					}	
				}
		for (var type in eventArry){
			scope.find("[D_type = '"+type+"']").each(typeFn);
			} 
		};
	obj.control.set=function(data){
		obj.route.set(data);
		};
	})($,app,config);