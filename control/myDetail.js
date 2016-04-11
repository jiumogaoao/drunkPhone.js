define("control/myDetail",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var user=require("model/user");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#myDetailMain', { probeType: 3 });
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
			/*修改背景*/
			$(".myDetail_page #bgInput").unbind("change").bind("change",function(e){
				common.pic(e,function(returnUrl){
					user.changeBackground(returnUrl,function(returnData){
						if(returnData){
							$(".myDetail_page #bg").attr("src",returnUrl);
						}
					});
				});
			});
			/*修改头像*/
			$(".myDetail_page #base .left #iconInput").unbind("change").bind("change",function(e){
				common.pic(e,function(returnUrl){
					user.changeIcon(returnUrl,function(returnData){
						if(returnData){
					$(".myDetail_page #base .left img").attr("src",returnUrl);
				}
			});
				});
			});
		}
		function headDone(){/*头部加载完成*/
			 
		}
		function footDone(){/*脚部加载完成*/
			$(".myDetail_foot #edit").unbind("tap").bind("tap",function(){
				window.location.hash="edit";
			});
		}
		/*头部不放那*/
		view.head.hide(headDone);
		/*加载脚部，传入参数*/
		view.foot.show("myDetail_foot",{},footDone);
		/*加载主区，传入参数*/
		var userData=user.loginMessage();
		view.main.sugest("myDetail_page",{
			base:userData,
			pic:[{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"}],
			mine:[
			{icon:"img/head.jpg",name:"某人",dsc:"描述"},
			{icon:"img/head.jpg",name:"某人",dsc:"描述"},
			{icon:"img/head.jpg",name:"某人",dsc:"描述"},
			{icon:"img/head.jpg",name:"某人",dsc:"描述"},
			{icon:"img/head.jpg",name:"某人",dsc:"描述"}
			]
		},data.state,"side",viewDone);
	}
});