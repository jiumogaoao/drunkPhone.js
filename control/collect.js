define("control/collect",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#collectMain', {  });
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
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"我的收藏 &or;"},"right":{type:"icon",icon:[{name:"add"}]},
			bottomList:[
			{icon:"text",text:"文本"},
			{icon:"sound",text:"语音"},
			{icon:"pic",text:"图片"},
			{icon:"photo",text:"拍照"},
			{icon:"place",text:"位置"},
			{icon:"copy",text:"粘贴"}
			]
	},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("collect_page",{
			list:[
			{
				icon:"img/head.jpg",
				name:"标题",
				time:"某年某月",
				pic:[{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"}],
				text:"说了很多很多"
			},
			{
				icon:"img/head.jpg",
				name:"标题",
				time:"某年某月",
				pic:[{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"}],
				text:"说了很多很多"
			},
			{
				icon:"img/head.jpg",
				name:"标题",
				time:"某年某月",
				pic:[{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"}],
				text:"说了很多很多"
			},
			{
				icon:"img/head.jpg",
				name:"标题",
				time:"某年某月",
				pic:[{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"},{src:"img/head.jpg"}],
				text:"说了很多很多"
			}
			]
		},data.state,"side",viewDone);
	}
});