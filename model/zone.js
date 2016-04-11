define("model/zone",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
    var user=require("model/user");
    var zone=require("model/zone");
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
	var model={};
	module.exports=model;
	/*获取聊天记录*/
		function getList(fn){
			var self=user.loginMessage();
			var result=_.filter(cache,function(point){
				return (point.user==self.id||_.some(self.friend.checked,function(friendPoind){
					return friendPoind.id==point.user
				}))
			});
			if(result&&result.length){
				fn(result);
			}else{
				fn(false);
			}
		};
		/*赞*/
		function praise(zid,id,fn,end){
			cache[zid].praise.push(id);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.praise(zid,id,fn,true);	
				}
			});
		};
		/*取消赞*/
		function cancelPraise(zid,id,fn,end){
			cache[zid].praise=_.without(cache[zid].praise,id);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.cancelPraise(zid,id,fn,true);
				}
			});
		};
		/*关注*/
		function attention(zid,id,fn,end){
			cache[zid].attention.push(id);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.attention(zid,id,fn,true);
				}
			});
		};
		/*取消关注*/
		function cancelAttention(zid,id,fn,end){
			cache[zid].attention=_.without(cache[zid].attention,id);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.cancelAttention(zid,id,fn,true);
				}
			});
		};
		/*看了*/
		function readed(zid,id,fn,end){
			cache[zid].readed.push(id);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.readed(zid,id,fn,true);
				}
			});
		};
		/*分享*/
		function share(zid,id,fn,end){
			cache[zid].share.push(id);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.share(zid,id,fn,true);
				}
			});
		};
		/*回复*/
		function reply(zid,id,to,text,fn,end){
			cache[zid].reply.push({form:id,to:to,text:text,readed:false,time:new Date().getTime()});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.reply(zid,id,to,text,fn,true);
				}
			});
		};
		/*发帖*/
		function add(text,pic,fn){
			var self=user.loginMessage();
			var newId=common.uuid();
				cache[newId]={
					id:newId,
					time:new Date().getTime(),
					icon:self.icon,
					name:self.name,
					user:self.id,
					text:text,
					pic:pic,
					praise:[],
					attention:[],
					readed:[],
					share:[],
					reply:[]	
				};
				set(fn);
		};
		model.getList=function(fn){
			getList(fn);
		};
		model.praise=function(zid,id,fn,end){
			praise(zid,id,fn,end);
		};
		model.cancelPraise=function(zid,id,fn,end){
			cancelPraise(zid,id,fn,end);
		};
		model.attention=function(zid,id,fn,end){
			attention(zid,id,fn,end);
		};
		model.cancelAttention=function(zid,id,fn,end){
			cancelAttention(zid,id,fn,end);
		};
		model.readed=function(zid,id,fn,end){
			readed(zid,id,fn,end);
		};
		model.share=function(zid,id,fn,end){
			share(zid,id,fn,end);
		};
		model.reply=function(zid,id,to,text,fn,end){
			reply(zid,id,to,text,fn,end);
		};
		model.add=function(text,pic,fn){
				add(text,pic,fn);
		};
});