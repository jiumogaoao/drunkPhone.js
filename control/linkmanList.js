define("control/linkmanList",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var user=require("model/user");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#linkListFrame', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*绑定事件*/
			/*打开百叶窗*/
			$(".linkmanList_page .dropDownHead").unbind("tap").bind("tap",function(){
				$(this).parents(".dropDownPoint").toggleClass("hl");
				myScroll.refresh();
			});
			/*点击列表项*/
			$(".linkmanList_page [gid='friend'] .list_module").unbind("tap").bind("tap",function(){
				window.location.hash="detail/"+$(this).attr("pid");
			});
			/*左边向右划*/
			$(".linkmanList_page #sideHandle").unbind("swiperight").bind("swiperight",function(){
				if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
			/*左边向左划*/
			$(".linkmanList_page #sideHandle").unbind("swipeleft").bind("swipeleft",function(){
				if($("body").attr("sideOpen")==="1"){
					$("body").attr("sideOpen","0");
					view.side.hide();
				}
			}); 
			/*点击新朋友*/
			$(".linkmanList_page #newFriend").unbind("tap").bind("tap",function(){
				window.location.hash="newFriend";
			}); 
			/*点击特别关心*/
			$(".linkmanList_page #care").unbind("tap").bind("tap",function(){
				window.location.hash="care";
			}); 
			/*点击群组*/
			$(".linkmanList_page #group").unbind("tap").bind("tap",function(){
				window.location.hash="group";
			}); 
			/*点击公众号*/
			$(".linkmanList_page #public").unbind("tap").bind("tap",function(){
				window.location.hash="public";
			}); 
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
			if($("body").attr("sideOpen")!=="1"){
					$("body").attr("sideOpen","1");
					view.side.show();
				}
			});
		}
		function footDone(){/*脚部加载完成*/
			/*绑定事件*/
			$(".foot_module .navPoint.left").unbind("tap").bind("tap",function(){
				window.location.hash="messageList";
			});
			$(".foot_module .navPoint.right").unbind("tap").bind("tap",function(){
				window.location.hash="actionList";
			});
		}
		/*使用iconTitleButton_head的view作为头部，传入参数*/
		var userData=user.loginMessage();
		view.head.show("head_template",{"left":{"type":"icon","src":userData.icon},"center":{type:"title",text:"联系人"},"right":{type:"button",text:"添加"}},headDone);
		/*使用treeNav_foot作为脚部，传入参数*/
		view.foot.show("treeNav_foot",{hl:"1"},footDone);
		/*转出linkmanList_page的view*/
		var showData={
			group:[
			{list:[
				{name:"我的设备",num:"2/2",list:[
					{"icon":"img/head.jpg","name":"某人的手机","dsc":"就是个描述","state":"2G"},
					{"icon":"img/head.jpg","name":"某人的手机","dsc":"就是个描述","state":"2G"}
				],id:"myDevice"},
				{name:"手机通讯录",num:"2/2",list:[
					{"icon":"img/head.jpg","name":"某人的手机","dsc":"就是个描述","state":"2G"},
					{"icon":"img/head.jpg","name":"某人的手机","dsc":"就是个描述","state":"2G"}
				],id:"myPhoneList"}
			],id:"device"}
			]
		}
		function getFriendList(returnData){
			var checkedFriend=_.groupBy(returnData.checked,"groupId");
			var showList={
				list:[],
				id:"friend"
			};
			_.each(returnData.friendGroup,function(listGroup){
				var list={
					name:listGroup.name,num:0,list:[],id:listGroup.id
				}
				if(checkedFriend[listGroup.id]){
					list.num=checkedFriend[listGroup.id].length;
					list.list=checkedFriend[listGroup.id];
				}
				showList.list.push(list);
			});
			showData.group.push(showList);
		};
		user.getFriendList(getFriendList);
		view.main.sugest("linkmanList_page",showData,data.state,"size",viewDone);
	}
});