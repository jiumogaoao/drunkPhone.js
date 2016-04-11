define("control/diyShow",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#diyShowMain', { probeType: 3 });
			/*随滚动改变头部颜色*/
			$(".head_module").css("background-color","rgba(18,183,245,0)");
			myScroll.on("scroll",function(){
				if(this.y<-200){
					$(".head_module").css("background-color","rgba(18,183,245,1)");
				}else if(this.y>0){
					$(".head_module").css("background-color","rgba(18,183,245,0)");
				}else{
					var color=-1*this.y/200;
					$(".head_module").css("background-color","rgba(18,183,245,"+color+")");
				}
			});
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
		}
		function headDone(){/*头部加载完成*/
			
		}
		function footDone(){/*脚部加载完成*/

		}
		/*不用这个放头部*/
		view.head.hide(headDone);
		/*加载脚部，传入参数*/
		view.foot.show("diyShow_foot",{},footDone);
		/*加载主区，传入参数*/
		view.main.sugest("diyShow_page",{
			banner:"img/diyShowBg.jpg",
			top:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			face:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			pao:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			redpackage:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			font:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			style:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			]
		},data.state,"side",viewDone);
	};
});