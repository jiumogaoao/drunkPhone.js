define("control/edit",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	var userData={};
	var tk=null;
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			$(".edit_page .right input,.edit_page .right select").unbind("change").bind("change",function(){
				if($(this).attr("name")!=="birthday"){
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
			function editSc(returnData){
				view.pop.on("修改成功");
				userData=returnData;
				view.main.sugest("edit_page",userData,data.state,"side",viewDone);
			}
			$(".head_module .rightButton").unbind("tap").bind("tap",function(){
				api("user","editDetail",{tk:tk,editData:userData},editSc,view.err);
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"编辑资料"},"right":{type:"button",text:"完成"}},headDone);
		/*隐藏脚部*/
		view.foot.hide();
		function tkGet(returnData){
			tk=returnData.tk;
			userData=returnData.user;
		/*加载主区，传入参数*/
		view.main.sugest("edit_page",userData,data.state,"side",viewDone);
		}
		common.tk(tkGet);
		
	};
});