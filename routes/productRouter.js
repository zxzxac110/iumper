const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
  var dz=req.query.dz
  if(dz==100||dz==200||dz==300){   //判断是按类型查询还是模糊查询
/*类型查询数据*/
        var sql=`SELECT pid,brief,img,price,svolume,Enumber FROM iumper_product WHERE type_uid=?`; 
        pool.query(sql,[dz],(err,result)=>{
    if(err) console.log(err);
        res.send(result);
        })     
    }else{
      if(dz){
/*模糊查询*/
        var dzs=dz.split(" ");
        //[,,]
       dzs.forEach((elem,i,arr)=>{
       arr[i]=`title LIKE '%${elem}%'`;
       })
 /*[ title like '%%',
     title like '%%',
     title like '%%']*/
   var where=dzs.join(" AND ");
   console.log(where)
   var sql=`select pid,brief,img,price,svolume,Enumber FROM iumper_product WHERE ${where}`;
   pool.query(sql,[],(err,result)=>{
    if(err) console.log(err); 
        res.send(result);
        }) 
  }else{
        res.send({code:"-1"})
      }
    }/*判断是按类型查询还是模糊查询*/
  });
module.exports=router//导出路由器