//1.导包
const express = require('express');
const path = require('path')
//2.创建app服务
const app = express();

//3.挂载路由对象
    //3.1导入路由对象
const accountRouter = require(path.join(__dirname,'./routers/accountRouters'))
    //3.2挂载路由对象account都交给了accountRouter
app.use('/account/',accountRouter) //这里给req和res注入了很多方法

//4.挂载静态
app.use(express.static(path.join(__dirname,"/public")))

app.listen(3000,err=>{
    console.log('app is running at port 3000')
})