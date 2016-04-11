define("control/vip",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#vipMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module").css("background-color","#000");
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{
			"left":{
				type:"back",
				text:"返回"
			},
			"center":{
				type:"title",
				text:"开通会员"
			},
			"right":{
				type:"icon",
				icon:[{name:"list"}]
			}
		},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("vip_page",{
			top:[{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"}],
			game:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			function:[
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"},
			{icon:"img/head.jpg",name:"名字",dsc:"描述"}
			],
			style:{
				top:[
				{icon:"img/head.jpg",name:"名字",dsc:"表情"},
				{icon:"img/head.jpg",name:"名字",dsc:"挂件"},
				{icon:"img/head.jpg",name:"名字",dsc:"主题"}
				],
				bottom:[
				{src:"img/head.jpg"},{src:"img/head.jpg"}
				]
			}
		},data.state,"side",viewDone);
	}
});
