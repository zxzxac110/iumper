//路由器
const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
   var sql=`SELECT herf,img,title,Svolume,Enumber,price  FROM iumper_home_page `;
   pool.query(sql,[],(err,result)=>{
      if(err){
         res.send(err);
         console.log(err);
      }else{
         res.send(result)
      }
   })
});
module.exports=router//导出路由器