define("control/addDetail",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var common=require("bin/common");
	var view=require("bin/view");
	var control=require("bin/control");
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
		}
		function headDone(){/*头部加载完成*/
			 
		}
		function footDone(){/*脚部加载完成*/
			$(".myDetail_foot #Send").unbind("tap").bind("tap",function(){
				user.addFriend(data.par.id,function(){
					common.pop.on("请求已发送，请等待验证");
				})
			});
		}
		/*头部不放那*/
		view.head.hide(headDone);
		/*加载脚部，传入参数*/
		view.foot.show("addDetail_foot",{text:"加好友"},footDone);
		/*加载主区，传入参数*/
		view.main.sugest("addDetail_page",{
			bg:"img/myDetailBg.jpg",
			prise:99,
			icon:"img/head.jpg",
			name:"某人",
			sex:"男",
			age:33,
			province:"广东",
			city:"广州",
			daren:"img/vipType.png",
			vipTime:"99天",
			id:"1233",
			lian:"img/lian.png",
			vipType:"img/vipNo.png",
			step:["sun","sun","moon","moon","star","star"],
			stepSpeed:"慢速",
			sign:"个性签名",
			zoneName:"空间名",
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