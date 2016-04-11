define("control/file",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#fileMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"我的文件"}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("file_page",{
			top:[
			{icon:"img/pc.png",name:"传文件/照片到电脑"},
			{icon:"img/file2.png",name:"面对面快传（面流量）"},
			{icon:"img/cloud.png",name:"备份相册到微云"}
			],
			file:[
			{name:"最近文件"},
			{name:"本机文件"},
			{name:"电脑文件"},
			{name:"微云文件"}
			]
		},data.state,"side",viewDone);
	}
});