define("control/album",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#albumMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			$(".album_page #new").unbind("tap").bind("tap",function(){
				window.location.hash="addAlbum";
			});
			$(".album_page .album_point.album").unbind("tap").bind("tap",function(){
				window.location.hash="albumDetail/"+$(this).attr("pid");
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			$(".head_module .navRight").unbind("tap").bind("tap",function(){
				window.location.hash="lastest";
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"nav","nav":[{hl:true,text:"列表"},{text:"最近"}]},right:{type:"button",text:"更多"},
			bottomList:[
			{icon:"picture",text:"传照片"},
			{icon:"video",text:"发视频"},
			{icon:"videoList",text:"动感影集"}
			]
	},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		var showList=[];
		function getAlbumList(returnData){
			showList=returnData;
			view.main.sugest("album_page",{list:showList},data.state,"side",viewDone);
		}
		function tkGet(returnData){
			api("album","getAlbumList",{tk:returnData.tk,uid:null},getAlbumList,view.err);
		}
		common.tk(tkGet);
	};
});