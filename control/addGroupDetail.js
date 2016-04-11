define("control/addGroupDetail",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var common=require("bin/common");
	var view=require("bin/view");
	var control=require("bin/control");
	var user=require("model/user");
	var group=require("model/group");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#addGroupDetailMain', { probeType: 3 });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			/*滚动时改变头部*/
			$(".head_module").css("background-color","rgba(18,183,245,0)");
			$(".head_module .title").css("opacity",0);
			myScroll.on("scroll",function(){
				if(this.y<-200){
					$(".head_module").css("background-color","rgba(18,183,245,1)");
					$(".head_module .title").css("opacity",1);
				}else if(this.y>0){
					$(".head_module").css("background-color","rgba(18,183,245,0)");
					$(".head_module .title").css("opacity",0);
				}else{
					var color=-1*this.y/200;
					$(".head_module").css("background-color","rgba(18,183,245,"+color+")");
					$(".head_module .title").css("opacity",color);
				}
			});
		}
		function headDone(){/*头部加载完成*/
			 
		}
		function footDone(){/*脚部加载完成*/
			$(".myDetail_foot #Send").unbind("tap").bind("tap",function(){
				group.join(data.par.id,null,function(){
					common.pop.on("加入成功");
				})
			});
		}
		/*头部不放那*/
		view.head.hide(headDone);
		/*加载脚部，传入参数*/
		view.foot.show("addDetail_foot",{text:"申请加群"},footDone);
		/*加载主区，传入参数*/
		view.main.sugest("addGroupDetail_page",{},data.state,"side",viewDone);
	}
});