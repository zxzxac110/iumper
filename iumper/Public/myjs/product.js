
$(function(){
    var dz=location.search.split("=")[1]
        if(dz){
            $.ajax({
                url:"http://127.0.0.1:8080/product/v1",
                type:"get",
                data:{dz},
                dataType:"json",
                success:function(result){
/*pid,title,img,price,svolume,Enumber*/  
     function loat(resu){
        var html=""
            for(var pro of resu.result){
                html+=`<li>
                            <a href="product_details.html?lid=${pro.pid}">
                                <img src=${pro.img} alt=""/>
                                <h3 class="font333">${pro.brief}</h3>
                                <p class="font999">销量：${pro.Svolume}<span class="right">评价：${pro.Enumber}</span></p>
                                <p class="font-f90">${(pro.price).toFixed(2)}元</p>
                            </a>
                        </li>`
                }
         $("#tpc4-product>ul:first-child").html(html)
        }
        //将得到的数据。放入对象中。然后运行函数
        var resu={result}
        loat(resu)
/*分类选中样式class="tpc-2pg"*/
        var $tpc2pg=$(".tpc-2>ul>li>a")
        $($tpc2pg[dz/100-1]).addClass("tpc-2pg")

/*排序执行函数*/      
$(".tpc-3>ul").on("click","a",function(e){
    e.preventDefault();
    //移除除自己外的样式
    $(this).parent().siblings().children().children().removeClass("down up")
    var $span=$(this).children().last()
    //得到排序条件和顺序
    if(!($span.is(".up"))){
        $span.removeClass("down") 
        $span.addClass("up") 
         var limit=$(this).attr("data-up")
         var upDown="up"
    }else{
        $span.removeClass("up") 
        $span.addClass("down") 
        var limit=$(this).attr("data-down")
        var upDown="down"
    }
   // console.log(dz,limit,upDown)
        $.ajax({
            url:"http://127.0.0.1:8080/product/v1",
            type:"get",
            data:{dz,limit,upDown},
            dataType:"json",
            success:function(result){
                //将得到的数据。放入对象中。然后运行函数
                var resu={result} 
                loat(resu)
        }
    }) 
})
  /*轮播图*/
        var $ulImg=$(".tpc-1>ul")
        var times=setInterval(slideshow,5500) //显示5s 过渡0.5秒
        function slideshow(){ 
            $ulImg.css("opacity","0")        //透明
                setTimeout(function(){
                $("#tpcImg1").toggle()      //显示隐藏
                $ulImg.css("opacity","1")
            },500)
        }
        $ulImg.mouseenter(function(){
                    clearInterval(times);   //关闭
        });
        $ulImg.mouseleave(function(){
            times=setInterval(slideshow,1500);//开启
                })
            }
        })
    }
})