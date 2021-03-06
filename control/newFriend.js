define("control/newFriend",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	var tk=null;
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#newFriendMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			function checkSc(returnData,that){
					view.pop.on("添加成功，你们已经成为朋友");
					$(that).parents(".list_module").removeClass('attention');
					$(that).parents(".list_module .right").append('<div class="state">已添加</div>');
					$(that).remove();
			}
			$(".newFriend_page .addButton").unbind("tap").bind("tap",function(){
				var that=this;
				api("user","checkFriend",{tk:tk,to:$(that).attr("pid")},function(returnData){checkSc(returnData,that);},view.err);
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"新朋友"},"right":{type:"icon",icon:[{name:"list"}]}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		var friendList=[];
		function getFriend(friend){
			_.each(friend.checked,function(point){
				point.state="已添加";
				friendList.push(point);
			});
			_.each(friend.request,function(point){
				point.state="已请求";
				friendList.push(point);
			});
			_.each(friend.response,function(point){
				point.state="请求添加";
				friendList.push(point);
			});
			_.each(friend.reject,function(point){
				point.state="已拒绝";
				friendList.push(point);
			});
			friendList=_.sortBy(friendList,function(point){return point.time;});
			/*加载主区，传入参数*/
			view.main.sugest("newFriend_page",{
				list:friendList
			},data.state,"side",viewDone);
		}
		function tkGet(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			tk=returnData.tk;
			api("user","getFriendList",{tk:returnData.tk},getFriend,view.err);
		}
		common.tk(tkGet);
	};
});