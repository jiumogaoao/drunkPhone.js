define("control/interest",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScrollA = new IScroll('#interestGroup', {  });
			var myScrollB = new IScroll('#nearest', {  });
			var myScrollC = new IScroll('#orderLeft', {  });
			var myScrollD = new IScroll('#orderRight', {  });
			var myScrollE = new IScroll('#found', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('#groupNew img').on("load",function(){
				myScrollA.refresh();
			});
			$('#nearest img').on("load",function(){
				myScrollB.refresh();
			});
			$('#orderLeft img').on("load",function(){
				myScrollC.refresh();
			});
			$('#orderRight img').on("load",function(){
				myScrollD.refresh();
			});
			$('#found img').on("load",function(){
				myScrollE.refresh();
			});
			/*绑定事件*/
			var offset=0;
			/*子页面切换*/
			function pageRun(){
				$(".nav_module .nav_point").removeClass('hl');
				$(".nav_module .nav_point").eq(offset).addClass("hl");
				$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
				$(".interest_page #interestRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
			}
			/*导航点击*/
			$(".nav_module .nav_point").unbind("tap").bind("tap",function(){
				offset=Number($(this).attr("num"));
				pageRun();
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"兴趣部落"},"right":{type:"button",text:"搜索"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("interest_page",{
			interest:[
			{icon:"img/head.jpg",name:"英雄联盟"},
			{icon:"img/head.jpg",name:"音乐"},
			{icon:"img/head.jpg",name:"赵丽颖"},
			{icon:"img/head.jpg",name:"军事迷"},
			{icon:"img/head.jpg",name:"EXO"},
			{icon:"img/head.jpg",name:"80后"}
			],
			nearest:{
				icon:"img/head.jpg",
				top:[
				{num:9,name:"关注"},
				{num:9,name:"粉丝"},
				{num:9,name:"部落"}
				],
				middle:[
				{icon:"img/mail.png",name:"我的通知"},
				{icon:"img/message.png",name:"我的留言"}
				],
				newest:[
					{icon:"img/head.jpg",name:"军事迷",dsc:"描述",attention:false},
					{icon:"img/head.jpg",name:"音乐",dsc:"描述",attention:false},
					{icon:"img/head.jpg",name:"赵丽颖",dsc:"描述",attention:false}
				],
				recommend:[
					{icon:"img/head.jpg",name:"EXO",dsc:"描述",attention:false},
					{icon:"img/head.jpg",name:"80后",dsc:"描述",attention:false},
					{icon:"img/head.jpg",name:"军事迷",dsc:"描述",attention:false}
				]
			},
			order:{
				group:[
				{title:"推荐部落"},{title:"游戏"},{title:"明星"},{title:"情感"},{title:"爱好"},{title:"综艺"},{title:"电视剧"},{title:"电影"},{title:"地区"},{title:"生活"},{title:"动漫"},{title:"体育竞技"}
				],
				banner:"img/head.jpg",
				list:[
				{icon:"img/head.jpg",name:"军事迷",dsc:"描述",attention:false},
					{icon:"img/head.jpg",name:"音乐",dsc:"描述",attention:false},
					{icon:"img/head.jpg",name:"赵丽颖",dsc:"描述",attention:false}
				]
			},
			found:{
				banner:["img/head.jpg","img/head.jpg","img/head.jpg","img/head.jpg"],
				top:[
				{title:"标题",type:0,list:[
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"}
				]},
				{title:"标题",type:0,list:[
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"}
				]}
				],
				center:[
				{title:"标题",type:1,list:[
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"},
					{icon:"img/head.jpg",name:"名字"}
				]},
				{title:"标题",type:3,list:[
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9}
				]},
				{title:"标题",type:2,list:[
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
					{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9}
				]}
				],
				old:[
				{num:55,group:[
					{title:"标题",type:0,list:[
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"}
					]},
					{title:"标题",type:0,list:[
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"}
					]},
					{title:"标题",type:2,list:[
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9}
					]}
					]},
				{num:55,group:[
					{title:"标题",type:0,list:[
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"}
					]},
					{title:"标题",type:0,list:[
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"}
					]},
					{title:"标题",type:2,list:[
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9}
					]}
					]},
				{num:55,group:[
					{title:"标题",type:0,list:[
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"}
					]},
					{title:"标题",type:0,list:[
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"},
						{icon:"img/head.jpg",name:"名字"}
					]},
					{title:"标题",type:2,list:[
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9},
						{icon:"img/head.jpg",name:"名字",dsc:"描述",readNum:9,talkNum:9}
					]}
					]}
				]
			}
		},data.state,"side",viewDone);
	}
});