//服务器
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const session = require("express-session");
const querystring=require('querystring');
const url=require('url');
const fs=require('fs');
const http=require('http')
const userRouter=require('./routes/userRouter.js');//引用路由
const indexRouter=require('./routes/indexRouter.js')
const productDetailsRouter=require('./routes/product_detailsRouter.js')
const productRouter=require('./routes/productRouter.js')
// const headerRouter=require('./routes/headerRouter.js')
const personageRouter=require('./routes/personageRouter.js')
const shoppingcartRouter=require('./routes/shoppingcartRouter.js')
var app=express();
app.listen(5050);
//跨域
app.use(cors({
     origin:"http://127.0.0.1:8080",
     credentials:true
}));
//静态页面挂载
app.use(express.static('iumper'));
app.use(bodyParser.urlencoded({
     extended:false
}))
/*session对象共享数据*/
app.use(session({
     secret:"128位字符串",
     resave:true,        
     saveUninitialized:true  
}))
/*挂载路由 */
app.use('/user',userRouter);//前缀挂载
app.use('/index',indexRouter);
app.use('/details',productDetailsRouter);
app.use('/product',productRouter);
// app.use('/header',headerRouter);
app.use('/personage',personageRouter);
app.use('/shoppingcart',shoppingcartRouter);
