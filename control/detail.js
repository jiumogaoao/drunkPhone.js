define("control/detail",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var view=require("bin/view");
	var control=require("bin/control");
	var message=require("model/message");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#detail', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
				myScroll.scrollTo(0,myScroll.maxScrollY);
			});
			myScroll.scrollTo(0,myScroll.maxScrollY);
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
		}
		function footDone(){/*脚部加载完成*/
			$(".talk_foot input").unbind("keydown").bind("keydown",function(e){
				var that=this;
				if(e.keyCode==13){
					message.add(data.par.id,0,"text",$(this).val(),function(returnData){
						if(returnData){
							var newList=function(newData){
								view.main.sugest("detail_page",{group:newData},data.state,"top",viewDone);
							}
							$(that).val("");
							message.getList(data.par.id,newList);
						}
					});
				}
			});
		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"某人"},"right":{type:"icon",icon:[{name:"people"},{name:"phone"}]}},headDone);
		/*加载脚部，传入参数*/
		view.foot.show("talk_foot",{hl:"1"},footDone);
		var showList={group:{}};
		function getList(returnList){
			if(returnList){
				showList.group=returnList;
			};
		};
		message.getList(data.par.id,getList);
		/*加载主区，传入参数*/
		view.main.sugest("detail_page",showList,data.state,"top",viewDone);
	}
});