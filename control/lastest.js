define("control/lastest",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#lastestMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			$(".head_module .navLeft").unbind("tap").bind("tap",function(){
				window.location.hash="album";
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
				type:"nav",
				nav:[
				{text:"列表"},
				{hl:true,text:"最近"}
				]
			},
			"right":{
				type:"icon",
				icon:[
				{name:"add"}
				]
			}
		},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("lastest_page",{
			group:[
			{time:"某年某月",list:[
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"},
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"},
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"}
			]},
			{time:"某年某月",list:[
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"},
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"},
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"}
			]},
			{time:"某年某月",list:[
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"},
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"},
				{time:"某年某月",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],name:"标题",dsc:"描述",picNum:"99"}
			]}
			]
		},data.state,"side",viewDone);
	}
});