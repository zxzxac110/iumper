const express=require('express');
var router=express(); //创建
const pool=require('../pool.js') //引用
router.get('/v1',function(req,res){
  var dz=req.query.dz
  var limit=req.query.limit
  var upDown=req.query.upDown
  //传递过来的参数查询条件 排序条件,正倒序
  //console.log(dz,limit,upDown)
  if(limit==undefined||limit=='Time'){limit='pid'}
  if(!upDown||upDown=="up"){upDown='ASC'}else{upDown='DESC'}
  if(dz==100||dz==200||dz==300){   //判断是按类型查询还是模糊查询
/*类型查询数据ORDER BY ${limit} ${upDown}*/
        var sql=`SELECT pid,brief,img,price,Svolume,Enumber FROM iumper_product WHERE type_uid=? ORDER BY ${limit} ${upDown}`; 
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
  // console.log(where)
   var sql=`select pid,brief,img,price,svolume,Enumber FROM iumper_product WHERE ${where} ORDER BY ${limit} ${upDown}`;
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



router.get("/",(req,res)=>{
  var output={
    count:0,
    pageSize:9,
    pageCount:0,
    pno:req.query.pno||0,
    data:[]                  
};
var kw=req.query.kw;
  if(kw){
    var kws=kw.split(" ");
    kws.forEach((elem,i,arr)=>{
      arr[i]=`title like '%${elem}%'`;
    })
    var where=kws.join(" and ");
               //查询    查询  MD 来自 表           条件                分页查询 1  别名     来至   表
    var sql=`select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop where ${where}`;
    query(sql,[])
    .then(result=>{
      output.count=result.length;//几张图
      output.pageCount= 
        Math.ceil(output.count/output.pageSize);  //总数量/每页数量
      sql+=` limit ?,?`;                          //分页9*传过来的数值,每页数量
      return query(sql,[output.pageSize*output.pno,output.pageSize]);
    })
    .then(result=>{
      output.data=result;                       //得到的数据
      res.send(output);
    })
  }else{
    res.send(output);
  }
})




/*


data(){         //函数.反复声明变量
  return{
      plist:[],
      pcount:0,
      pno:0,
      prevDisabled:true,
      nextDisabled:false
  }
 },
 props:["kw"],//接住头部传过来的参数kw
 created(){  //钩子函数.创建后.执行一次函数
     this.load();
 },
 methods:{   //普通函数
 //课后  不重复操作
     load(pno=0){//参数默认值
         this.axios.get(
             "http://localhost:5050/products",
             {
                 params:{
                     kw:this.kw,
                     pno
                 }
             }
         ).then(res=>{
             var plist=res.data.data;
             console.log(res.data)
             //res.data是服务器返回来的数据
             //数据在res的data的data中
             this.plist=plist;    //vue的Plist等于现在创建的Plist
             this.pcount=res.data.pageCount;//总页数
             console.log(this.pcount)
             this.pno=res.data.pno;//当前页数0 1 2 3
         })
     },
     goto(i){
          //当按上一页时.pno不为第一页 或者 按下一页时 pno不为最大页数-1
         if((i==-1&&this.pno!=0)||(i==+1&&this.pno!=this.pno-1))
         this.load(parseInt(this.pno)+parseInt(i))//调用函数当前页数+现在的i
     }
 },
 watch:{     //实时监听
     "$route"(){ //地址变化.就执行函数
         this.load();
     }
 }
}
*/