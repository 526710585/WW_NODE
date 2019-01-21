//1.引包
const express = require('express');
const path = require('path')


//2.引入控制层studentContorller
const studentContorller = require(path.join(__dirname,'../controllers/studentController'))

//3.构建路由对象()
const studentRouter = express.Router();



//4.给请求首页设定
studentRouter.get("/index/",studentContorller.getIndexPage)



//输出路由
module.exports=studentRouter