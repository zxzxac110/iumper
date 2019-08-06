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
          // $.ajax({
          //   url:"http://127.0.0.1:8080/heater/v1",
          //   type:"post",
          //   data:{},
          //   success:function(result){
          //       console.log(result)
          // }})
       })
      }
    })
  });
