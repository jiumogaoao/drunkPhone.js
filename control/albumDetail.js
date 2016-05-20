define("control/albumDetail",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	var tk=null;
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#albumDetailMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			function addPic(returnData){
				if(returnData){
					api("album","getAlbumList",{tk:tk,uid:null},getAlbumList,view.err);
				}
			}
			$(".albumDetail_page #addPic").unbind("change").bind("change",function(e){
				common.pic(e,null,null,function(returnData){
					api("album","addPic",{tk:tk,aid:data.par.id,src:returnData},addPic,view.err);
				});
			});
			$(".albumDetail_page .mask").unbind("tap").bind("tap",function(){
				window.location.hash="albumIcon/"+data.par.id;
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
		view.head.hide(headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		var showList={};

		function getAlbumList(returnData){
			showList=_.find(returnData,{id:data.par.id});
			if(!showList.icon&&showList.list.length){
				showList.icon=showList.list[0].src;
			}
			showList.list=_.sortBy(showList.list,function(point){
				return -1*point.time;
			});
			showList.showList=_.groupBy(showList.list,function(point){
				return moment(point.time,"x").format("YYYY 年 MM 月 DD 日");
			});
			view.main.sugest("albumDetail_page",showList,data.state,"side",viewDone);
		}
		function tkGet(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			tk=returnData.tk;
			api("album","getAlbumList",{tk:returnData.tk,uid:null},getAlbumList,view.err);
		}
		common.tk(tkGet);
	};
});