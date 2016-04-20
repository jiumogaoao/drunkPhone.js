define("control/zone",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var api=require("bin/api");
	var common=require("bin/common");
	page.fn=function(data){
		common.socket('newZone','zone',function(socketData){
			var pic="";
			if(socketData.pic&&socketData.pic.length){
				_.each(socketData.pic,function(pPoint){
					pic+='<img src="'+pPoint.src+'" class="pic"/>'
				})
			}
			var praise="";
			if(socketData.praise&&socketData.praise.length){
				_.each(socketData.praise,function(pPoint){
					praise+='<div class="praiseName">'+pPoint+'</div>'
				})
			}
			$(".zone_page #zoneBottomFrame").after(
				'<div class="zone_module">'+
						'<div class="top">'+
							'<img src="'+socketData.icon+'"/>'+
							'<div class="name">'+socketData.name+'</div>'+
							'<div class="time">'+moment(socketData.time,"x").format("YYYY-MM-DD")+'</div>'+
						'</div>'+
						'<div class="middle">'+
							'<div class="text">'+socketData.text+'</div>'+
							'<div class="picFrame">'+
							pic+
								'<div class="clear"></div>'+
							'</div>'+
						'</div>'+
						'<div class="bottom">'+
							'<div class="zoneIcon copyButton"></div>'+
							'<div class="zoneIcon talkButton"></div>'+
							'<div class="zoneIcon praiseButton"></div>'+
							'<div class="clear"></div>'+
							'<div class="readed">'+
								'<div class="zoneIcon read"></div>'+
								'<div class="readNumber">浏览'+socketData.readed+'次</div>'+
								'<div class="clear"></div>'+
							'</div>'+
							'<div class="praised">'+
								'<div class="zoneIcon praise"></div>'+
								praise+
								'<div class="clear"></div>'+
							'</div>'+
							'<div class="talkFrame">'+
								'<input placeholder="我也来说一句"/>'+
								'<div class="line"></div>'+
								'<div class="zoneIcon face"></div>'+
								'<div class="clear"></div>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
			viewDone();
		});
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#zoneMain', { probeType: 3 });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
			/*通过滚动控制头部改变*/
			$(".head_module").css("background-color","rgba(18,183,245,0)");
			myScroll.on("scroll",function(){
				if(this.y<-200){
					$(".head_module").css("background-color","rgba(18,183,245,1)");
					$(".head_module .rightPoint").removeClass("addB").addClass("add");
				}else if(this.y>=0){
					$(".head_module").css("background-color","rgba(18,183,245,0)");
					$(".head_module .rightPoint").removeClass("add").addClass("addB");
				}else{
					$(".head_module .rightPoint").removeClass("addB").addClass("add");
					var color=-1*this.y/200;
					$(".head_module").css("background-color","rgba(18,183,245,"+color+")");
				}
			});
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			$(".head_module .right").unbind("tap").bind("tap",function(){
				view.headPop.show({list:[
					{id:"say",icon:"say",text:"说说"},
					{id:"picture",icon:"picture",text:"照片"},
					{id:"sign",icon:"sign",text:"签到"},
					{id:"video",icon:"video",text:"视频"}
					]});
				$("#headPop #say").unbind("tap").bind("tap",function(){
					window.location.hash="addSay";
				});
			});
			$(".zone_page #album").unbind("tap").bind("tap",function(){
				window.location.hash="album";
			});
			$(".zone_page #say").unbind("tap").bind("tap",function(){
				window.location.hash="say";
			});
			$(".zone_page #diy").unbind("tap").bind("tap",function(){
				window.location.hash="diy";
			});
			$(".zone_page #aboutMe").unbind("tap").bind("tap",function(){
				window.location.hash="aboutMe";
			});
		}
		function headDone(){/*头部加载完成*/
			 
		}
		function footDone(){/*脚部加载完成*/

		}
		/*头部不放那*/
		view.head.hide(headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		var showList=[];
		var self={};
		var getList=function(returnData){
			if(returnData){
				showList=returnData;
			}
			view.main.sugest("zone_page",{
				bg:self.zoneBackground,
				icon:self.icon,
				step:self.step,
				readedNum:self.readed.length,
				totalReadedNum:self.totalReaded.length,
				list:showList
			},data.state,"side",viewDone);
		};
		function tkGet(returnData){
			self=returnData.user;
			api("zone","getList",{tk:returnData.tk},getList,view.err);
		}
		common.tk(tkGet);
	};
});