(function ($, obj, config) {/*M层*/
    /*用于缓存M层object*/
	var modelArry={};
    /*获取model*/
    var initModel=function(name,fn){
        modelArry[name].inited=1;/*加锁*/
        modelArry[name].cache={};
        modelArry[name].exports={};
                modelArry[name].get(modelArry[name],function(){/*拉一次数据*/
                    modelArry[name].init(modelArry[name]);/*初始*/
                    fn(modelArry[name].exports);/*给它*/
                });
    };
	var get = function(name,fn){
        /*如果有缓存*/
		if(modelArry[name]){
            if(!modelArry[name].inited){/*如果没初始*/
               initModel(name,fn);
            }else{/*如果已经初始了，直接给它*/
                fn(modelArry[name].exports);
            }
		}else{/*如果没有，打开loading*/
			app.loading.on();
            /*去拿*/
            $.ajax({
                url: "model/" + name + ".js",
                dataType: "script",
                data:{v:config.version},
                cache: true,
                error: function (err) {/*有错就报*/
                    app.loading.off();
                    app.err(err);
                    window.location.hash = "";
                },
                success: function (data) {
                    /*成功了关掉loading*/
                    app.loading.off();
                    /*初始model,然后给它*/
                    initModel(name,fn);
                }
            });
		}
	};
    obj.get = function(name,fn){
        get(name,fn);
    };
    /*把model放缓存*/
	var set = function (data) {
        if (data && data.name) {
            modelArry[data.name] = data;
        }
    };
	obj.set = function (data) {
        set(data);
    };
})($, app.model, config);