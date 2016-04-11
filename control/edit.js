define("control/edit",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var user=require("model/user");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			$(".edit_page .right input,.edit_page .right select").unbind("change").bind("change",function(){
				if($(this).attr("name")!="birthday"){
					userData[$(this).attr("name")]=$(this).val();
				}else{
					userData.birthday=moment($(this).val(),"YYYY-MM-DD").format("x");
				}
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			$(".head_module .rightButton").unbind("tap").bind("tap",function(){
				user.editDetail(userData,function(returnData){
					if(returnData){
						common.pop.on("修改成功");
						userData=user.loginMessage();
						view.main.sugest("edit_page",userData,data.state,"side",viewDone);
					}
				});
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"编辑资料"},"right":{type:"button",text:"完成"}},headDone);
		/*隐藏脚部*/
		view.foot.hide();
		var userData=user.loginMessage();
		/*加载主区，传入参数*/
		view.main.sugest("edit_page",userData,data.state,"side",viewDone);
	}
});