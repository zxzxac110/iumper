
function myajax ({//均传入字符串类型
  url, //服务端接口地址
  type,//请求的类型
  data,//携带的请求参数
  dataType//服务端返回结果的类型。如果写json，则可以自动将服务端返回的json字符串，转为对象。不需要自己在调用JSON.parse。
}) {
  return new Promise(
    function (resolve, reject) {
      //1. 创建xhr对象
      var xhr = new XMLHttpRequest();
      //2.绑定监听事件
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (dataType !== undefined
            && dataType.toLowerCase() === "json")
            var res = JSON.parse(xhr.responseText)
          else
            var res = xhr.responseText

          resolve(res);
        }
      }
      if (type.toLowerCase() == "get" && data != undefined) {
        url += "?" + data;
      }
      //3.打开连接
      xhr.open(type, url, true);
      if (type.toLowerCase() === "post")
        //增加：设置请求消息头
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      //4.发送请求
      if (type.toLowerCase() == "post" && data !== undefined)
        xhr.send(data);
      else
        xhr.send(null);
    })
}