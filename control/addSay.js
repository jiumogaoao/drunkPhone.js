define("control/addSay",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	var common=require("bin/common");
	var zone=require("model/zone");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#addSayMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('#addSayMain img').on("load",function(){
				myScroll.refresh();
			});
			$(".addSay_page .toggle_module").unbind("tap").bind("tap",function(){
				$(this).toggleClass("toggleRight");
			});
			$(".addSay_page #addPic").unbind("change").bind("change",function(e){
				common.pic(e,function(url){
					$(".addSay_page #addPic").val("");
					$(".addSay_page .topFrame .picFrame .addPic").before('<img class="point" src="'+url+'">');
				});
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
			$(".head_module .right").unbind("tap").bind("tap",function(){
				var picArry=[];
				$(".addSay_page .topFrame .picFrame .point").each(function(){
					picArry.push({id:common.uuid(),src:$(this).attr("src")});
				});
				function add(returnData){
					if(returnData){
						control.back();
					};
				};
				zone.add($(".addSay_page .topFrame textarea").val(),picArry,add);
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"写说说"},"right":{type:"button",text:"发表"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("addSay_page",{},data.state,"side",viewDone);
	}
});