// //路由器

// const express=require('express');
// var router=express(); //创建
// const pool=require('../pool.js') //引用
// router.get('/v1',function(req,res){
//       /*轮播产品数据 */
//       console.log("头-------------------")
//       console.log(req.session)
//       /*如果登陆 查找用户名 */
//          if(req.session.uid){
//             var sql=`SELECT uname FROM iumper_user WHERE uid=?`
//             pool.query(sql,[req.session.uid],(err,result)=>{
//                if(err)throw err;
//                console.log("主页返回数据")
//                console.log(result);
//                res.send(result)
//                })
//          }else{res.send(result)}
//       }) 
// module.exports=router//导出路由器