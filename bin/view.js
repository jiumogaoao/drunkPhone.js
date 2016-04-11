define("bin/view",function(require, exports, module) {
/*V层*/
	var view={};
	module.exports=view;
	var config=require("bin/config");
	var common=require("bin/common");
	/*转场类型栈*/
	var typeArry=[];
	/*转场延时句柄*/
	var segestDelay="";
	/*头部动画延时句柄*/
	var headDelay="";
	/*脚部动画延时句柄*/
	var footDelay="";
	/*侧栏动画延时句柄*/
	var sideDelay="";
	/*新旧页面重置*/
	function pageChange(){
		$("#pageOld").attr("id","pageHide");
						$("#pageHide").attr("style","");
						$("#pageNew").attr("id","pageOld");
						$("#pageOld").attr("style","");
						$("#pageHide").attr("id","pageNew");
						$("#pageNew").empty();
	}
	/*获取view模版*/
	function getTem(tem,fn){
		/*如果有缓存，缓存拿*/
		if(domAll.find("#"+tem).length){
			if(fn){/*返回模版给它*/
				fn(domAll.find("#"+tem).html());
			}
		}else{/*如果没有，打开loading，自动获取*/
			common.loading.on();
			$.ajax({
                url: "view/" + tem + ".html",
                dataType: "html",
                data:{v:config.version},
                cache: true,
                error: function (err) {/*错了就报*/
                    common.loading.off();
                    common.err(err);
                    window.location.hash = "";
                },
                success: function (data) {
                	/*成功了关掉loading,放缓存，再拿给它*/
                    common.loading.off();
                    domAll.append(data);
                    fn(domAll.find("#"+tem).html());
                }
            });
		}
	}
	/*头部操作*/
	view.head={
		/*显示头部*/
		show:function(tem,data,callback){
			/*去拿模版*/
			view.head.listHide();
			view.head.bottomHide();
			getTem(tem,function(temReturn){
				/*拿完了把信息和模版合成*/
				var headString = _.template(temReturn)({data:data});
				/*放进头部*/
				$("#head").html(headString);
				/*播动画*/
				$("#head").attr("style","transform:translate(0px, -100%) translateZ(0px);opacity: 0");
				$("#main").css("top",$("#head").height()/common.size);
				$("#head").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)","opacity": 1});
				headDelay=setTimeout(function(){
				if(callback){
					/*完了告诉它*/
					callback();
				}	
				},1000);
				
			});
		},
		/*隐藏头部*/
		hide:function(callback){
			/*播动画*/
			view.head.listHide();
			view.head.bottomHide();
			$("#main").css("top","0px");
			$("#head").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, -100%) translateZ(0px)","opacity": 0});
			headDelay=setTimeout(function(){
				/*播完清空头部，重置样式，再告诉它*/
				$("#head").empty();
				$("#head").attr("style","transform:translate(0px, -100%) translateZ(0px)");
				if(callback){
					callback();
				}	
				},1000);
		},
		/*显示列表*/
		listShow:function(){
			$("#head .rightList").show();
			$("#headBg").show();
			$("#headBg").unbind("click").bind("click",function(){
				view.head.listHide();
			});
		},
		/*隐藏列表*/
		listHide:function(){
			$("#head .rightList").hide();
			$("#headBg").hide();
		},
		/*显示底部菜单*/
		bottomShow:function(){
			$("#head .bottom").show();
			$("#headBg").show();
			$("#headBg").unbind("click").bind("click",function(){
				view.head.bottomHide();
			});
		},
		/*隐藏底部菜单*/
		bottomHide:function(){
			$("#head .bottom").hide();
			$("#headBg").hide();
		}
	};
	/*头部弹出框*/
	view.headPop={
		show:function(data){
			var pop=_.template('<% _.each(data.list,function(point){ %>'+
			'<div class="headBottomPoint headBottomPoint<%= (data.list.length==3)?3:4 %>" id="<%= point.id %>">'+
				'<div class="headBottomIcon <%= point.icon %>"></div>'+
				'<div class="headBottomText"><%= point.text %></div>'+
			'</div>'+
			'<% }) %>')({data:data});
			$("#headPop .headPopMain").html(pop);
			$("#popBg").show();
			$("#headPop").show();
			$("#popBg,#headPop .headPopClose").unbind("click").bind("click",function(){
				view.headPop.hide();
			});
		},
		hide:function(){
			$("#popBg").hide();
			$("#headPop").hide();
			$("#headPop .headPopMain").empty();
		}
	};
	/*脚部操作*/
	view.foot={
		/*显示脚部*/
		show:function(tem,data,callback){
			/*去拿模版*/
			getTem(tem,function(temReturn){
				/*拿完了合成数据*/
				var headString = _.template(temReturn)({data:data});
				/*放到脚部*/
				$("#foot").html(headString);
				/*播动画*/
				$("#foot").attr("style","transform:translate(0px, 100%) translateZ(0px);opacity: 0");
				$("#main").css("bottom",$("#foot").height()/common.size);
				$("#foot").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)","opacity": 1});
				footDelay=setTimeout(function(){
				if(callback){/*播完告诉它*/
					callback();
				}	
				},1000);
			});
		},
		/*隐藏脚部*/
		hide:function(callback){
			/*播动画*/
			$("#main").css("bottom","0px");
			$("#foot").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 100%) translateZ(0px)","opacity": 0});
			footDelay=setTimeout(function(){
				/*播完清空，重置，再告诉它*/
				$("#foot").empty();
				$("#foot").attr("style","transform:translate(0px, 100%) translateZ(0px);opacity: 0");
				if(callback){
					callback();
				}	
				},1000);
		}
	};
	view.footPop={
		show:function(data){
			var pop=_.template(
				'<% if(data.list&&data.list.length){'+
					'_.each(data.list,function(point){ %>'+
						'<div class="footPopPoint" style="color:<%= point.color||"#007aff" %>"><%= point.text %></div>'+
				'<%	})'+
				'} %>')({data:data});
				$("#footPop .footPopMain").html(pop);
				$("#footPop").show();
				$("#popBg").show();
				$("#popBg,#footPop .footPopClose").unbind().bind("click",function(){
					view.footPop.hide();
				});
		},
		hide:function(){
			$("#footPop").hide();
			$("#popBg").hide();
		}
	};
	/*打开侧栏方法*/
	function sideShow(fn){
		/*播动画*/
		$("#main,#sideFrame,#head,#foot").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration": "1000ms","transform":"translate(614px, 0px) translateZ(0px)"});
			sideDelay=setTimeout(function(){/*播完告诉它*/
				if(fn){fn();}
			},1000);
	}
	/*侧栏操作*/
	view.side={
		/*显示侧栏*/
		show:function(fn){
			if($("#sideFrame").attr("haveload")==="1"){/*如果已经加载了，直接打开*/
				sideShow(fn);
			}else{/*如果没加载，先去拿模版*/
				getTem("side_tem",function(tem){
					/*放数据*/
					var sideStr=_.template(tem)({data:{
						icon:"img/head.jpg",
						name:"某人",
						step:["sun","sun","moon","moon","star","star"],
						ercode:"img/erCode.jpg"
					}});
					/*放进侧栏*/
					$("#sideFrame").html(sideStr);
					/*绑定事件*/
					$("#sideFrame #vip").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="vip";
					});
					$("#sideFrame #money").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="money";
					});
					$("#sideFrame #diyShow").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="diyShow";
					});
					$("#sideFrame #collect").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="collect";
					});
					$("#sideFrame #album").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="album";
					});
					$("#sideFrame #file").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="file";
					});
					$("#sideFrame #set").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="set";
					});
					$("#sideFrame #myDetail").unbind("tap").bind("tap",function(){
						$("body").attr("sideopen","0");
						view.side.hide();
						window.location.hash="myDetail";
					});
					/*做个标记*/
					$("#sideFrame").attr("haveload","1");
					/*然后打开*/
					sideShow(fn);
				});
			}
		},
		/*隐藏侧栏*/
		hide:function(fn){/*直接播动画，播完告诉它*/
			$("#main,#sideFrame,#head,#foot").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)","transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)"});
			sideDelay=setTimeout(function(){
				if(fn){fn();}
			},1000);
		}
	};
	/*主区操作*/
	view.main={
		tem:"",/*用于记录当前模版，方便重刷*/
		sugest:function(tem,data,state,type,callback){/*转场*/
			/*先去获取view模版*/
			getTem(tem,function(temReturn){
				/*记下来*/
				view.main.tem=temReturn;
				/*然后合数据*/
				var mainString=_.template(view.main.tem)({data:data});
				/*查看状态*/
				if(state){/*如果不是刷新或直接进入*/
					/*先放在新页层*/
					$("#pageNew").html(mainString);
					if(state===1){/*如果是正向进入，入栈，播正向转场动画*/
						typeArry.push(type);
						sugest[type](state);
					}else{/*如果是回退，播回退动画，出栈*/
						sugest[_.last(typeArry)](state);
						typeArry=_.initial(typeArry);
					}
				}else{/*刷新或直接进入，直接放*/
					$("#pageOld").html(mainString);
				}
				/*搞完了告诉它*/
				if(callback){callback();}
			});
		},
		/*重刷*/
		reflash:function(data){/*从标记中拿模版，合上新数据，刷*/
			var reflashString=_.template(view.main.tem)({data:data});
			$("#pageOld").html(reflashString);
		}
	};
	/*转场库*/
	var sugest={
			show:function(state){/*显隐渐变，正反向一样*/
					$("#pageOld").attr("style","transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 1000ms;opacity: 0;");
					segestDelay=setTimeout(function(){
						pageChange();
					},1000);
			},
			side:function(state){/*侧滑*/
				if(state===1){/*正向*/
					$("#pageNew").attr("style","z-index:3;transform:translate(100%, 0px) translateZ(0px)");
					segestDelay=setTimeout(function(){
						$("#pageNew").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)","opacity": 1});
						segestDelay=setTimeout(function(){
							pageChange();
						},1000);
					},50);
				}else{/*回退*/
					$("#pageNew").attr("style","opacity: 1;");
					$("#pageOld").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(100%, 0px) translateZ(0px)","opacity": 0});
					segestDelay=setTimeout(function(){
						pageChange();
					},1000);
				}
			},
			top:function(state){/*上下*/
				if(state===1){/*正向*/
					$("#pageNew").attr("style","z-index:3;transform:translate(0px, -100%) translateZ(0px);opacity: 0");
					segestDelay=setTimeout(function(){
					$("#pageNew").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)","opacity": 1});
					segestDelay=setTimeout(function(){
						pageChange();
					},1000);
					},50);
				}else{/*回退*/
					$("#pageNew").attr("style","opacity: 1;");
					segestDelay=setTimeout(function(){
					$("#pageOld").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, -100%) translateZ(0px)","opacity": 0});
					segestDelay=setTimeout(function(){
						pageChange();
					},1000);
					},50);
				}
			},
			size:function(state){/*缩放*/
				if(state===1){/*正向*/
					$("#pageNew").attr("style","z-index:3;transform: scale(0.1);opacity: 0;");
					segestDelay=setTimeout(function(){
					$("#pageNew").css({"transition-timing-function": "cubic-bezier(0.5, 0.1, 0.5, 1)", "transition-duration": "1000ms","transform":"scale(1)","opacity": 1,"z-index":3});
					segestDelay=setTimeout(function(){
						pageChange();
					},1000);
				},50);	
				}else{/*回退*/
					$("#pageNew").attr("style","opacity: 1;");
					$("#pageOld").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"scale(0.1)","opacity": 0});
					segestDelay=setTimeout(function(){
						pageChange();
					},1000);
				}
			}
	};
});