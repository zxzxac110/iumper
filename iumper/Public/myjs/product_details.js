$(function(){
    var lid=location.search.split("=")[1]
    if(!lid||lid>20){lid=1}
    if(lid){
    $.ajax({
        url:"http://127.0.0.1:8080/details/v1",
        type:"get",
         data:{lid},
        dataType:"json",
        success:function(result){
                console.log(result)
                var {product,leftshop,imgs}=result;
                var {title,price,colour,edition,stock}=product[0];           
/*图片引入*/
                var htmlimg=""
                /*中图*/
                $("#div-mImg").html(`<img  src=${imgs[0].picture_sm} alt=""/>`)
                /*小图*/
                for(var img of imgs){
                if(img!=imgs[0]){       /*第一张不用*/
                    htmlimg+=`<li>
                    <img src=${img.picture_sm} alt=""/>
                    </li>`
                    }
                }
                $("#ulsImg").html(htmlimg)
/*产品数据引入*/
        var htmlPOR=""
        if(colour){
         htmlPOR=`<h2 class="Computer-title">${title}</h2>
            <div class="fontE50">￥${price.toFixed(2)}</div>
           <div class="Computer-color">颜色：
                <ul>
                    <li>${colour}</li>
                </ul>
            </div>
            <div class="Computer-color">版本：
                <ul>
                    <li class="px20">${edition}</li>
                </ul>
            </div>
            <div class="Computer-quantity">
                <span>数量:</span>
                <img src="Public/images/jj1.png" alt=""/>
                <input type="text" value="1" />
                <img src="Public/images/jj0s.png" alt=""/>
                <span class="font999">库 存：${stock}</span>
            </div>`
        }else{
        htmlPOR=`<h2 class="Computer-title">${title}</h2>
            <div class="fontE50">￥${price.toFixed(2)}</div>
            <div class="Computer-quantity">
                <span>数量:</span>
                <img src="Public/images/jj1.png" alt=""/>
                <input type="text" value="1" />
                <img src="Public/images/jj0s.png" alt=""/>
                <span class="font999">库 存：${stock}</span>
            </div>`
        }
$("#Computer-2-right").prepend(htmlPOR)
/*左侧推荐商品引入*/ 
        var html=""   
              for(var lshop of leftshop){
                html+=`<li>
                          <div class="Computer3-left-t2no">
                              <p>NO.${lshop.lid}</p>
                          </div>
                          <a href=${lshop.herf}><img src=${lshop.img} alt=""/></a>
                          <p class="font666">${lshop.title}</p>
                          <p class="Computer3-left-t2jg">￥${(lshop.price).toFixed(2)}元</p>
                      </li>`
                 }
                 $("#Computer3-left-t2>ul").html(html)   
/*商品详情图片*/
var $sImg=$("#ulsImg");
        $mImg=$("#div-mImg>img");
        $divZoom=$("#div-zoom");
        $("#lgImg").css("background",`url(${$mImg.attr("src")})`)
/*小图移入移出*/
    $sImg.on("mouseenter","img",function(){
        $mImg.attr("src",$(this).attr("src"));/*md*/
        $("#lgImg").css("background",`url(${$(this).attr("src")})`)/*lg*/
    })
/*中图移入移出*/
    $("#protectiveFilm").mouseenter(function(){
        $divZoom.removeClass("d-none");
        $("#lgImg").removeClass("d-none");
    }).mouseleave(function(){
        $divZoom.addClass("d-none");
        $("#lgImg").addClass("d-none");
    });
/*大小图尺寸比420 210*/
    $("#protectiveFilm").mousemove(function(e){
        var divZoomWidth=105;
        var x=e.offsetX;
        var y=e.offsetY;
        var left=x-divZoomWidth;
        var top=y-divZoomWidth;
        if(left<0){left=0}else if(left>divZoomWidth*2){left=divZoomWidth*2}
        if(top<0){top=0}else if(top>divZoomWidth*2){top=divZoomWidth*2}
        $divZoom.css({left,top})
        $("#lgImg").css("background-position",`${-left*38/21}px ${-top*38/21}px`)
    }) 
/*数量加减*/
    var $quantity=$(".Computer-2-right>.Computer-quantity")
    var $input=$quantity.children("input");
    $quantity.on("click","img",function(){
        var $img=$(this);
        var i=$input.val();
        if($img.attr("src")=="Public/images/jj1.png"){
            if($input.val()>1){
            $input.val(--i)
        }
        }else{
            if($input.val()<99){
            $quantity.children("input").val(++i)
        }
        }
    })
    /*输入数据验证*/
    $input.change(function(){
        if($input.val().search(/^\d{1,2}$/ig)==-1){$input.val(1)}
    })
/*商品详情参数*/
    var $nav=$("#nav")
    $nav.on("click","a",function(){         //点击事件
        var $n=$(this)
        //添加/删除 导航样式active,信息样式d-none
        $("#nav a").removeClass("active")
        $n.addClass("active")         
        $(".Computer3-right-2>div").addClass("d-none");
        $(`#${$n.attr("data-toggle")}`).removeClass("d-none")
    })
/*评论导航*/
    var $down3=$("#down3");
    $down3.on("click","li>a",function(){
        var $d=$(this);
        //添加/删除 导航样式active,信息样式d-none 
        $("#down3 ul>li>a").removeClass("active");
        $d.addClass("active");
        $("#down3>div>div").addClass("d-none");
        $(`#${$d.attr("data-toggle")}`).removeClass("d-none")
     })                
    }
  })
 }
})