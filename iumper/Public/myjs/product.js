$(function(){
    var dz=location.search.split("=")[1] //查询条件
      dz=decodeURI(dz)
    console.log(  decodeURI(dz)  )
    var limit="Time"                     //模糊查询条件
    var upDown="up"                      //排序
    var result                           //全局变量 到处使用
        if(dz){
            $.ajax({
                url:"http://127.0.0.1:8080/product/v1",
                type:"get",
                data:{dz},
                dataType:"json",
                success:function(result){
//加载DOM树函数  
     function loat(resu){ 
        //每次加载dom树的时候将数据保留下来
        result=resu   
        var html=""
        /*加载商品内容 */
            for(var pro of resu.arr){
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
        /**加载分页数目 */
          if(resu.pageCount>1){
              var html=""
              if(resu.pno!=0){html+='<li data-toggle="lt">&lt</li>'}
              for(var i=1;i<=resu.pageCount;i++){
                  if(i-1==resu.pno){html+=`<li data-toggle="${i}"  class="active">${i}</li>`
                  }else{ html+=`<li data-toggle="${i}" >${i}</li>`
                }           
              }
              if(resu.pno!=resu.pageCount-1){html+='<li data-toggle="gt">&gt</li>'}
              $(".tpc-4 #product-pag").html(html)
          }
        }
    loat(result)//首次加载DOM树函数 
/*分类选中时的样式class="tpc-2pg"*/
        var $tpc2pg=$(".tpc-2>ul>li>a")
        $($tpc2pg[dz/100-1]).addClass("tpc-2pg")
/*点击排序时执行函数*/      
$(".tpc-3>ul").on("click","a",function(e){
    e.preventDefault();
  //移除除自己外的样式
    $(this).parent().siblings().children().children().removeClass("down up")
    var $span=$(this).children().last()
  //得到排序条件和顺序
    if(!($span.is(".up"))){
        $span.removeClass("down") 
        $span.addClass("up") 
          limit=$(this).attr("data-up")
          upDown="up"
    }else{
        $span.removeClass("up") 
        $span.addClass("down") 
         limit=$(this).attr("data-down")
         upDown="down"
    }
        $.ajax({
            url:"http://127.0.0.1:8080/product/v1",
            type:"get",
            data:{dz,limit,upDown},
            dataType:"json",
            success:function(result){
                loat(result)//加载DOM树函数
        }
    })
})
/*点击数字上一页下一页时发送AJAX */  
 $(".tpc-4 #product-pag").on("click","li",function(){
        var pno=result.pno;//全局函数。得到每次当前的result的pno值
        var bj=$(this).attr("data-toggle")
        if(bj>0){
            pno=--bj;
        }else if(bj=="gt"){
            pno++;
        }else if(bj=="lt"){
            pno--;
        }
       $.ajax({
        url:"http://127.0.0.1:8080/product/v1",
        type:"get",
        data:{dz,limit,upDown,pno},
        dataType:"json",
        success:function(result){
            loat(result)//加载DOM树函数
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