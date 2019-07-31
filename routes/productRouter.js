const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
  var lid=req.query.lid
  if(lid!==undefined){
/*数据 */
      var sql=`SELECT * FROM iumper_product WHERE type_uid=?`; 
      pool.query(sql,[lid],(err,result)=>{
      if(err) console.log(err); 
      res.send(result);
      })
      }else{
      res.send(result);
    }       
    });
module.exports=router//导出路由器