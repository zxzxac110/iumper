//路由器
//////////////////////////////////
const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
  var lid=req.query.lid
  var output={
    product:{},
    leftshop:{},
    imgs:[]
  }
  if(lid!==undefined){
/*数据 */
  var sql=`SELECT title,price,colour,edition,stock FROM iumper_product WHERE pid=?`; 
  pool.query(sql,[lid],(err,result)=>{
  if(err) console.log(err); 
  output.product=result  
/*图片 标题 价格 链接 20 1  11 6  */  
    var sql=`SELECT herf,img,title,price FROM iumper_leftshop`
    pool.query(sql,[lid],(err,result)=>{
    if(err) console.log(err);   
    output.leftshop=result
/*图片 */    
      var sql=`SELECT picture_sm FROM iumper_imgs WHERE product_id=?`; 
      pool.query(sql,[lid],(err,result)=>{
      if(err) console.log(err);   
      output.imgs=result   
      res.send(output);
      }) 
    }) 
  })
   }else{
  res.send(output);
}       
});
module.exports=router//导出路由器