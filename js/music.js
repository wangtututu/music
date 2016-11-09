define(["jquery"],function($){
	
	return {
		
		"getlist":function(callback){
			
			$.get("music.json",{},function(result){
				
				callback(result.data)
				
			},"json")
			//console.log("动态加载音乐文件");
			
		}/*,
		
		"getlrc":function(callback){
			
			$.get("song/下一秒.lrc",{},function(result){
				
				callback(result)
				
			},"text")
			
		}*/
		
		
		
	}
	
})