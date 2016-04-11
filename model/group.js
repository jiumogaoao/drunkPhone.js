define("model/group",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
	var user=require("model/user");
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
			callback();
		};
	}
	get();
	/*创建组*/
		function add(gid,name,icon,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			if(!gid&&!end){
				gid=common.uuid();
			}
			var self=user.loginMessage();
			cache[gid]={
				id:gid,
				name:name,
				dsc:"",
				icon:icon,
				type:0,
				file:[],
				album:[],
				publics:"",
				action:[],
				sign:[],
				vote:[],
				link:"",
				app:[],
				member:[{id:self.id,nickName:"",type:"owner"}]
			};
			set(function(){
				if(end){
					if(fn){fn(gid);}
				}else{
					user.creatGroup(gid,name,icon,fn,true);	
				}
			});
		};
		function join(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var self=user.loginMessage();
			if(!uid){
				uid=self.id
			}
			cache[gid].member.push({id:uid,nickName:"",type:"owner"});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.joinGroup(gid,uid,fn,true);	
				}
			});
		};
		function out(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var self=user.loginMessage();
			cache[gid].member=_.reject(cache[gid].member,{id:uid});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.outGroup(gid,uid,fn,true);	
				}
			});
		};
		function addAdmin(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			_.findWhere(cache[gid].member,{id:uid}).type="admin";
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.addAdminGroup(gid,uid,fn,true);	
				}
			});
		};
		function cancelAdmin(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			_.findWhere(cache[gid].member,{id:uid}).type="member";
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.cancelAdminGroup(gid,uid,fn,true);	
				}
			});
		};
		function searchNotGroup(fn){
			var self=user.loginMessage();
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var returnList=_.reject(cache, function(point){
			 return _.some(point.member,{id:self.id}); 
			});
			if(fn){fn(returnList);}
		}
		function getList(idArry,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var returnObj={};
			_.each(idArry,function(point){
				returnObj[point]=_.pick(cache[point],"id","name","dsc","type","icon");
			});
			fn(returnObj);
		}
		function getMyList(fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var self=user.loginMessage();
			var list=_.filter(cache,function(point){
				return _.some(point.member,{id:self.id});
			});
			var returnObj=[];
			_.each(list,function(point){
				returnObj.push(_.pick(point,"id","name","dsc","type","icon","member"));
			});
			returnObj=_.groupBy(returnObj,function(point){
				return _.findWhere(point.member,{id:self.id}).type;
			});
			fn(returnObj);
		}
		module.exports.add=function(gid,name,icon,fn,end){
			add(gid,name,icon,fn,end);
		};
		module.exports.join=function(gid,uid,fn,end){
			join(gid,uid,fn,end);
		};
		module.exports.out=function(gid,uid,fn,end){
			out(gid,uid,fn,end);
		};
		module.exports.addAdmin=function(gid,uid,fn,end){
			addAdmin(gid,uid,fn,end);
		};
		module.exports.cancelAdmin=function(gid,uid,fn,end){
			cancelAdmin(gid,uid,fn,end);
		};
		module.exports.searchNotGroup=function(fn){
			searchNotGroup(fn);
		}
		module.exports.getList=function(idArry,fn){
			getList(idArry,fn);
		}
		module.exports.getMyList=function(fn){
			getMyList(fn);
		}
});
