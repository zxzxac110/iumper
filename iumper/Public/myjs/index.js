$(function(){
    $.ajax({
        url:"http://localhost:8080/index/v1/i",
        type:"get",
        dataType:"json",
        success:function(result){
            var html=''
            var arrimg=result.slice(0,5)
    //添加所有内容
            for(var elem of result){
                html+=`<li class="center-slideshow-1">
                                <a href=${elem.herf}>					
                                    <img src=${elem.img} alt="" >
                                    <h1>${elem.title}</h1>
                                    <p>销量：${elem.Svolume}<span>评价：${elem.Eumber}</span></p>
                                    <div>${(elem.price).toFixed(2)}元 </div>
                                </a>
                        </li>`
            }
    //额外添加.为了实现轮播效果
            for(var elem of arrimg){
                html+=`<li class="center-slideshow-1">
                            <a href=${elem.herf}>					
                                <img src=${elem.img} alt="" >
                                <h1>${elem.title}</h1>
                                <p>销量：${elem.Svolume}<span>评价：${elem.Eumber}</span></p>
                                <div>${(elem.price).toFixed(2)}元 </div>
                            </a>
                    </li>`
            } 
            $("ul.center-slideshow").html(html)
            var arr=[result[3],result[10],result[12]]
            var html=''
            for(var elem of arr){
                html+=`<li >
                            <a href=${elem.herf}>
                            <img src=${elem.img} alt="">
                            <h1>${elem.title}</h1>
                            <h2>${(elem.price).toFixed(2)}元</h2>
                            </a>
                        </li>`
            }
            $("#rim").html(html)	
            $("#rim>li:eq(0)>a>h2").before(`<p>中柏原装正品磁吸式键盘</p>`)
        }
    })
    })
          var $nabs=$(".banner-nav>li")
          var $navs=$(".banner-divflex>.banner-divflex")
    //导航栏移入移出
          $(".banner-nav").on("mouseenter","li",function(){
                var $nab=$(this)
                var i=$nabs.index($nab)//得到当前元素在其父元素的下标
                $navs.css("width","0px")
                if(i==0){
                    $($navs[i]).css("width","430px")
                    }else{
                    $($navs[i]).css("width","215px")	
                    }
          })
          .on("mouseleave","li",function(){
                    $navs.css("width","0px")
          })
    //导航信息移入移出  
          $(".banner-divflex").on("mouseenter",".banner-divflex",function(){
                var $nav=$(this);
                if($navs.index($nav)==0){
                    $nav.css("width","430px")
                    }else{
                    $nav.css("width","215px")
                }
          })
          .on("mouseleave",".banner-divflex",function(){
                    $navs.css("width","0px")
          })
    //轮播图
         var $left=$("#center-2-left");
         var $right=$("#center-2-right");
         var $slideshow=$("ul.center-slideshow");
         var i=0;//计算张数
         var liwidth=1200//移动距离
         var licount=3//轮播张数
         var duration=1000//过度移动时间/等待时间
         //transition: all 1s linear
         function add(to){	
             if(to==undefined){to=i+1}
             if(i==0){ 
                 if(to>0){//小于0时额外操作
                     $slideshow.css("transition","all 1s linear")
                 }else{
                    $slideshow.css("transition","")
                    $slideshow.css("margin-left",-licount*liwidth)//最左边
                    setTimeout(function(){
                        add(licount-1);     
                    },200)//给浏览器渲染预留时间
                    return;
                 }
                }
             i=to	 
             $slideshow.css("margin-left",-i*liwidth) 
             if(i==licount){//i=0，等待过渡时间过去后.去除过渡属性.并将图片换到第一张
                     i=0;
                     setTimeout(function(){
                        $slideshow.css("transition","");
                        $slideshow.css("margin-left","0");
                     },duration)
               }
           }
    //左右按钮 .开关控制，能否点击
           var cann=true;  
           $left.click(function(){mo(-1)})
           $right.click(function(){mo(1)})  
           function mo(n){
                if(cann){
                    add(i+n);
                    cann=false;   //再次点击就，不会有运行了
                    setTimeout(function(){
                        cann=true;	
                    },duration+200)
                }
           }
    //默认轮播
    var timer=setInterval(function(){
        add()
    },4000)
    function shiftIn(){
        //console.log("移入")
        clearInterval(timer)
    }
    function shiftOut(){
        //console.log("移出")
         timer=setInterval(function(){add()
        },4000)
    }
    $slideshow.mouseenter(shiftIn).mouseleave(shiftOut)
    $right.mouseenter(shiftIn).mouseleave(shiftOut)
    $left.mouseenter(shiftIn).mouseleave(shiftOut)