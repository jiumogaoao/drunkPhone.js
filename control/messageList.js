define("control/messageList",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var common=require("bin/common");
	var api=require("bin/api");
	page.fn=function(data){
		common.socket('newMessage','messageList',function(socketData){
			if(!$(".list_module[pid='"+socketData.from+"']").length){
				$("#listFrameRoll").append('<div class="list_module" pid="'+socketData.from+'" state="0">'+
							'<img class="left" src="'+socketData.icon+'">'+
							'<div class="right">'+
								'<div class="title">'+socketData.name+'</div>'+
								'<div class="dsc"></div>'+
								'<div class="time"></div>'+
								'<div class="num">0</div>'+
							'</div>'+
							'<div class="hide">'+
								'<div class="setTop">置顶</div>'+
								'<div class="setRead">标为已读</div>'+
								'<div class="remove">删除</div>'+
								'<div class="clear"></div>'+
							'</div>'+
							'<div class="clear"></div>'+
						'</div>');
			}
			if(socketData.type==="text"){
				$(".list_module[pid='"+socketData.from+"'] .dsc").html(socketData.main);
			}else{
				$(".list_module[pid='"+socketData.from+"'] .dsc").html("[图片]");
			}
			$(".list_module[pid='"+socketData.from+"'] .num").html(Number($(".list_module[pid='"+socketData.from+"'] .num").html())+1);
			$(".list_module[pid='"+socketData.from+"'] .num").show();
			$(".list_module[pid='"+socketData.from+"'] .time").html(moment(socketData.time,"x").format("YYYY-MM-DD"));
		});
		common.socket('newGroupMessage','messageList',function(socketData){
			if(!$(".list_module[pid='"+socketData.to+"']").length){
				$("#listFrameRoll").append('<div class="list_module" pid="'+socketData.to+'" state="1">'+
							'<img class="left" src="'+groupList[socketData.to].icon+'">'+
							'<div class="right">'+
								'<div class="title">'+groupList[socketData.to].name+'</div>'+
								'<div class="dsc"></div>'+
								'<div class="time"></div>'+
								'<div class="num">0</div>'+
							'</div>'+
							'<div class="hide">'+
								'<div class="setTop">置顶</div>'+
								'<div class="setRead">标为已读</div>'+
								'<div class="remove">删除</div>'+
								'<div class="clear"></div>'+
							'</div>'+
							'<div class="clear"></div>'+
						'</div>');
			}
			if(socketData.type==="text"){
				$(".list_module[pid='"+socketData.to+"'] .dsc").html(socketData.main);
			}else{
				$(".list_module[pid='"+socketData.to+"'] .dsc").html("[图片]");
			}
			$(".list_module[pid='"+socketData.to+"'] .num").html(Number($(".list_module[pid='"+socketData.to+"'] .num").html())+1);
			$(".list_module[pid='"+socketData.to+"'] .num").show();
			$(".list_module[pid='"+socketData.to+"'] .time").html(moment(socketData.time,"x").format("YYYY-MM-DD"));
		});
		common.socket('newZone','messageList',function(socketData){
			$(".foot_module.treeNav_foot .navPoint.right .redPoint").show();
		});
		common.socket('newFriend','messageList',function(socketData){
			$(".foot_module.treeNav_foot .navPoint.center .redPoint").show();
		});
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#listFrame', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*绑定事件*/
			/*列表左划出现隐藏项*/
			$(".messageList_page .list_module").unbind("swipeleft").bind("swipeleft",function(){
				if($(this).attr("open")!=="1"){
					$(this).attr("open","1");
					$(this).attr("style","transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 1000ms;transform:translate(-468px, 0px) translateZ(0px);");
				}
			});
			/*列表右划关闭隐藏项*/
			$(".messageList_page .list_module").unbind("swiperight").bind("swiperight",function(){
				if($(this).attr("open")==="1"){
					$(this).attr("open","0");
					$(this).attr("style","transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 1000ms;transform:translate(0px, 0px) translateZ(0px);");
				}
			});
			/*点击删除删除列表项*/
			$(".messageList_page .list_module .remove").unbind("tap").bind("tap",function(e){
				e.stopPropagation();
				$(this).parents(".list_module").remove();
			});
			/*点击列表项进入聊天*/
			$(".messageList_page .list_module").unbind("tap").bind("tap",function(){
				if($(this).attr("state")==="0"){
					window.location.hash="detail/"+$(this).attr("pid");
				}else if($(this).attr("state")==="1"){
					window.location.hash="detailGroup/"+$(this).attr("pid");
				}
			});
			/*页面左边右划出现侧栏*/
			$(".messageList_page #sideHandle").unbind("swiperight").bind("swiperight",function(){
				if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
			/*页面左边左划关闭侧栏*/
			$(".messageList_page #sideHandle").unbind("swipeleft").bind("swipeleft",function(){
				if($("body").attr("sideOpen")==="1"){
					$("body").attr("sideOpen","0");
					view.side.hide();
				}
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			/*点击头像打开侧栏*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
			if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
			/*点击导航，跳转到电话本页面*/
			$(".head_module .navRight").unbind("tap").bind("tap",function(){
				window.location.hash="phone";
			});
			/*点击添加按钮*/
			$(".head_module #add").unbind("tap").bind("tap",function(){
				view.head.listShow();
			});
			/*点击加好友*/
			$(".head_module #addFriend").unbind("tap").bind("tap",function(){
				window.location.hash="add";
			});
		}
		function footDone(){/*脚部加载完成*/
			/*绑定事件*/
			/*点击联系人按钮,跳转到联系人*/
			$(".foot_module .navPoint.center").unbind("tap").bind("tap",function(){
				window.location.hash="linkmanList";
			});
			/*点击动态，跳转到动态*/
			$(".foot_module .navPoint.right").unbind("tap").bind("tap",function(){
				window.location.hash="actionList";
			});
		}
		
		/*使用treeNav_foot作为脚部，传入参数hl=0*/
		view.foot.show("treeNav_foot",{hl:"0"},footDone);
		var friendList={};
		var groupList={};
		var showData=[];
		var callback=0;
		function callbackAll(){
			callback++;
			if(callback===3){
				view.main.sugest("messageList_page",{
					list:showData
				},data.state,"size",viewDone);
			}
		}
		/*转出messageList_page的view*/
		function getMessageList(returnData){
			_.each(returnData,function(point,index){
				if(point[0].state===0){
					showData.push({"id":index,"state":0,"icon":friendList[index].icon,"name":friendList[index].name,"dsc":_.last(point).main,"time":moment(_.last(point).time,"x").format("YYYY-MM-DD"),"num":point.length});
				}else if(point[0].state===1){
					showData.push({"id":index,"state":1,"icon":groupList[index].icon,"name":groupList[index].name,"dsc":_.last(point).main,"time":moment(_.last(point).time,"x").format("YYYY-MM-DD"),"num":point.length});
				}
			});
			callbackAll();
		}
		function getFriendList(returnData){
			_.each(returnData.checked,function(point){
				friendList[point.id]=point;
			});
			callbackAll();
		}
		function getMyList(returnData){
			_.each(returnData.owner,function(point){
				groupList[point.id]=point;
			});
			_.each(returnData.admin,function(point){
				groupList[point.id]=point;
			});
			_.each(returnData.member,function(point){
				groupList[point.id]=point;
			});
			callbackAll();
		}
		function tkget(returnData){
			if(!returnData.user){
				view.err("请先登录");
				window.location.hash="index";
				return false;
			}
			/*使用iconNavButton_head的view作为头部，传入参数hl=0*/
		view.head.show("head_template",{
				"left":{
					"type":"icon",
					"src":returnData.user.icon
				},
				"center":{
					"type":"nav",
					"nav":[
					{"text":"消息","hl":true},
					{"text":"电话"}
					]},
				"right":{
					"type":"icon",
					"icon":[{"name":"add","id":"add"}],
					"list":[
					{"icon":"scan","text":"扫一扫","id":"scan"},
					{"icon":"addFriend","text":"加好友","id":"addFriend"},
					{"icon":"creatTalkGroup","text":"创建讨论组","id":"creatTalkGroup"},
					{"icon":"sendToPc","text":"发送到电脑","id":"sendToPc"},
					{"icon":"faceToFace","text":"面对面快传","id":"faceToFace"},
					{"icon":"receive","text":"收钱","id":"receive"}
					]
				}
			},headDone);
			api("group","getMyList",{tk:returnData.tk},getMyList,view.err);
			api("user","getFriendList",{tk:returnData.tk},getFriendList,view.err);
			api("message","getMessageList",{tk:returnData.tk},getMessageList,view.err);
		}
		common.tk(tkget);
		
	};
});