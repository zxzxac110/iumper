$(function(){
    //请求页头.html片段
    $.ajax({
      url:"header.html",
      type:"get",
      data:{},
      success:function(result){
        //用片段创建新的<header>元素，替换现有<header id="header">元素
        $(result).replaceAll("#header");
        /*搜索点击跳转页面*/
        $("button.Search").click(function(){
         this.dz=$("input.top-text").prop("value")
          location=`product.html?dz=`+this.dz
       })
       if(document.cookie){//得到uid
        $("#loginok .cart-image>a").html(`购物车<b class="cartnumber">0</b>`)
        $("#loginok>ul>li:eq(3)").replaceWith(`<li>
							您好！ ${document.cookie}<span><a href="login.html" class="out">&nbsp&nbsp退出</a></span> 
                        </li>`)
      /*     $("#mydd>a").click(function(){点击个人信息事件。。
             console.log($("#pt2-myorder"))
           })*/
        }else{//否则默认状态
        $("#loginok .cart-image>a").html(`购物车`)
        $("#loginok>ul>li:eq(3)").replaceWith(`<li class="topuser-image">
							<a href="login.html" >登录</a><span>|</span><a href="reg.html">注册</a>
						                            </li>`)
       }
      }
    })
  });
