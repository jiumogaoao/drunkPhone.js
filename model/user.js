define("model/user",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
	var zone=require("model/zone");
	var group=require("model/group");
	var album=require("model/album");
	var get=function(){
		if(!inited){
			if(common.cache(module.id)){
				cache=common.cache(module.id);
			}
				inited=true;
				};
	}
	var set=function(callback){
		/*把数据推送到数据源*/
		common.cache(module.id,cache);
		if(callback){
			callback(true);
		};
	}
	get();
	
		/*登录信息*/
		var loginMessage=null;
		if(common.cache("loginMessage")){
			loginMessage=common.cache("loginMessage");
		}
		/*登录*/
		function login(name,key,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				if(fn){fn(false);}
				return false;
			};
			var result=_.find(cache,function(point){
				return (point.name==name&&point.key==key)||(point.phone==name&&point.key==key)
			});
			if(result){
				loginMessage=_.omit(result,'key');
				common.cache("loginMessage",_.omit(result,'key'));

				if(fn){fn(true);}
			}else{
				common.pop.on("账号或密码错误");
				if(fn){fn(false);}
			}
		};
		/*注册*/
		function regest(name,key,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				if(fn){fn(false);}
				return false;
			};
			if(_.findWhere(cache,{name:name})){
				common.pop.on("注册手机已有");
				if(fn){fn(false);}
			}else{/*写入*/
				var newId=common.uuid();
				cache[newId]={
					id:newId,
					name:name,
					phone:name,
					key:key,
					step:["star"],
					stepDay:0,
					icon:"img/head.jpg",
					background:"img/myDetailBg.jpg",
					zoneBackground:"img/zoneBg.jpg",
					dsc:"",
					mood:"",
					sex:0,
					province:"",
					city:"",
					birthday:0,
					job:"",
					company:"",
					school:"",
					hometown:"",
					email:"",
					mine:{
						interested:"",
						music:"",
						idol:"",
						readed:"",
						heared:""
					},
					album:[],
					group:{
						creat:[],
						admin:[],
						member:[]
					},
					money:0,
					vip:null,
					vipDay:0,
					diy:{
						pop:null,
						redpacket:null,
						style:null,
						font:null,
						ticket:null,
						call:null,
						background:null,
						face:null,
						music:null,
						suit:null,
						pandant:null
					},
					collection:[],
					file:[],
					praise:[],
					attention:[],
					readed:[],
					totalReaded:[],
					share:[],
					reply:[],
					friend:{
						checked:[],
						request:[],
						response:[],
						reject:[]
					},
					friendGroup:{
						"all":{id:"all",name:"我的好友"}
					}
				};
				set(fn);
			}
		};
		/*添加好友*/
		function addFriend(to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				if(fn){fn(false);}
				return false;
			};
			if(!_.contains(cache[to].friend.reject, loginMessage.id)){
				cache[loginMessage.id].friend.request.push({id:to,time:new Date().getTime()});
				cache[to].friend.response.push({id:loginMessage.id,time:new Date().getTime()});
				set(fn);
			}else{
				if(fn){fn(false);}
			}
		};
		/*拒绝添加好友*/
		function rejectFriend(from,to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[to].friend.reject.push({id:from,time:new Date().getTime()});
			cache[from].friend.request=_.reject(cache[from].friend.request,{id:to});
			cache[to].friend.response=_.reject(cache[from].friend.response,{id:from});
			set(fn);
		};
		/*确认添加好友*/
		function checkFriend(to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[loginMessage.id].friend.checked.push({id:to,time:new Date().getTime(),groupId:"all"});
			cache[to].friend.checked.push({id:loginMessage.id,time:new Date().getTime(),groupId:"all"});
			cache[to].friend.request=_.reject(cache[to].friend.request,{id:loginMessage.id});
			cache[loginMessage.id].friend.response=_.reject(cache[loginMessage.id].friend.response,{id:to});
			set(fn);
		};
		/*删除好友*/
		function removeFriend(from,to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[to].friend.reject.push({id:from,time:new Date().getTime()});
			cache[from].friend.checked=_.reject(cache[from].friend.checked,{id:to});
			cache[to].friend.checked=_.reject(cache[from].friend.checked,{id:from});
			set(fn);
		};
		/*赞*/
		function praise(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].praise.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.praise(zid,id,fn,true);	
				}
			});
		};
		/*取消赞*/
		function cancelPraise(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].praise=_.without(cache[id].praise,zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.cancelPraise(zid,id,fn,true);
				}
			});
		};
		/*关注*/
		function attention(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].attention.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.attention(zid,id,fn,true);
				}
			});
		};
		/*取消关注*/
		function cancelAttention(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].attention=_.without(cache[id].attention,zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.cancelAttention(zid,id,fn,true);
				}
			});
		};
		/*看了*/
		function readed(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].readed.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.readed(zid,id,fn,true);
				}
			});
		};
		/*分享*/
		function share(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].share.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.share(zid,id,fn,true);
				}
			});
		};
		/*回复*/
		function reply(zid,id,to,text,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].reply.push({form:id,to:to,text:text,readed:false,time:new Date().getTime(),zid:zid});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.reply(zid,id,to,text,fn,true);
				}
			});
		};
		/*创建组*/
		function creatGroup(gid,name,icon,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			if(!gid&&!end){
				gid=app.uuid();
			}
			cache[loginMessage.id].group.creat.push(gid);
			set(function(){
				if(end){
					if(fn){fn(gid);}
				}else{
					group.add(gid,name,icon,fn,true);
				}
			});
		};
		/*加入组*/
		function joinGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			if(!uid){
				uid=loginMessage.id;
			}
			cache[uid].group.member.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.join(gid,uid,fn,true);
				}
			});
		};
		/*退出组*/
		function outGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.member=_.without(cache[uid].group.member,gid);
			cache[uid].group.creat=_.without(cache[uid].group.creat,gid);
			cache[uid].group.admin=_.without(cache[uid].group.admin,gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.out(gid,uid,fn,true);
				}
			});
		};
		/*添加管理员*/
		function addAdminGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.member=_.without(cache[loginMessage.id].group.member,gid);
			cache[uid].group.admin.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.addAdmin(gid,uid,fn,true);
				}
			});
		};
		/*去除管理员*/
		function cancelAdminGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.admin=_.without(cache[loginMessage.id].group.member,gid);
			cache[uid].group.member.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.cancelAdmin(gid,uid,fn,true);
				}
			});
		};
		/*创建相册*/
		function creatAlbum(aid,name,dsc,type,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[loginMessage.id].album.push(aid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					album.creat(aid,name,dsc,type,fn,true);
				}
			});
		};
		/*删除相册*/
		function removeAlbum(aid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[loginMessage.id].album=_.without(cache[loginMessage.id].album,aid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					album.remove(aid,fn,true);
				}
			});
		};
		/*搜索没添加的人*/
		function searchNotFriend(fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var returnList=[];
			var searchList=_.reject(cache, function(point){
			 return _.some(point.friend.checked,{id:loginMessage.id})||point.id==loginMessage.id; 
			});
			_.each(searchList,function(point){
				returnList.push(_.pick(point,'id','name','icon','dsc'));
			});
			if(fn){fn(returnList);}
		}
		/*返回好友列表*/
		function getFriendList(fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var returnObj={
				checked:[],
				request:[],
				response:[],
				reject:[],
				friendGroup:cache[loginMessage.id].friendGroup
			};
			_.each(cache[loginMessage.id].friend.checked,function(point){
				var addObj=_.pick(cache[point.id],'id','name','icon','dsc');
				addObj.time=point.time;
				addObj.groupId=point.groupId;
				returnObj.checked.push(addObj);
			});
			_.each(cache[loginMessage.id].friend.request,function(point){
				var addObj=_.pick(cache[point.id],'id','name','icon','dsc');
				addObj.time=point.time;
				returnObj.request.push(addObj);
			});
			_.each(cache[loginMessage.id].friend.response,function(point){
				var addObj=_.pick(cache[point.id],'id','name','icon','dsc');
				addObj.time=point.time;
				returnObj.response.push(addObj);
			});
			_.each(cache[loginMessage.id].friend.reject,function(point){
				var addObj=_.pick(cache[point.id],'id','name','icon','dsc');
				addObj.time=point.time;
				returnObj.reject.push(addObj);
			});
			fn(returnObj);
		}
		function editDetail(editData,fn){
			editData=_.pick(editData,"name","sex","birthday","job","company","school","province","city","hometown","email","dsc");
			cache[loginMessage.id]=_.extend(cache[loginMessage.id],editData);
			loginMessage=_.omit(cache[loginMessage.id],"key");
			common.cache("loginMessage",_.omit(cache[loginMessage.id],'key'));
			set(fn);
		}
		function changeBackground(src,fn){
			cache[loginMessage.id].background=src;
			loginMessage.background=src;
			common.cache("loginMessage",_.omit(cache[loginMessage.id],'key'));
			set(fn);
		}
		function changeIcon(src,fn){
			cache[loginMessage.id].icon=src;
			loginMessage.icon=src;
			common.cache("loginMessage",_.omit(cache[loginMessage.id],'key'));
			set(fn);
		}
		module.exports.loginMessage=function(){
			return loginMessage;
		}
		module.exports.login=function(name,key,fn){
			login(name,key,fn);
		};
		module.exports.regest=function(name,key,fn){
			regest(name,key,fn);
		};
		module.exports.addFriend=function(to,fn){
			addFriend(to,fn);
		};
		module.exports.rejectFriend=function(from,to,fn){
			rejectFriend(from,to,fn)
		};
		module.exports.checkFriend=function(to,fn){
			checkFriend(to,fn);
		};
		module.exports.removeFriend=function(from,to,fn){
			removeFriend(from,to,fn);
		};
		module.exports.praise=function(zid,id,fn,end){
			praise(zid,id,fn,end);
		};
		module.exports.cancelPraise=function(zid,id,fn,end){
			cancelPraise(zid,id,fn,end);
		};
		module.exports.attention=function(zid,id,fn,end){
			attention(zid,id,fn,end);
		};
		module.exports.cancelAttention=function(zid,id,fn,end){
			cancelAttention(zid,id,fn,end);
		};
		module.exports.readed=function(zid,id,fn,end){
			readed(zid,id,fn,end);
		};
		module.exports.share=function(zid,id,fn,end){
			share(zid,id,fn,end);
		};
		module.exports.reply=function(zid,id,to,text,fn,end){
			reply(zid,id,to,text,fn,end);
		};
		module.exports.creatGroup=function(gid,name,icon,fn,end){
			creatGroup(gid,name,icon,fn,end);
		};
		module.exports.joinGroup=function(gid,uid,fn,end){
			joinGroup(gid,uid,fn,end);
		};
		module.exports.outGroup=function(gid,uid,fn,end){
			outGroup(gid,uid,fn,end);
		};
		module.exports.addAdminGroup=function(gid,uid,fn,end){
			addAdminGroup(gid,uid,fn,end);
		};
		module.exports.cancelAdminGroup=function(gid,uid,fn,end){
			cancelAdminGroup(gid,uid,fn,end);
		};
		module.exports.creatAlbum=function(aid,name,dsc,type,fn,end){
			creatAlbum(aid,name,dsc,type,fn,end);
		}
		module.exports.removeAlbum=function(aid,fn,end){
			removeAlbum(aid,fn,end);
		};
		module.exports.searchNotFriend=function(fn){
			searchNotFriend(fn);
		};
		module.exports.getFriendList=function(fn){
			getFriendList(fn);
		};
		module.exports.editDetail=function(editData,fn){
			editDetail(editData,fn);
		};
		module.exports.changeBackground=function(src,fn){
			changeBackground(src,fn);
		}
		module.exports.changeIcon=function(src,fn){
			changeIcon(src,fn);
		}
});