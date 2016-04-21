define("control/addAlbum",function(require, exports, module) {
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
			var myScroll = new IScroll('#addAlbumMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			$(".album_page #new").unbind("tap").bind("tap",function(){
				window.location.hash="addAlbum";
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			function creatSc(returnData){
						if(returnData){
							control.back();
						}
					}
			$(".head_module .right").unbind("tap").bind("tap",function(){
				function tkGet(returnData){
					if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
					api("album","creat",{
						tk:returnData.tk,
						aid:null,
						name:$(".addAlbum_page [name='name']").val(),
						dsc:$(".addAlbum_page [name='dsc']").val(),
						type:$(".addAlbum_page [name='type']").val()
					},creatSc,view.err);
				}
				common.tk(tkGet);
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"取消"},"center":{type:"title","text":"新建相册"},right:{type:"button",text:"保存"}
	},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("addAlbum_page",{},data.state,"side",viewDone);
	};
});