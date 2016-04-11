define("control/aboutMe",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var control=require("bin/control");
	var view=require("bin/view");
	page.fn=function(data){

		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#aboutMeMain', {  });
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"与我相关"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("aboutMe_page",{
			list:[
				{name:"某人",time:"某年某月",main:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readNumber:99,parise:["另一个人","另一个人","另一个人","另一个人"]},
				{name:"某人",time:"某年某月",main:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readNumber:99,parise:["另一个人","另一个人","另一个人","另一个人"]},
				{name:"某人",time:"某年某月",main:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readNumber:99,parise:["另一个人","另一个人","另一个人","另一个人"]},
				{name:"某人",time:"某年某月",main:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readNumber:99,parise:["另一个人","另一个人","另一个人","另一个人"]}
			]
		},data.state,"side",viewDone);
	}
});