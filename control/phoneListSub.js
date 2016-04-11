define("control/phoneListSub",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScrollA = new IScroll('#planMain', {  });
			var myScrollB = new IScroll('#cartMain', {  });
			var myScrollC = new IScroll('#textMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('#planMain img').on("load",function(){
				myScrollA.refresh();
			});
			$('#cartMain img').on("load",function(){
				myScrollB.refresh();
			});
			$('#textMain img').on("load",function(){
				myScrollC.refresh();
			});
			/*用于记录子页步数*/
			var offset=0;
			/*主区向左切换子页*/
			$(".phoneListSub_page #phoneListSubMain").unbind("swipeleft").bind("swipeleft",function(){
				if(offset<$(".phoneListSub_page .subPage").length-1){
					offset++;
					$(".nav_module .nav_point").removeClass('hl');
					$(".nav_module .nav_point").eq(offset).addClass("hl");
					$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
					$(".phoneListSub_page #phoneListSubRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
				}
			});
			/*主区向右切换子页*/
			$(".phoneListSub_page #phoneListSubMain").unbind("swiperight").bind("swiperight",function(){
				if(offset>0){
					offset--;
					$(".nav_module .nav_point").removeClass('hl');
					$(".nav_module .nav_point").eq(offset).addClass("hl");
					$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
					$(".phoneListSub_page #phoneListSubRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"交通出行"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("phoneListSub_page",data,data.state,"side",viewDone);
	};
});