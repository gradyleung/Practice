window.onload = function(){
    search();
    secondkill();
    Scrolltip();
    // 搜索栏透明度
};
    var search = function(){
        var search = document.getElementsByClassName("header_box")[0];
        // var top = document.documentElement.scrollTop || document.body.scrollTop;
        var jd_nav = document.getElementsByClassName("jd_banner")[0];
        var height = jd_nav.offsetHeight;
        window.onscroll = function(){
            var top= document.documentElement.scrollTop || document.body.scrollTop;
        if(top > height){
            search.style.background= "rgba(201,21,35,0.85)";
        }else{
            var op = top/height*0.85;
            search.style.background= "rgba(201,21,35,"+op+")";
        }
    };
};
// 秒杀倒计时
var secondkill =function(){
    // var seckill_time = document.getElementsByClassName("seckill_time")[0];
    var timelist = document.getElementsByClassName("num");
    var times = 4 * 60 * 60;

    setInterval(function(){
        times --;
        var h = Math.floor(times/60/60);
        var m = Math.floor(times/60%60);
        var s = times%60;

        timelist[0].innerHTML = h>10? Math.floor(h/10):0;
        timelist[1].innerHTML = h%10;
        timelist[2].innerHTML = m>10? Math.floor(m/10):0;
        timelist[3].innerHTML = m%10;
        timelist[4].innerHTML = s>10? Math.floor(s/10):0;
        timelist[5].innerHTML = s%10;
    },1000);
};
// 轮播图
var Scrolltip = function(){
    var banner = document.getElementsByClassName("jd_banner")[0];
    // 获得图片的宽度
    var width = banner.offsetWidth;
    // 获取图片的box
    var pic_box = banner.getElementsByTagName("ul")[0];
    // 获取每个点的box
    var point_box = banner.getElementsByTagName("ul")[1];
    // 获取每个图片
    var pic = pic_box.getElementsByTagName("li");
    //获取每个点
    var points = point_box.getElementsByTagName("li");
        points[0].style.backgroundColor = "#fff";

    var timer;
    var index = 1 ;

    var addtransition = function(){
        pic_box.style.transition = "all 0.3s ease 0s";
    };
    var removetransition = function(){
        pic_box.style.transition = "none" ;
    };
    // 改变位置
    var movetransition = function(t){
        pic_box.style.transform = 'translateX('+ t + 'px)' ;
    };  

    timer = setInterval(function(){
        index ++;
        addtransition();
        movetransition(-index*width);
        pointcolor();
        // console.log("定时器");
    },1000);
    
    var pointcolor = function(){
        for(i = 0 ; i < 8; i ++){
        points[i].style.backgroundColor ="";
    }
        if(index>0 && index<9){
        points[index-1].style.backgroundColor = "#fff";
        }
        else if(index = 0){
            points[7].style.backgroundColor = "#fff";
        }else if(index = 9){
            points[0].style.backgroundColor = "#fff";
        }
    };
        pic_box.addEventListener("transitionend",function(){
        // console.log("过度完成");
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8;
        }
        removetransition(); 
        movetransition(-index*width);
    },false);
    //滑动前进后退页面
    var startX;
    var endX;

    pic_box.addEventListener("touchstart",function(e){
        startX = e.touches[0].clientX;
        });
    banner.addEventListener("touchmove",function(e){
        endX =  e.touches[0].clientX;
    });
    pic_box.addEventListener("touchend",function(e){
          var distance = Math.abs(startX - endX);
          console.log(distance);
        if (distance > 50){
            startX > endX ? index++ : index--;
            addtransition();
            movetransition(-index*width);
            clearInterval(timer);
            timer = setInterval(function(){
                index ++;
                addtransition();
                movetransition(-index*width);
            },1000);
        }
    });
}
