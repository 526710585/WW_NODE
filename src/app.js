//1.导包
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')//解析post请求的包

const session = require('express-session') //引入操作session的包  req.session来调用session




//2.创建app服务
const app = express();
//bodyparser的设置 让body解析json和普通键值对格式的post请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//express-session的设置maxAge是设置session过期时间
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))




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