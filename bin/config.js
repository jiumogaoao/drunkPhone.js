// JavaScript Document
define("bin/config",function(require, exports, module) {
/*配置文件*/
/*不同环境服务器url*/
var sourArry = ["http://112.74.25.12:28080/", "https://m.lvbh.cn/", "http://192.168.1.14:8080/"];
/*配置信息object*/
var config = {
	/*环境控制*/
    sour: sourArry[0],
    /*版本控制*/
    version : "0.0.0.1"
};
module.exports=config;
});
