//1.引包
const express = require('express');
const path = require('path')


//2.引入控制层studentContorller
const studentContorller = require(path.join(__dirname,'../controllers/studentController'))

//3.构建路由对象()
const studentRouter = express.Router();



//4.给请求首页设定
studentRouter.get("/index/",studentContorller.getIndexPage)

//5.给新增页面的get请求
studentRouter.get('/add/',studentContorller.getAddPage)
//6.新增的提交按钮
studentRouter.post('/add/',studentContorller.addStudent)
//7.编辑页面的get请求
studentRouter.get('/edit/:studentId',studentContorller.editStudentPage)
//8.编辑student按钮
studentRouter.post('/edit/:studentId',studentContorller.editStudent)
//9.删除按钮
studentRouter.get('/delete/:studentId',studentContorller.deleteStudent)
//输出路由
module.exports=studentRouter