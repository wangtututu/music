$(function(){
	$.get("music.json",{},function(result){
		var data = result.data;
		//console.log(data);
		
		var html = "";
		
		for(var i=0,len = data.length; i<len; i++){
			var item = data[i];
			html += "<li data-src='"+ item.src +
						"' data-lrc='"+ item.lrc +"'>" + 
						item.name +
					"</li>";
		}
		$(".music-list").html(html);
	},"json");

});
//歌词处理
function musicLrc(result){
	console.log(result)
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
	
	$(".contain").html(arr.join(""));
}

$(function(){
	var audio = $("#audio").get(0);
	//给 未来元素绑定 事件
	//事件代理
	$(".music-list").on("click","li",function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		var src = $(this).data("src");
		var lrc = $(this).data("lrc");
		
		
		audio.src = src;
		audio.currentTime = 0;
		audio.play();
		
		$.get(lrc,{},function(result){
			musicLrc(result);
		},"text");
	});
	var Interval;
	$(audio).on("play",function(){
		clearInterval(Interval);
		
		Interval = setInterval(function(){
			
			var time = parseInt(audio.currentTime);
			//var time = audio.currentTime;
			//time = time.toFixed(2)
			//console.log(time)
			var $active = $(".j-tiem-"+time);
			//console.log($active);
			//console.log($active.length)
			if($active.length == 2){
				
				$active = $(".j-tiem-"+time).get(0);
				//console.log(typeof $active);
				
			}
			
			//console.log($step)
			$active.addClass("active");
			$active.siblings(".active").removeClass("active");
			var $index = $('p.active').prevAll().length;
			var $step = 200 - $index *24 +"px";
			//console.log($index)
			
			$('.contain').css("transform","translateY("+$step+")")
			//console.log($('.contain').css("transform"))
		},1000);
	});
	
	$(audio).on("pause",function(){
		clearInterval(Interval);
	});
});

//
//$(function(){
//	var time = "00:01.00";
//	console.log(time);
//	new Date("1970-01-01 00:00:00").getTime()
//})
