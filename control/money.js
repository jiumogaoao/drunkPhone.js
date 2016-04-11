define("control/money",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#moneyMain', {  });
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
		view.head.show("head_template",{
			"left":{
				type:"back",
				text:"返回"
			},
			"center":{
				type:"title",
				text:"QQ钱包"
			},
			right:{
				type:"icon",
				icon:[
				{nav:"self"}
				]
			}
		},headDone);
		/*隐藏脚部*/
		view.foot.show("money_foot",{},footDone);
		/*加载主区，传入参数*/
		view.main.sugest("money_page",{},data.state,"side",viewDone);
	}
});
