//路由器
//////////////////////////////////
const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
  //查询页面数据
  var lid=req.query.lid
  console.log(req.query)
  var output={
    product:{},
    leftshop:{},
    imgs:[]
  }
  if(lid!==undefined){ //如果有lid代表只查询数据，否则就是点击添加购物车
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
  //点击购物车按钮后添加数据
  var {uid,title,price,img,bben,pid}=req.query;
  //如果没有uid 代表没登录
    if(!uid){res.send({code:-1,msg:"请先登录"})
    return;}
    /*查询购物车是否有此商品 */
  var sql="SELECT cid FROM iumper_shopping_cart WHERE uid=? AND pid=?"
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err)throw err;
    var sql=""
  if(result.length==0){
    /*没有就添加 */
    sql=`INSERT INTO iumper_shopping_cart VALUES (NULL,${uid},${pid},'${img}','${title}',${price},'${bben}',1)`
  }else{
    /* 有就数量加一 */
    sql=`UPDATE iumper_shopping_cart SET count=count+1 WHERE uid=${uid} AND pid=${pid}`
  }
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"添加成功"})
  })
})


}       
});
module.exports=router//导出路由器