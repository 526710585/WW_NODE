//1.引包
const express = require('express');
const path = require('path')

//2.引入控制层accountContorller
const accountContorller = require(path.join(__dirname,'../controllers/accountController'))

//3.构建路由对象()
const accountRouter = express.Router();

//4.路由对象处理请求设定
accountRouter.get('/register',accountContorller.getRegisterPage)



//5.导出路由对象
module.exports = accountRouter;