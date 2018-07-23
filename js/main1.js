$(function(){

    function resize(){
        var windowwidth = $(window).width();
        var smallscreen  =windowwidth < 768;
        $('#main_ad> .carousel-inner >.item').each(function(i,item){
            var $item = $(item);
            var imgScr = smallscreen?$item.data('image-xs'):$item.data('image-lg');

            $item.css('backgroundImage','url("'+imgScr+'")');

            if(smallscreen){
                $item.html('<img src="'+imgScr+'"alt=""/>');
            }else{
                $item.empty();
            }
        });
    }
$(window).on('resize', resize).trigger('resize');

//初始化tooltip插件
    $('[data-toggle="tooltip"]').tooltip();

    // 控制标签宽度

    var $Ulscrollbar = $('.nav-tabs');
    var width = 30;

    $Ulscrollbar.children().each(function(index,element){
        width += element.clientWidth;
    });
    // 判断UL宽度是否超过屏幕，如果超过才显示滚动条
    if(width > $(window).width()) {
    $Ulscrollbar
    .css('width', width)
    .parent().css('overflow-x','scroll');
    }
    
    //切换新闻窗口
    $newstitle = $('.newstitle');
    $('#news .nav-pills a').on('click',function(){
        title = $(this).data('title');
        $newstitle.text(title);
    });
    //获取界面上的carousel
    var $carousels = $('.carousel');
    var startX;
    var endX;
    // 触碰的第一次坐标
    $carousels.on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchmove',function(e){
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend',function(e){
        var distance = Math.abs(startX - endX);
        console.log(startX > endX ? '←' : '→');
        if(distance>50){
            $(this).carousel(startX>endX? 'next':'prev');
        }
    });

});