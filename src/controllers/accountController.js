//1.引包
const path = require('path')
const captchapng = require('captchapng'); //引入生成验证码的包   res.writeHead  res.end(png.getBuffer()); 来调用
const mongodbTools = require(path.join(__dirname, "../tools/mangodbTools")); //引入mangodb的操作工具




//2.这是请求页面的回调
const getRegisterPage = (req, res) => {
    // res.send('11111111')
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}





//3.这是请求注册的回调
const register = (req, res) => {
    /* 
    思路:
    1.在app.js中引入body-parser的第三方包才能使用req.body
    2.去mongodb查询数据库,有没有该账号
    3.根据查询结果 选择返回 还是 添加账号
    */

    //3.1建立一个响应的对象
    const result = {
        status: 0,
        message: "登录成功"
    };
    //3.2获取请求的username和password
    const {username} = req.body
    //3.3调用工具去查询数据
    mongodbTools.findOne("userInfo", {username}, (err, doc) => {
        if (doc) { //有这个账号
            result.status = 1;
            result.message = "此账号已存在~"
            res.json(result)
        } else { //没这个账号
            // mongodbTools.insertOne()
            collection.insertOne(req.body, (err, result2) => { //插入账号
                if (result2) { //插入成功
                    res.json(result)
                } else { //插入失败
                    result.status = 2;
                    result.message = "注册失败~"
                    res.json(result)
                }
            })
        }
    })

}




//4.这是获取登录页面的请求
const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/login.html"))
};




//5.这是获取验证码图片的get请求
const getYzImg = (req, res) => {
    const rand = parseInt(Math.random() * 9000 + 1000) //生成随机的四位数字
    req.session.rand = rand; //存入随机数字

    const p = new captchapng(80, 30, rand);
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}



//6.这是登录的post请求
const login = (req, res) => {
    const resObj = {
        status: 0,
        msg: "登录成功~"
    }
    const {username,password,vcode} = req.body; //解构post传过来的用户名,密码,验证码
    const rand = req.session.rand; //获取存在session的随机数字
    if (rand != vcode) { //如果验证码不对
        resObj.status = 1;
        resObj.msg = "验证码输入错误~"
        res.json(resObj); //返回响应体
        return;//返回
    };
    //验证码正确 开始操作数据库
    //6.3链接数据库
    mongodbTools.findOne("userInfo",{username,password},(err,doc)=>{
        if (doc) { //有账号
            //返回响应体
            res.json(resObj);
        } else {
            resObj.status = 2;
            resObj.msg = "账号或者密码输入错误~"
            //返回响应体
            res.json(resObj);
        }
    })
    // mongodbTools.mangodb("findOne","userInfo",{username,password},(err,doc)=>{
    //     if (doc) { //有账号
    //         //返回响应体
    //         res.json(resObj);
    //     } else {
    //         resObj.status = 2;
    //         resObj.msg = "账号或者密码输入错误~"
    //         //返回响应体
    //         res.json(resObj);
    //     }
    // })
}

//吧输出对象设定好
module.exports = {
    getRegisterPage,
    register,
    getLoginPage,
    getYzImg,
    login
}