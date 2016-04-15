define("bin/api",function(require, exports, module) {
var config=require("bin/config");
var cache={};
var api=function(model,action,data,success,error){
	if(!cache[model+"_"+action]){
		cache[model+"_"+action]={
			data:{},
			time:0
		};
	}
	var sendData={model:model,action:action,time:cache[model+"_"+action].time,data:JSON.stringify(data),v:config.version};
	$.ajax({
		url:config.sour,
							dataType:"json",
							type: "POST",
							data:sendData,
							error:function(e){
								error(e);
								},
							success: function(returnData){
								if(returnData&&returnData.success){
									if(returnData.code === 1){
										cache[model+"_"+action].data=returnData.data;
										cache[model+"_"+action].time=returnData.time;
										}
									success(cache[model+"_"+action].data);	
								}else{
									error(returnData);
									}
								}
	});
};
module.exports=api;
});