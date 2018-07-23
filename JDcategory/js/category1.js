window.onload = function(){
    initLeft();
    // initRight();
};

// 左侧分类
function initLeft(){
    // 父容器
    var parentDom = document.getElementsByClassName("jd_catLeft")[0];
    var rightDom = document.getElementsByClassName("jd_catRight")[0];
// parentDom.getElementsByTagName('ul')[0];
    // 子容器
    var childDom = document.getElementsByClassName("jd_leftbox")[0];
    var liDom = childDom.getElementsByTagName('li');

    // 取得父容器内容的高度
    var parentH = parentDom.offsetHeight - 45;
    
    // 取得子容器的高度
    var childH = childDom.offsetHeight;

    // 添加过度
    var addTransition = function(){
        childDom.style.transition = "all 0.3s ease 0";
    };
    // 删除过度
    var removeTransition = function(){
        childDom.style.transition = "none";
    };
    var startY = 0;//开始时的Y坐标
    var endY = 0;//结束时的Y坐标
    var moveY = 0;//滑动的距离 起点到终点
    var currY = 0;//当前translateY的值
    //滑动时候限制的最大滑动距离以及最小滑动距离
    var maxY = 150; minY = -(childH - parentH +150);
    //点击时间
    var startTime = 0,endTime = 0;

    childDom.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
        startTime = new Date().getTime();//满足按住显示相应购物栏的响应
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        console.log(moveY);
        if((currY - moveY) <= maxY && ((currY - moveY) >= minY)){
            removeTransition();
            childDom.style.transform = "translateY("+(currY-moveY)+ "px)";
        }
        
    });
    childDom.addEventListener('touchend',function(e){
        //滑动结束记录当前translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){ 
        currY = currY - moveY;}
        //当超过了0的时候让子容器弹回去
        else if((currY - moveY) >0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY(" +(currY) + "px)";
        }
        else if((currY - moveY)< -(childH - parentH)){
            currY = parentH - childH;
            addTransition();
            childDom.style.transform = "translateY(" + (currY) +"px)";
        }
        endTime = new Date().getTime();

        if(moveY == 0 && endTime-startTime < 200){
            var target = e.target.parentNode;//留意target用法
            //清除元素的类名
            for(i = 0 ; i<liDom.length;i++){
                liDom[i].className = " ";
                liDom[i].index = i;
            }
            target.className= "now";
        //计算需要滚动的高度
        var top = target.index*50;
        console.log(top);
        if(top <(childH - parentH)){
            addTransition();
            childDom.style.transform = "translateY(" + (-top)  + "px)";
            currY = -top;
        }
        else{
            addTransition();
            childDom.style.transform = "translateY(" + (parentH - childH) + "px)";
            currY = parentH - childH;
        }
        
        rightDom.style.transition = "all 0.2s ease 0s";
        rightDom.style.opacity = 0;
        setTimeout(function(){
            rightDom.style.opacity = 1;
        },300);
    }
    //把参数清0
    startY = 0;
    endY = 0;
    moveY = 0;
});
};
