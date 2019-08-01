$(function(){
    //请求页头.html片段
    $.ajax({
      url:"header.html",
      type:"get",
      data:{dz:""},
      success:function(result){
        //用片段创建新的<header>元素，替换现有<header id="header">元素
        $(result).replaceAll("#header");
       $("button.Search").click(function(){
        this.dz=$("input.top-text").prop("value")
          location=`product.html?dz=`+this.dz
       })
      }
    })
  });


  (function(){    })