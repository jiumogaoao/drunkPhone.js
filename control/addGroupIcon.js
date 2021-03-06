define("control/addGroupIcon",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["name"];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#addGroupIconMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			$(".addGroupIcon_page #pic").unbind("change").bind("change",function(e){
				common.pic(e,null,null,function(url){
					$(".addGroupIcon_page #icon").attr("src",url);
				});
			});
		}
		function addSc(group){
			if(group&&group.id){
						window.location.hash="creatGroup/"+group.id;
					}
		}
		function tkGet(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			api("group","add",{tk:returnData.tk,gid:null,name:data.par.name,icon:$(".addGroupIcon_page #icon").attr("src")},addSc,view.err);
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			$(".head_module #next").unbind("tap").bind("tap",function(){
				common.tk(tkGet);
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"上传群头像"},right:{type:"button",text:"提交",id:"next"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("addGroupIcon_page",{},data.state,"side",viewDone);
	};
});