//1.导包
const express = require('express');
const path = require('path')
var bodyParser = require('body-parser')//解析post请求的包


//2.创建app服务
const app = express();
//这里是完成bodyparser的设置 让body解析json和普通键值对格式的post请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//3.挂载静态
app.use(express.static(path.join(__dirname,"/public")))



//4.挂载路由对象(路由对象必须放到最后)
//4.1导入路由对象
const accountRouter = require(path.join(__dirname,'./routers/accountRouters'))
//4.2挂载路由对象account都交给了accountRouter
app.use('/account/',accountRouter) //这里给req和res注入了很多方法




app.listen(3000,err=>{
    console.log('app is running at port 3000')
})