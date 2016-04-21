define("control/set",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	var tk=null;
	var userData={};
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#setMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"设置"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		function tkGet(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			tk=returnData.tk;
			userData=returnData.user;
			view.main.sugest("set_page",userData,data.state,"side",viewDone);
		}
		common.tk(tkGet);
	};
});