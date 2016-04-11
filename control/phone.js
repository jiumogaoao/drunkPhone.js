define("control/phone",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var user=require("model/user");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#phoneMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*绑定事件*/
			/*左边右划*/
			$(".phone_page #sideHandle").unbind("swiperight").bind("swiperight",function(){
				if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
			/*左边左划*/
			$(".phone_page #sideHandle").unbind("swipeleft").bind("swipeleft",function(){
				if($("body").attr("sideOpen")==="1"){
					$("body").attr("sideOpen","0");
					view.side.hide();
				}
			});
			/*点击电话本*/
			$(".phone_page #phone").unbind("tap").bind("tap",function(){
				window.location.hash="phoneList";
			});
			/*点击通讯录*/
			$(".phone_page #directory").unbind("tap").bind("tap",function(){
				window.location.hash="directoryList";
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
			if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
			$(".head_module .navLeft").unbind("tap").bind("tap",function(){
				window.location.hash="messageList";
			});
		}
		function footDone(){/*脚部加载完成*/
			/*绑定事件*/
			$(".foot_module .navPoint.center").unbind("tap").bind("tap",function(){
				window.location.hash="linkmanList";
			});
			$(".foot_module .navPoint.right").unbind("tap").bind("tap",function(){
				window.location.hash="actionList";
			});
		}
		/*加载头部，传入参数*/
		var userData=user.loginMessage();
		view.head.show("head_template",{
			"left":{
				type:"icon",
				src:userData.icon
			},
			"center":{
				type:"nav",
				nav:[
				{text:"消息"},
				{text:"电话",hl:true}
				]
			},
			right:{
				type:"icon",
				icon:[
				{name:"add"}
				]
			}
		},headDone);
		/*加载脚部，传入参数*/
		view.foot.show("treeNav_foot",{hl:"0"},footDone);
		/*加载主区，传入参数*/
		view.main.sugest("phone_page",{icon:["img/head.jpg","img/head.jpg","img/head.jpg","img/head.jpg"]},data.state,"size",viewDone);
	}
});