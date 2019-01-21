//1.引包
const path = require('path')
const captchapng = require('captchapng');//引入生成验证码的包   res.writeHead  res.end(png.getBuffer()); 来调用
//3.3连接数据库
//创建了mongodb 的客户端对象
const MongoClient = require('mongodb').MongoClient;
//创建 URL
const url = 'mongodb://127.0.0.1:27017';
//创建库名(数据库名)
const dbName = 'SZHMQD27';


//2.这是请求页面的回调
const getRegisterPage = (req,res)=>{
    // res.send('11111111')
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}
//3.这是请求注册的回调
const register = (req,res)=>{
    /* 
    思路:
    1.在app.js中引入body-parser的第三方包才能使用req.body
    2.去mongodb查询数据库,有没有该账号
    3.根据查询结果 选择返回 还是 添加账号
    */

    //3.1建立一个响应的对象
    const result = {status:0,message:"登录成功"};
    //3.2获取请求的username和password
    const {username,password}=req.body

    //3.3链接数据库
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // useNewUrlParser: true 使用新的url去解析的意思

       //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('userInfo')

        //判断有没有账号
        collection.findOne({username},(err,doc)=>{
            if(doc){//有这个账号
                result.status=1;
                result.message="此账号已存在~"
                //关闭数据库
                client.close();
                //返回响应体
                res.json(result)
            }else{//没这个账号
                collection.insertOne(req.body,(err,result2)=>{//插入账号
                    if(result2){//插入成功
                    //关闭数据库
                    client.close();
                    //返回响应体
                    res.json(result)
                    }else{//插入失败
                        result.status=2;
                        result.message="注册失败~"
                        //关闭数据库
                        client.close();
                        //返回响应体
                        res.json(result)
                    }
                })
            }
        })
      });
}

//4.这是获取登录页面的请求
const getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../public/views/login.html"))
}

//5.这是获取验证码图片的get请求
const getYzImg = (req,res)=>{
    const rand = parseInt(Math.random()*9000+1000)//生成随机的四位数字
    req.session.rand = rand;//存入随机数字

    const p = new captchapng(80,30,rand); 
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(imgbase64);
}


//6.这是登录的post请求
const login = (req,res)=>{
    const resObj = {
        status:0,
        msg:"登录成功~"
    }
    const {username,password,vcode} = req.body;//结构post传过来的用户名,密码,验证码
    const rand = req.session.rand;//获取存在session的随机数字
    if(rand!=vcode){//如果验证码不对
        resObj.status=1;
        resObj.msg = "验证码输入错误~"
        res.json(resObj);//返回响应体
    }else {//验证码正确 开始操作数据库
    //6.3链接数据库
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) { // useNewUrlParser: true 使用新的url去解析的意思
        //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('userInfo')
        //开始
        collection.findOne({username,password},(err,doc)=>{
            if(doc){//有账号
                //关闭数据库
                client.close();
                //返回响应体
                res.json(resObj);
            }else{
                resObj.status=2;
                resObj.msg = "账号或者密码输入错误~"
                //关闭数据库
                client.close();
                //返回响应体
                res.json(resObj);
            }
        })
    });

    }


}

//吧输出对象设定好
module.exports = {
    getRegisterPage,
    register,
    getLoginPage,
    getYzImg,
    login
}