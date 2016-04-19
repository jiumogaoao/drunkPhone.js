// JavaScript Document
define("bin/control",function(require, exports, module) {
    /*C层*/
    var common=require("bin/common");
    var config=require("bin/config");
    var view=require("bin/view");
    var control={};
    /*用于换存C层object*/
    var routeArry = {};
    /*用于缓存V层模版*/
    window.domAll = $('<div id="domAll"></div>');
    /*页面栈*/
    var pageArry=[];
    /*跳页方法*/
    function changePage() {
        /*默认首页*/
        var hash = "index";
        /*如果hash有值*/
        if (location.hash) {
            /*获取hash值*/
            hash = location.hash.replace("#", "");
        }
        /*页面状态，0栈没有值，刚进入或刷新，1栈已有值，正向进入，-1回退*/
        var state = 0;/*栈没有值，刚进入或刷新*/
        if(pageArry.length){/*1栈已有值，正向进入*/
            state=1;
        }
        if(state&&hash===_.last(pageArry)){/*回退*/
            state = -1;
        }else{/*不是回退就入栈*/
          pageArry.push(hash);  
        }
        /*过滤hash中的get信息*/
        hash = hash.split("?")[0];
        /*拆解hash参数*/
        var hashArry = hash.split("/");
        /*启动control*/
        function runRoute() {
            /*关掉loaging*/
            view.loading.off();
            view.pop.off();
            view.headPop.hide();
            view.footPop.hide();
            /*初始给control的数据*/
            var dataObj = {
                /*跳转状态*/
                state:state,
                /*参数*/
                par:{},
                /*要调用的control名字*/
                name:hashArry[0]
            };
            seajs.use("control/"+hashArry[0],function(page){         
                /*参数与字段名对好入座*/
            if (page.par) {
                var dataArry = page.par;
                for (var i = 0; i < dataArry.length; i++) {
                    dataObj.par[dataArry[i]] = hashArry[i + 1];
                }
            }
            /*运行*/
                page.fn(dataObj);
            });
        }
        runRoute();
    }
/*监测hash变化，调用跳页方法*/
    window.addEventListener("hashchange", function () {
        var hash = "index";
        if (location.hash) {
            hash = location.hash.replace("#", "");
            hash = hash.split("?")[0];
        }
        var hashArry = hash.split("/");
        changePage();
    });
    /*初始C层*/
   module.exports.init = control.init = function (loadDom) {/*开发环境分段自动加载,直接跳页*/
        if(location.href.indexOf("?dev") > 0){
            changePage();
        }else{/*如果是生产环境，去拿合成好的V层模版*/
            $.ajax({
                url: "html/domAll.html",
                data: {v: config.version},
                dataType: "html",
                cache: true,
                error: function (err) {/*错了就报*/
                    view.loading.off();
                    view.err(err);
                },
                success: function (html) {
                    if (html) {/*成功就放缓存*/
                        domAll.html(html);
                    }
                    /*跳页*/
                    changePage();
                }
            });
        }
    };
    /*回退方法*/
    module.exports.back = control.back = function(){
        /*出栈*/
        pageArry=_.initial(pageArry);
        /*调用栈尾的control*/
        window.location.hash=_.last(pageArry);
    };
    /*获取当前页面名*/
    module.exports.nowPage = control.nowPage = function(){
        return _.last(pageArry).split("/")[0];
    };
});