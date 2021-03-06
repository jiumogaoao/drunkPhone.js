define("control/regest",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*绑定事件*/
			$(".regest_page #Send").unbind("tap").bind("tap",function(){
				if(!$("#phone input").val()){
					view.pop.on("请输入手机号");
					return false;
				}
				if(!$("#key input").val()){
					view.pop.on("请输入密码");
					return false;
				}
				/*注册成功*/
				function regestSc(){
					view.pop.on("注册成功");
					window.location.hash="index";
				}
				/*开始注册*/
				var tksc=function(returnData){
					api("user","regest",{
						tk:returnData.tk,
						name:$("#phone input").val(),
						key:$("#key input").val()
					},regestSc,view.err);
				};
				/*获取tk*/
				common.tk(tksc);
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"验证手机号码"}},headDone);
		/*隐藏脚部*/
		view.foot.hide();
		/*加载主区，传入参数*/
		view.main.sugest("regest_page",data,data.state,"side",viewDone);
	};
});