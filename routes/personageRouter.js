// //路由器
 const express=require('express');
 var router=express(); //创建
 const pool=require('../pool.js') //引用
 router.get('/v1',function(req,res){
     console.log(req.session)
     res.send("1")
 })
 module.exports=router//导出路由器
