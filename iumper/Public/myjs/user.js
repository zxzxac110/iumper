//登录
function login(){
if(!uname.value){alert("请输入用户名");
  return;
}else if(!upwd.value){alert("请输入密码");
  return;
}
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4 && xhr.status===200){
          var result=JSON.parse(xhr.response);
            if(result.code==='1'){
            sessionStorage.setItem("uid",result.uid)				
            sessionStorage.setItem("nickname",result.nickname)	
            alert("登录成功跳转页面");
            location="personage.html"
           }else{alert(result.msg)}
        }
     }
    xhr.open("post","/user/v1/login",true)
    xhr.setRequestHeader("content-Type","application/x-www-form-urlencoded")
    var formdata="uname="+uname.value+"&upwd="+upwd.value;
    xhr.send(formdata)
  }
//注册
var PhoneEmail=''/*判断注册账号格式类型*/
function alterverift(){
    var str=uname.value
    var e=new RegExp ("^\\w+\@\\w+\.\\w{2,4}$","ig")        
    var p=new RegExp ("^1[3-9]\\d{9}$","ig")
   if(str.search(e)!==-1){    
      alert('获取校验码成功');
       PhoneEmail="email"
    }else if(str.search(p)!==-1){
      alert('获取校验码成功');
       PhoneEmail="phone"
      }
    else{
      alert('请输入正确格式的手机号/邮箱')
      }
   }
function reg(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){				
     if(xhr.readyState===4 && xhr.status===200){
         var result=xhr.response;
        if(result==='1'){
            alert("注册成功跳转页面");
            location="login.html"
        }else{alert(result)}
        }   
       }
xhr.open("post","/user/v1/reg/",true)
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
var formdata="uname="+uname.value+"&upwd="+upwd.value+"&upwds="+upwds.value+"&verift1="+verift1.value+"&verift2="+verift2.value+"&PhoneEmail="+PhoneEmail;
xhr.send(formdata);
}