//路由器
//////////////////////////////////
const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
  var lid=req.query.lid
  var output={
    product:{},
    imgs:[]
  }
  if(lid!==undefined){
      var sql=`select * from iumper_product where pid=?`; 
      pool.query(sql,[lid],(err,result)=>{
      if(err) console.log(err);   
      output.product=result   
      })
      var sql=`select * from iumper_imgs where product_id=?`; 
      pool.query(sql,[lid],(err,result)=>{
      if(err) console.log(err);   
      output.imgs=result   
      res.send(output);
      }) 
    }else{
    res.send(output);
  }       
});
module.exports=router//导出路由器