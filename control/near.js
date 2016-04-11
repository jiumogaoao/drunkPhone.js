define("control/near",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScrollA = new IScroll('#nearMan', {  });
			var myScrollB = new IScroll('#newThink', {  });
			var myScrollC = new IScroll('#hotTalk', {  });
			var myScrollD = new IScroll('#more', {  });
			var myScrollE = new IScroll('#roomFrame', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('#nearMan img').on("load",function(){
				myScrollA.refresh();
			});
			$('#newThink img').on("load",function(){
				myScrollB.refresh();
			});
			$('#hotTalk img').on("load",function(){
				myScrollC.refresh();
			});
			$('#more img').on("load",function(){
				myScrollD.refresh();
			});
			$('#roomFrame img').on("load",function(){
				myScrollE.refresh();
			});
			/*用于锁定banner滚动*/
			var rollLock=1;
			/*记录banner步数*/
			var step=0;
			/*banner滚动句柄*/
			var finishDelay=0;
			/*banner滚动方法*/
			function roll(){
				$(".near_page .hotBannerPoint").removeClass("hl");
					$(".near_page .hotBannerPoint").eq(step).addClass("hl");
					$(".near_page #hotBannerRoll").attr("style",'transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 300ms; transform: translate(-'+((100*step)/$(".near_page #hotBannerRoll img").length)+'%, 0px) translateZ(0px);');
					finishDelay=setTimeout(function(){
						rollLock=1;
					},300);
			}
			/*banner向右划*/
			$(".near_page #hotBannerFrame").unbind("swiperight").bind("swiperight",function(e){
				e.stopPropagation();
				if(rollLock){
					rollLock=0;
					if(step>0){
						step--;
					}
					roll();
				}
			});
			/*banner向左划*/
			$(".near_page #hotBannerFrame").unbind("swipeleft").bind("swipeleft",function(e){
				e.stopPropagation();
				if(rollLock){
					rollLock=0;
					if(step<$(".near_page #hotBannerRoll img").length-1){
						step++;
					}
					roll();
				}
			});
			/*banner自动处理*/
			var delay=setInterval(function(){
				if(rollLock){
					rollLock=0;
					if(step<$(".near_page #hotBannerRoll img").length-1){
						step++;
					}else{
						step=0;
					}
					roll();
				}
			},5000);
			/*子页步数*/
			var offset=0;
			/*页面向左划切换子页*/
			$(".near_page #nearMain").unbind("swipeleft").bind("swipeleft",function(){
				if(offset<$(".near_page .subPage").length-1){
					offset++;
					$(".nav_module .nav_point").removeClass('hl');
					$(".nav_module .nav_point").eq(offset).addClass("hl");
					$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
					$(".near_page #nearRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
				}
			});
			/*页面向右划切换子页*/
			$(".near_page #nearMain").unbind("swiperight").bind("swiperight",function(){
				if(offset>0){
					offset--;
					$(".nav_module .nav_point").removeClass('hl');
					$(".nav_module .nav_point").eq(offset).addClass("hl");
					$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
					$(".near_page #nearRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
				}
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"附近"},right:{type:"button",text:"筛选"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("near_page",{
			nearMan:{
				head:["img/head.jpg","img/head.jpg","img/head.jpg"],
				list:[
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"},
				{icon:"img/head.jpg",name:"某人",sex:"男",age:"18",star:"双子",dsc:"描述",distance:"3",time:"某年某月"}
				]
			},
			newThink:[
				{icon:"img/head.jpg",name:"某人",time:"某年某月",text:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readedNum:9,praise:["另一个人","另一个人","另一个人","另一个人"]},
				{icon:"img/head.jpg",name:"某人",time:"某年某月",text:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readedNum:9,praise:["另一个人","另一个人","另一个人","另一个人"]},
				{icon:"img/head.jpg",name:"某人",time:"某年某月",text:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readedNum:9,praise:["另一个人","另一个人","另一个人","另一个人"]},
				{icon:"img/head.jpg",name:"某人",time:"某年某月",text:"说了很多很多",pic:[
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"},
				{src:"img/head.jpg"}
				],readedNum:9,praise:["另一个人","另一个人","另一个人","另一个人"]}
			],
			hotTalk:{
				banner:["img/head.jpg","img/head.jpg","img/head.jpg","img/head.jpg"],
				room:[{icon:"img/head.jpg"},{icon:"img/head.jpg"},{icon:"img/head.jpg"},{icon:"img/head.jpg"},{icon:"img/head.jpg"}],
				publics:[
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"}
				],
				mine:[
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"},
				{icon:"img/head.jpg",name:"房间名",dsc:"描述"}
				]
			}

		},data.state,"side",viewDone);
	}
});
