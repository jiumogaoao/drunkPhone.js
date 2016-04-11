define("control/phoneCode",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*绑定事件*/
			$(".phoneCode_page #Send").unbind("tap").bind("tap",function(){
				window.location.hash="regestSuccess";
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"安全验证"}},headDone);
		/*隐藏脚部*/
		view.foot.hide();
		/*加载主区，传入参数*/
		view.main.sugest("phoneCode_page",data,data.state,"side",viewDone);
	}
});
