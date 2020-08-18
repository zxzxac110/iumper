$(".serve-2-t1 ul#serveTab").on("click", "li>a", function (e) {
  e.preventDefault();
  //左侧导航内容
  $(".serve-1>span").html($(this).html())
  //点击元素样式
  $(".serve-2-t1 ul#serveTab li>a").removeClass("active")
  $(this).addClass("active")
  //对应内容
  var id = $(this).attr("data-toggle")
  $(".serve-2>div:gt(0)").addClass("d-none")
  $(`#${id}`).removeClass("d-none")
})