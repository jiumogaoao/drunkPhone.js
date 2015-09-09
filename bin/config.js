// JavaScript Document
var sourArry=[location.hostname];
var config={
	sour:sourArry[0],
	loadingOn:function(){},
	loadingOff:function(){}
	};
var uuid=function(){
		return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
	        return (v.toString(16)).toUpperCase();
    	});
	};