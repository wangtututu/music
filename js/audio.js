define(["jquery"],function($){
	var audio = $("#audio").get(0);
	var Interval;
	return {
		"play" : function(){
			clearInterval(Interval);
			Interval = setInterval(function(){
			
			var time = parseInt(audio.currentTime);
			//var time = audio.currentTime;
			//time = time.toFixed(2)
			console.log(time)
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
			audio.play();
		},
		"pause" : function(){
			audio.pause();
			clearInterval(Interval);
		},
		"checkout" : function(src){
			audio.src = src;
			audio.currentTime = 0;
			audio.play();
		},
		"lrc" : function(lrc){
			
			$.get(lrc,{},function(result){
				
				var lrc = result.split("\n");
					//console.log(lrc)
					var arr = [];
					lrc.forEach(function(item,i){
						var lastIndexOf = item.lastIndexOf("]");
						var str2 = item.substring(lastIndexOf +1 );
						var time = item.substr(1,lastIndexOf - 1)
						//console.log(time)
						time = new Date("1970-01-01 00:"+time).getTime();
						var time2 = new Date("1970-01-01 00:00:00").getTime();
						
						var time3 = Math.round((time - time2) / 1000) ;
						//time3 = time3.toFixed(2)
						arr.push("<p class='j-tiem-"+ time3 +"'>"+ str2 +"</p>");
								
					})
					
					$('.contain').html(arr.join(""));
				
			},"text")
			
		}
	}
});