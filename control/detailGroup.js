define("control/detailGroup",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var api=require("bin/api");
	var tk="";
	page.fn=function(data){
		common.socket('newGroupMessage','detailGroup',function(socketData){
			if(socketData.to===data.par.id){
				var sendTime=moment(socketData.time,"x").format('YYYY-MM-DD');
				if(!$(".messageGroup[time='"+sendTime+"']").length){
					$(".detailRoll").append(
						'<div class="messageGroup" time="'+sendTime+'">'+
							'<div class="time">'+sendTime+'</div>'+
							'<div class="mainFrame"></div>'+
						'</div>');
				}
				$(".messageGroup[time='"+sendTime+"'] .mainFrame").append(
					'<div class="messagePoint messagePoint0">'+
									'<img src="'+socketData.icon+'" class="head">'+
									'<div class="textFrame">'+
											'<div class="name">'+socketData.name+'</div>'+
											((socketData.type==="text")?'<div class="word">'+socketData.main+'</div>':'<img class="pic" src="'+socketData.main+'"/>')+							
									'</div>'+
									'<div class="clear"></div>'+
									'<div class="deg deg1"></div>'+
								'</div>'
					);
				viewDone();
			}
		});
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
		function sendSc(returnData,that){
			if(returnData){
							var newList=function(newData){
								view.main.sugest("detail_page",{group:newData},data.state,"top",viewDone);
							};
							$(that).val("");
							api("message","getGroupList",{tk:tk,to:data.par.id},newList,view.err);
						}
		}
		function footDone(){/*脚部加载完成*/
			$(".talk_foot input").unbind("keydown").bind("keydown",function(e){
				var that=this;
				if(e.keyCode===13){
					api("message","add",{tk:tk,to:data.par.id,state:1,type:"text",main:$(this).val()},function(returnData){sendSc(returnData,that);},view.err);
				}
			});
		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"某群"},"right":{type:"icon",icon:[{name:"group"},{name:"detail"}]}},headDone);
		/*加载脚部，传入参数*/
		view.foot.show("talk_foot",{hl:"1"},footDone);
		var showList={group:{}};
		function getList(returnList){
			if(returnList){
				showList.group=returnList;
			}
			/*加载主区，传入参数*/
		view.main.sugest("detail_page",showList,data.state,"top",viewDone);
		}
		function tkGet(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			tk=returnData.tk;
			api("message","getGroupList",{tk:tk,to:data.par.id},getList,view.err);
		}
		common.tk(tkGet);
	};
});