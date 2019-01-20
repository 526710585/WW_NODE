//1.引包
const path = require('path')

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


//吧输出对象设定好
module.exports = {
    getRegisterPage,
    register
}