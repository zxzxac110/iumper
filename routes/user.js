//路由器
const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用

//注册  //b比较一次验证码，aleat(验证码错误)。 比较校验alert("校验码错误")
router.post('/v1/reg',function(req,res){ 
   var obj=req.body;  //得到输入数据console.log(1112)
  var $uname=obj.uname;
      $upwd=obj.upwd;
      $upwds=obj.upwds;
      $verift1=obj.verift1;
      $verift2=obj.verift2;
      $PhoneEmail=obj.PhoneEmail
   if(!$upwd){res.send('请输入密码');return;}
   else if($upwd!=$upwds){res.send('两次密码不一致');return;}
   else if(!$verift1){res.send('请输入图片验证码');return;}
   else if(!$verift2){res.send('请输校验码');return;}
   else if($upwd.search(/[A-Za-z]\w+/ig)==-1||$upwd.length<6||$upwd.length>18){res.send('密码必须是以字母开头的6-18位数字');return;}
   else if($PhoneEmail==''){res.send("校验码错误");return;}//
   //b比较一次验证码，aleat(验证码错误)。 比较校验alert("校验码错误")

   pool.query('SELECT*FROM iumper_user WHERE uname=?',[$uname],function(err,result){
       if(err) throw err;
       if(result.length>0){res.send('已注册的账号名');return;}

       if ($PhoneEmail==="phone"){//2选1操作
        pool.query('INSERT INTO iumper_user VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',[null,$uname,$upwd,$uname,1,"","","","","","",$uname,""],function(err,result){
             if(err) throw err;
             if(result.affectedRows>0){res.send("1")}
        })}
        else if($PhoneEmail==="email"){
        pool.query('INSERT INTO iumper_user VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',[null,$uname,$upwd,$uname,1,"","","","","","","",$uname],function(err,result){
                if(err) throw err;  
                if(result.affectedRows>0){res.send("1")}
        })}
   })//已注册账号名
})
//登录
router.post('/v1/login',function(req,res){
   var obj=req.body;
   if(!obj.uname){res.send("请输入手机号/邮箱/用户名");
   return;
};
   if(!obj.upwd){res.send("请输入密码");
   return;
};
pool.query('SELECT*FROM iumper_user WHERE uname=? and password=?',[obj.uname,obj.upwd],function(err,result){
    if(err) throw err;
    if(result.length>0){res.send('1')}else{res.send('用户名或密码错误！')}
})
});





module.exports=router//导出路由器