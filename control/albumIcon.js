define("control/albumIcon",function(require, exports, module) {
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
			$(".picList_module .list .point img").unbind("tap").bind("tap",function(){
				function setSc(returnData){
					if(returnData){
						control.back();
					}
				};
				api("album","setIcon",{tk:tk,aid:data.par.id,src:$(this).attr("src")},setSc,view.err);
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title","text":"编辑封面"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		var showList={};
		function getAlbumList(returnData){
			showList=_.find(returnData,{id:data.par.id});
			if(!showList.icon&&showList.list.length){
				showList.icon=showList.list[0].src;
			}
			showList.showList=_.groupBy(showList.list,function(point){
				return moment(point.time,"x").format("YYYY 年 MM 月 DD 日");
			});
			view.main.sugest("albumIcon_page",showList,data.state,"side",viewDone);
		}
		function tkGet(returnData){
			tk=returnData.tk;
			api("album","getAlbumList",{tk:returnData.tk,uid:null},getAlbumList,view.err);
		}
		common.tk(tkGet);
	}
});