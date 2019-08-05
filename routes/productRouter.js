const express=require('express');
var router=express();
const pool=require('../pool.js') 
router.get('/v1',function(req,res){
  //console.log(req.query)
  var dz=req.query.dz
  var limit=req.query.limit   //模糊查找类型
  var upDown=req.query.upDown //模糊查找顺序
  var obj={
    pno:req.query.pno||0,//第几页
    count:12,            //分页查询 每页显示数量
    pageCount:0,         //最多显示几页
    arr:[]               //查询结果      
  }
  if(limit==undefined||limit=='Time'){limit='pid'};
  if(upDown=="down"){upDown='DESC'}else{upDown='ASC'};
  if(dz==100||dz==200||dz==300){   //判断是按类型查询还是模糊查询
/*类型查询数据ORDER BY ${limit} ${upDown}*/
        var sql=`SELECT pid,brief,img,price,Svolume,Enumber FROM iumper_product WHERE type_uid=? ORDER BY  ${limit} ${upDown}`;
        pool.query(sql,[dz],function(err,result){
          if(err) throw err;
          obj.pageCount=Math.ceil(result.length/obj.count)
          sql+=` limit ?,?`
          pool.query(sql,[dz,obj.count*obj.pno,obj.count],function(err,result){
                  obj.arr=result;                       //查询结果 
                  res.send(obj);
          })
        })
    }else{
      if(dz){
/*模糊查询*/
    var dzs=dz.split(" ");
         dzs.forEach((elem,i,arr)=>{
         arr[i]=`title LIKE '%${elem}%'`;
        })
   var where=dzs.join(" AND ");
   var sql=`select pid,brief,img,price,svolume,Enumber FROM iumper_product WHERE ${where} ORDER BY ${limit} ${upDown}`;
   pool.query(sql,[],(err,result)=>{
    if(err) throw err; 
    //console.log(result)
    obj.pageCount=Math.ceil(result.length/obj.count)
      sql+=` limit ?,?`
       pool.query(sql,[obj.count*obj.pno,obj.count],function(err,result){
          obj.arr=result;                       //查询结果 
          //console.log(obj.pno)
          res.send(obj);  
       })
    }) 
  }else{
    res.send({code:"-1",msg:"请输入正确的查询条件"})
    }
  }
});
module.exports=router//导出路由器