// JavaScript Document
define("bin/common",function(require, exports, module) {
    /*一切从这开始*/
    /*声明主object*/
    var common={};
    var config=require("bin/config");
    var view=require("bin/view");
    var api=require("bin/api");
    var control=require("bin/control");
    var canvar=$('<canvas></canvas')[0];
    var ctx = canvas.getContext('2d');
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
    module.exports.pic = common.pic=function(file,fn,w,h) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if(w&&h){
                  common.picScall(e.target.result,w,h,fn); 
                }else{
                   fn(e.target.result); 
                }
            };
            reader.readAsDataURL(file.target.files[0]);
        };
    /*图片缩放*/
    module.exports.picScall = common.picScall = function(file,w,h,fn){
        canvar.width=w;
        canvar.height=h;
        var img = new Image();
        img.addEventListener("load", function() {
            ctx.drawImage(img,0,0,w,h);
        var src = canvar.toDataURL("image/jpeg",1);
        if(fn){fn(src);}
        }, false);
        img.src = file;
    };
    /*图片剪切*/
    module.exports.picSlice = common.picScall = function(file,x,y,w,h,fn){
        canvar.width=w;
        canvar.height=h;
        var img = new Image();
        img.addEventListener("load", function() {
            ctx.drawImage(img,x,y,w,h,0,0,w,h);
        var src = canvar.toDataURL("image/jpeg",1);
        if(fn){fn(src);}
        }, false);
        img.src = file;
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
    var socket=io(config.sour);
    var socketEvent={};
    function tkGet(returnData){
        socket.emit('tk', { tk: returnData.tk });
    }
    socket.on('connected', function (data) {
        common.tk(tkGet);
  });
    /*注册响应事件*/
    module.exports.socket = function(eventName,pageName,fn){
        if(!socketEvent[eventName]){
            socketEvent[eventName]={};
        }
        if(!socketEvent[eventName][pageName]){
            socketEvent[eventName][pageName]=fn;
        }
    };
    /*响应*/
    socket.on('event',function(data){
        var nowPage=control.nowPage();/*获取当前页面名*/
        if(socketEvent&&socketEvent[data.eventName]&&socketEvent[data.eventName][nowPage]){
            socketEvent[data.eventName][nowPage](data.data);
        }
    });
});