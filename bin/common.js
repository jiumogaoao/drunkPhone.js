// JavaScript Document
define("bin/common",function(require, exports, module) {
    /*一切从这开始*/
    /*声明主object*/
    var common={};
    /*干掉默认事件*/
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    var errorDelay="";
    /*自适应处理*/
    function resize(){
    common.size=$(window).width()/750;
    $("html").css({
        "-webkit-transform":"scale("+common.size+")",
        "transform":"scale("+common.size+")",
        "height":(($(window).height()/$(window).width())*750)+"px"
        });
    }
    /*先执行一次*/
    resize();
    /*屏幕有变动的时候再执行*/
    $(window).on("resize",resize);
    /*生成uuid*/
    common.uuid = function () {
        return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return (v.toString(16)).toUpperCase();
        });
    };
    /*弹出方法*/
    common.pop = {
        /*弹出打开*/
        on: function (data) {
            $("#pop").html(data);
            $("#pop").show();
            $("#popBg").show();
            $("#popBg").unbind("tap").bind("tap",function(){
                common.pop.off();
            })
        },
        /*弹出关闭*/
        off: function () {
            $("#pop").hide();
            $("#popBg").hide();
            $("#pop").empty();
        }
    };
    /*loading方法*/
    common.loading = {
        /*loading打开*/
        on:function (){
             $("#popBg").show();
            $("#popBg").unbind("tap").bind("tap",function(){
            })
        },
        /*loading关闭*/
        off:function(){
            $("#popBg").hide();
        }
    };
    /*图片转码*/
    common.pic=function(file,fn) {
            var reader = new FileReader();
            reader.onload = function(e) {
                fn(e.target.result);
            };
            reader.readAsDataURL(file.target.files[0]);
        }
    /*本机缓存*/
    common.cache = function (key, value, remove) {
        if(!window.localStorage){
            alert("浏览器不支持本地缓存");
            return false;
        }
        if (value && typeof(value) === "object") {
            localStorage.setItem("h5qq_" + key, JSON.stringify(value));
        } else if (localStorage.getItem("h5qq_" + key)) {
            if (remove) {
                localStorage.removeItem("h5qq_" + key);
            } else {
                return JSON.parse(localStorage.getItem("h5qq_" + key));
            }
        } else {
            return false;
        }
    };
    /*报错方法*/
    common.err = function (data){
        $("#pop").html(JSON.stringify(data));
            $("#pop").show();
            $("#popBg").show();
            $("#popBg").unbind("tap").bind("tap",function(){});
            errorDelay=setTimeout(function(){
                $("#pop").hide();
                $("#popBg").hide();
                $("#pop").empty();
            },1000);
    };
    module.exports=common;
});