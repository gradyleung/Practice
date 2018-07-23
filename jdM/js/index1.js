window.onload = function(){
    search();
    secondkill();
    // 搜索栏透明度
};
    var search = function(){
        var search = document.getElementsByClassName("header_box")[0];
        // var top = document.documentElement.scrollTop || document.body.scrollTop;
        var jd_nav = document.getElementsByClassName("jd_carousel")[0];
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
    var seckill_time = document.getElementsByClassName("seckill_time")[0];
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
