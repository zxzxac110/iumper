function headerajax(){ //为了购物车删除时可以实时得到当前购物车数量封装函数
$(function(){
    //请求页头.html片段
    $.ajax({
      url:"header.html",
      type:"get",
      data:{},
      success:function(result){
//用片段创建新的<header>元素，替换现有<header id="header">元素
        $(result).replaceAll("#header");
//搜索点击跳转页面
        $("button.Search").click(function(){
         this.dz=$("input.top-text").prop("value")
          location=`product.html?dz=`+this.dz
       })
//确认是否登录
        if(sessionStorage.getItem("uid")){
          $(function(){
            //请求页头.html片段
            $.ajax({
              url:"http://127.0.0.1:8080/shoppingcart/v1",
              type:"get",
              data:{uid:sessionStorage.getItem("uid")},
              success:function(result){    
                  //加载DOM树
                $("#loginok .cart-image>a").html(`购物车<b class="cartnumber">${result.length}</b>`)
                $("#loginok>ul>li:eq(3)").replaceWith(`<li>
                  您好！ ${sessionStorage.getItem("nickname")}<span><a href="login.html" id="logOut" class="out">&nbsp&nbsp退出</a></span> 
                          </li>`)
              //点击退出
                $("#logOut").click(function(){
                  sessionStorage.clear();
                })
              }
            })
          })
        }else{
          //加载DOM树
        $("#loginok .cart-image>a").html(`购物车`)
        $("#loginok>ul>li:eq(3)").replaceWith(`<li class="topuser-image">
							<a href="login.html" >登录</a><span>|</span><a href="reg.html">注册</a>
						                            </li>`)
       }
      }
    })
  });
}
headerajax()