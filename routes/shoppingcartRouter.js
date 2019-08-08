const express=require('express');
var router=express();
const pool=require('../pool.js') 
router.get('/v1',function(req,res){
    var uid=req.query.uid
    console.log(req.query)
    var sql=`SELECT pid,img,title,price,edtiton,count FROM iumper_shopping_cart WHERE uid=?`
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        res.send(result);
        console.log(1)
    })       
})
module.exports=router//导出路由器