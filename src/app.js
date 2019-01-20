//导包
const express = require('express');

//创建app服务
const app = express();


app.get('/',(req,res)=>{
    res.send('hello~')
})

app.listen(3000,err=>{
    console.log('app is running at port 3000')
})