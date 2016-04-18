// JavaScript Document
define("bin/common",function(require, exports, module) {
    /*一切从这开始*/
    /*声明主object*/
    var common={};
    var view=require("bin/view");
    var api=require("bin/api");
    /*干掉默认事件*/
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    /*自适应处理*/
    function resize(){
    module.exports.size = common.size=function(){return $(window).width()/750;};
    $("html").css({
        "-webkit-transform":"scale("+common.size()+")",
        "transform":"scale("+common.size()+")",
        "height":(($(window).height()/$(window).width())*750)+"px"
        });
    }
    /*先执行一次*/
    resize();
    /*屏幕有变动的时候再执行*/
    $(window).on("resize",resize);
    /*生成uuid*/
    module.exports.uuid = common.uuid = function () {
        return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return (v.toString(16)).toUpperCase();
        });
    };
    /*图片转码*/
    module.exports.pic = common.pic=function(file,fn) {
            var reader = new FileReader();
            reader.onload = function(e) {
                fn(e.target.result);
            };
            reader.readAsDataURL(file.target.files[0]);
        };
    /*本机缓存*/
    module.exports.cache = common.cache = function (key, value, remove) {
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
    /*获取token*/
    module.exports.tk = common.tk=function(fn){
        var sendData={};
        if(common.cache("tk")){
            sendData=common.cache("tk");
        }
        var tksc=function(returnData){
            common.cache("tk",returnData);
            fn(returnData);
        };
        api("user","getToken",{tk:common.cache("tk").tk},tksc,view.err);
    };
    /*注册socket*/

});