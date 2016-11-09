define(["jquery"],function($){
	var lrc = $(".lrc").get(0);
	return {
		"lrc" : function(){
			var lrcs = result.split("\n");
			var arr = [];
			lrcs.forEach(function(item,i){
				var lastIndexOf = item.lastIndexOf("]");
				var str2 = item.substring(lastIndexOf +1 );
		//		if(str2 == ""){
		//			str2 = "..."
		//		}
				//console.log(str2)
				//第一个是 . 开头
				//第二个 . 表示任意字符
				// * 表示出现0 次或多次 （任意次数）
				//var time = item.substr(1,lastIndexOf - 1).replace(/\..*/g,"");
				var time = item.substr(1,lastIndexOf - 1)
				//console.log(time)
				time = new Date("1970-01-01 00:"+time).getTime();
				var time2 = new Date("1970-01-01 00:00:00").getTime();
				
				var time3 = Math.round((time - time2) / 1000) - 1;
				//time3 = time3.toFixed(2)
				arr.push("<p class='j-tiem-"+ time3 +"'>"+ str2 +"</p>");
				//console.log(time3/1000)
			});
			
			lrc.html(arr.join(""));
				}
			}
});