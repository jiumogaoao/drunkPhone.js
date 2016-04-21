define("control/addSearch",function(require, exports, module) {
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
			var myScroll = new IScroll('#addSearchMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('#addSearchMain img').on("load",function(){
				myScroll.refresh();
			});
			$(".addSearch_page .list_module").unbind("tap").bind("tap",function(){
				if($(this).attr("type")==="0"){
					window.location.hash="addGroupDetail/"+$(this).attr("pid");
				}
				if($(this).attr("type")==="1"){
					window.location.hash="addDetail/"+$(this).attr("pid");
				}
			});
			$(".addSearch_page #back").unbind("tap").bind("tap",function(){
					control.back();
				});
		}
		function headDone(){/*头部加载完成*/
		}
		function footDone(){/*脚部加载完成*/

		}
		var dataObj={
			man:[],
			group:[],
			publics:[]
		};
		var callbackcount=0;
		var callbackAll=function(){
			callbackcount++;
			if(callbackcount===2){
				/*加载主区，传入参数*/
				view.main.sugest("addSearch_page",dataObj,data.state,"side",viewDone);
			}
		};
		var getManList=function(list){
			dataObj.man=list;
			callbackAll();
		};
		var getGroupList=function(list){
			dataObj.group=list;
			callbackAll();
		};
		/*加载头部，传入参数*/
		view.head.hide(headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		function tkGet(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			tk=returnData.tk;
			api("user","searchNotFriend",{tk:tk},getManList,view.err);
			api("group","searchNotGroup",{tk:tk},getGroupList,view.err);
		}
		common.tk(tkGet);
		
	};
});