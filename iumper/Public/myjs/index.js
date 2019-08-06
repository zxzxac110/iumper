$(function(){
    $.ajax({
        url:"http://127.0.0.1:8080/index/v1",
        type:"get",
        dataType:"json",
        success:function(result){
            console.log('index---------------')
            console.log(result)
            var {list,show,uname}=result;
            var html='';
            var type100=0,type200=0,type300=0;
            if(uname[0].uname){
                $("#loginok .cart-image>a").html(`购物车<b class="cartnumber">0</b>`)
                $("#loginok>ul>li:eq(3)").replaceWith(`<li>
							您好！ ${uname[0].uname}<span><a href="login.html" class="out">&nbsp&nbsp退出</a></span> 
                        </li>`)
                }else{
                $("#loginok .cart-image>a").html(`购物车`)
                $("#loginok>ul>li:eq(3)").replaceWith(`<li class="topuser-image">
							<a href="login.html" >登录</a><span>|</span><a href="reg.html">注册</a>
						                            </li>`)
                    }
            //插入左侧页面导航类型数据的函数
            function addhtml(type){
                if(type==0){html+=`<div class="banner-divflex"><ul class="banner-nab">`;}
            html+=`<li><a href="product_details.html?lid=${elem.pid}">${elem.brief}</a></li>` ;
            if(type%6==5){html+=`</ul><ul class="banner-nab">`;
                            }                        
            }
            for(var elem of list){
                if(elem.type_uid==100){
                     addhtml(type100);
                     type100++;
                }else if(elem.type_uid==200){
                    if(type200==0){html+=`</ul></div>`}
                     addhtml(type200);
                     type200++;
                }else if(elem.type_uid==300){
                    if(type300==0){html+=`</ul></div>`}
                     addhtml(type300);
                     type300++;
                } 
            }
            html+=`</ul></div>`
            // 插入类型数据
            $(".banner .banner-divflex").append(html)        
    //轮播内容
             var html="";
            var arrimg=show.slice(0,5)
            for(var elem of show){
                html+=`<li class="center-slideshow-1">
                                <a href=${elem.herf}>					
                                    <img src=${elem.img} alt="" >
                                    <h1>${elem.title}</h1>
                                    <p>销量：${elem.Svolume}<span>评价：${elem.Enumber}</span></p>
                                    <div>${(elem.price).toFixed(2)}元 </div>
                                </a>
                        </li>`
            }
    //额外添加.为了实现轮播效果
            for(var elem of arrimg){
                html+=`<li class="center-slideshow-1">
                            <a href=${elem.herf}>					
                                <img src=${elem.img} alt="">
                                <h1>${elem.title}</h1>
                                <p>销量：${elem.Svolume}<span>评价：${elem.Enumber}</span></p>
                                <div>${(elem.price).toFixed(2)}元 </div>
                            </a>
                    </li>`
            } 
            $("ul.center-slideshow").html(html)
    //添加其他图片
            var arr=[show[3],show[10],show[12]]
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
            //                      
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
            var duration=2000//过度移动时间/等待时间
            //transition: all 2s linear
            function add(to){	
                if(to==undefined){to=i+1}
                if(i==0){ 
                    if(to>0){//小于0时额外操作
                        $slideshow.css("transition","all 2s linear")
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
            },6000)
            function shiftIn(){
                //console.log("移入")
                clearInterval(timer)
            }
            function shiftOut(){
                //console.log("移出")
                    timer=setInterval(function(){add()
                },6000)
            }
            $slideshow.mouseenter(shiftIn).mouseleave(shiftOut)
            $right.mouseenter(shiftIn).mouseleave(shiftOut)
            $left.mouseenter(shiftIn).mouseleave(shiftOut)

        }
    })
})


    






