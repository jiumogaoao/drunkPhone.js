define("control/creatGroup",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var view=require("bin/view");
	var control=require("bin/control");
	var group=require("model/group");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#creatGroupMain', {  });
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
			$(".head_module #end").unbind("tap").bind("tap",function(){
				window.location.hash="group";
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		var groupMessage={};
		function getGroup(getList){
			groupMessage=getList[data.par.id];
		}
		group.getList([data.par.id],getGroup);
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"创建成功"},right:{type:"button",text:"完成",id:"end"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("creatGroup_page",groupMessage,data.state,"side",viewDone);
	}
});