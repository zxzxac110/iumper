//服务器
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const querystring=require('querystring');
const url=require('url');
const fs=require('fs');
const http=require('http')
const userRouter=require('./routes/userRouter.js');//引用路由
const indexRouter=require('./routes/indexRouter.js')
var app=express();
app.listen(8080);
//跨域
app.use(cors({
     origin:"http://127.0.0.1:8080"
}));
app.use(express.static('iumper')); //静态页面挂载
app.use(bodyParser.urlencoded({
     extended:false
}))	 
app.use('/user',userRouter);//前缀挂载
app.use('/index',indexRouter);//前缀挂载
