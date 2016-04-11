define("control/actionList",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var user=require("model/user");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#actionListFrame', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*绑定事件*/
			$(".actionList_page #sideHandle").unbind("swiperight").bind("swiperight",function(){
				if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
			$(".actionList_page #sideHandle").unbind("swipeleft").bind("swipeleft",function(){
				if($("body").attr("sideOpen")==="1"){
					$("body").attr("sideOpen","0");
					view.side.hide();
				}
			});
			$(".actionList_page #zone").unbind("tap").bind("tap",function(){
				window.location.hash="zone";
			});
			$(".actionList_page #near").unbind("tap").bind("tap",function(){
				window.location.hash="near";
			});
			$(".actionList_page #interest").unbind("tap").bind("tap",function(){
				window.location.hash="interest";
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
		}
		function footDone(){/*脚部加载完成*/
			/*绑定事件*/
			$(".foot_module .navPoint.left").unbind("tap").bind("tap",function(){
				window.location.hash="messageList";
			});
			$(".foot_module .navPoint.center").unbind("tap").bind("tap",function(){
				window.location.hash="linkmanList";
			});
		}
		/*使用iconTitleButton_head的view作为头部，传入参数*/
		var userData=user.loginMessage();
		view.head.show("head_template",{"left":{"type":"icon","src":userData.icon},"center":{type:"title",text:"动态"},right:{type:"button",text:"更多"}},headDone);
		/*使用treeNav_foot作为脚部，传入参数*/
		view.foot.show("treeNav_foot",{hl:"2"},footDone);
		/*转出actionList_page的view*/
		view.main.sugest("actionList_page",{
			nav:[
				{icon:"img/action.png",name:"好友动态",id:"zone"},
				{icon:"img/near.png",name:"附近",id:"near"},
				{icon:"img/interest.png",name:"兴趣部落",id:"interest"}
			],
			group:[
				{
					list:[
					{"icon":"img/game.png","name":"游戏"},
					{"icon":"img/shopping.png","name":"购物"},
					{"icon":"img/read.png","name":"阅读"},
					{"icon":"img/music.png","name":"音乐"}
					]
				},
				{
					list:[
					{"icon":"img/neargroup.png","name":"附近的群"},
					{"icon":"img/footC.png","name":"吃喝玩乐"},
					{"icon":"img/savecity.png","name":"同城服务"},
					{"icon":"img/news.png","name":"腾讯新闻"},
					{"icon":"img/healthy.png","name":"健康"}
					]
				}
			]
		},data.state,"size",viewDone);
	};
});