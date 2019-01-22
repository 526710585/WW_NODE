//1.导包
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')//解析post请求的包

const session = require('express-session') //引入操作session的包  req.session来调用session

const query = require("querystring")




//2.创建app服务
const app = express();
//bodyparser的设置 让body解析json和普通键值对格式的post请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//express-session的设置maxAge是设置session过期时间
app.use(session({  resave: false, //添加 resave 选项
    saveUninitialized: true,//添加这行
    secret: 'keyboard cat', cookie: { maxAge: 600000 }}))




//3.挂载静态
app.use(express.static(path.join(__dirname,"/public")))



//自己写的 解析post请求的中间件 (使用必须关闭body-parser插件  因为插件设置了req.end()事件)
// app.use("/*",(req,res,next)=>{
//     if(req.method=="POST"){
//         console.log('4444444444444444444')
//         let body = "";
//         req.on("data",chunk=>{
//             body+=chunk
//         })
//         req.on('end',()=>{
//             console.log('3333333333333333333')
//             req.body = query.parse(body);
//             next()
//         })
//     }else{
//         console.log('GET')
//         next()
//     }
// })




// !!!!!!!!!!!权限控制放在静态资源之后,放在挂载路由之前
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginName){
            next()
        }else{
            res.send('<script>alert("您还未登录~");location="/account/login/"</script>')
        }
    }
})







//4.挂载路由对象(路由对象必须放到最后)
//4.1导入路由对象
const accountRouter = require(path.join(__dirname,'./routers/accountRouters'))
//4.2挂载路由对象account都交给了accountRouter
app.use('/account/',accountRouter) //这里给req和res注入了很多方法


//4.2挂载student路由对象
const studentRouter = require(path.join(__dirname,'routers/studentRouters.js'))
app.use('/student/',studentRouter)


app.listen(3000,err=>{
    console.log('app is running at port 3000')
})