$(function(){
    //请求页尾.html片段
    $.ajax({
      url:"footer.html",
      type:"get",
      success:function(result){
        //用片段创建新的<footer>元素，替换现有<footer id="footer">元素
        //得到     替换       界面
        $(result).replaceAll("#footer");
        //侧边导航栏
        var $fixed4=$("#fixed4")
        $(window).scroll(function(){
         if($("html").scrollTop()>200){ 
            $fixed4.css("height","51px")
          }else{
            $fixed4.css("height","0px")
          }
        })
        //底部拉选框
          $("#dl").click(function(){
          $("#dd>div").toggleClass("h25px")
          $("#dd").toggleClass("brober")
        })
      }
    })
  });
