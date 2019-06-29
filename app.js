//服务器
const express=require('express');
const bodyParser=require('body-parser');
const querystring=require('querystring');
const url=require('url');
const fs=require('fs');
const http=require('http')
const userRouter=require('./routes/user.js');//引用路由
var app=express();
app.listen(8080);
app.use(express.static('iumper')); //静态页面挂载
app.use(express.static('ajax'));//静态页面挂载
app.use(bodyParser.urlencoded({
     extended:false
}))	 
app.use('/user',userRouter);//前缀挂载
