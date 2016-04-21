// JavaScript Document
define("bin/config",function(require, exports, module) {
/*配置文件*/
/*不同环境服务器url*/
var sourArry = ["http://localhost:8888/","http://192.168.0.118:8888/"];
/*配置信息object*/
var config = {
	/*环境控制*/
    sour: sourArry[1],
    /*版本控制*/
    version : "0.0.0.1"
};
module.exports=config;
});
