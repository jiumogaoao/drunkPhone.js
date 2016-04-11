define("model/album",function(require, exports, module) {
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
			callback(true);
		};
	}
	get();
	function creat(aid,name,dsc,type,fn,end){
			var self=user.loginMessage();
			if(!aid&&!end){
				aid=common.uuid();
			};
			cache[aid]={
				id:aid,
				name:name,
				icon:"",
				dsc:dsc,
				user:self.id,
				type:type,
				time:new Date().getTime(),
				list:[]
			};
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.creatAlbum(aid,name,dsc,type,fn,true);	
				}
			});
		};
		/*删除相册*/
		function remove(aid,fn,end){
			delete cache[aid];
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.removeAlbum(aid,fn,true);	
				}
			});
		};
		/*添加图片*/
		function addPic(aid,src,fn){
			cache[aid].list.push({
				id:common.uuid(),
				src:src,
				time:new Date().getTime(),
				name:""
			});
			set(fn);
		};
		/*删除图片*/
		function removePic(pid,aid,fn){
			cache[aid].list=_.reject(cache[aid].list,{id:pid});
			set(fn);
		};
		/*获取相册列表*/
		function getAlbumList(uid,fn){
			var self=user.loginMessage();
			if(!uid){
				uid=self.id;
			}
			var showList=_.filter(cache,function(point){
				return point.user==uid
			});
			if(fn){
				fn(showList);
			}
		}

		/*设置封面*/
		function setIcon(aid,url,fn){
			cache[aid].icon=url;
			set(fn);
		};
		module.exports.creat=function(aid,name,dsc,type,fn,end){
			creat(aid,name,dsc,type,fn,end);
		};
		module.exports.remove=function(aid,fn,end){
			remove(aid,fn,end);
		};
		module.exports.addPic=function(aid,src,fn){
			addPic(aid,src,fn);
		}
		module.exports.removePic=function(pid,aid,fn){
			removePic(pid,aid,fn);
		}
		module.exports.getAlbumList=function(uid,fn){
			getAlbumList(uid,fn);
		}
		module.exports.setIcon=function(aid,url,fn){
			setIcon(aid,url,fn);
		}
});