define("control/group",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var group=require("model/group");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScrollA = new IScroll('#myGroup', {  });
			var myScrollB = new IScroll('#talkGroup', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('#myGroup img').on("load",function(){
				myScrollA.refresh();
			});
			$('#talkGroup img').on("load",function(){
				myScrollB.refresh();
			});
			/*绑定事件*/
			/*用于记录子页面步数*/
			var offset=0;
			/*向左滑换页面*/
			$(".group_page #groupMain").unbind("swipeleft").bind("swipeleft",function(){
				if(offset<$(".group_page .subPage").length-1){
					offset++;
					$(".nav_module .nav_point").removeClass('hl');
					$(".nav_module .nav_point").eq(offset).addClass("hl");
					$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
					$(".group_page #groupRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
				}
			});
			/*向右滑换页面*/
			$(".group_page #groupMain").unbind("swiperight").bind("swiperight",function(){
				if(offset>0){
					offset--;
					$(".nav_module .nav_point").removeClass('hl');
					$(".nav_module .nav_point").eq(offset).addClass("hl");
					$(".nav_module .heightLine").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate("+offset+"00%,0px ) translateZ(0px)"});
					$(".group_page #groupRoll").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(-"+(offset*750)+"px,0px ) translateZ(0px)"});
				}
			});
			/*点击群组*/
			$(".group_page #myGroup .list_module").unbind("tap").bind("tap",function(){
				window.location.hash="detailGroup/"+$(this).attr("gid");
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			/*点击添加按钮*/
			$(".head_module #add").unbind("tap").bind("tap",function(){
				view.head.listShow();
			});
			$(".head_module #creatGroup").unbind("tap").bind("tap",function(){
				window.location.hash="addGroupName";
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
				type:"title",
				text:"群组"
			},
			"right":{
				type:"icon",
				icon:[
				{name:"list",id:"add"}
				],
				list:[
					{"icon":"group","text":"创建群",id:"creatGroup"},
					{"icon":"findGroup","text":"查找群"},
					{"icon":"groupSet","text":"群消息设置"},
					{"icon":"creatTalkGroup","text":"创建讨论组"}
				]
			}
		},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		var list={
			mine:[],
			talk:[
			{"icon":"img/head.jpg","name":"某个讨论组"},{"icon":"img/head.jpg","name":"某个讨论组"}
			]
		}
		function getMyList(returneData){
			if(returneData.owner&&returneData.owner.length){
				list.mine.push({
					title:"我创建的群组",
					list:returneData.owner
				})
			}
			if(returneData.admin&&returneData.admin.length){
				list.mine.push({
					title:"我管理的群组",
					list:returneData.admin
				})
			}
			if(returneData.member&&returneData.member.length){
				list.mine.push({
					title:"我加入的群组",
					list:returneData.member
				})
			}
		}
		group.getMyList(getMyList);
		view.main.sugest("group_page",list,data.state,"side",viewDone);
	}
});