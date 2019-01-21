//1.引包
const path = require('path');
const template = require('art-template')
const mongodbTools = require(path.join(__dirname, "../tools/mangodbTools")); //引入mangodb的操作工具




//3.写get 首页page回调函数
const getIndexPage = (req,res)=>{
    const keyWords=req.query.keyWords||"";//有就用传过来的,没有就用空字符串,也就是搜索所有的数据
    //3.3链接数据库
    mongodbTools.findMany('studentInfo',{name:{$regex:keyWords}},(err,docs)=>{
        const html = template(path.join(__dirname,"../public/views/index.html"), {data:docs,keyWords});
        res.send(html)
    })

    // mongodbTools.mangodb("findMany",'studentInfo',{name:{$regex:keyWords}},(err,docs)=>{ 
    //     const html = template(path.join(__dirname,"../public/views/index.html"), {data:docs,keyWords});
    //     res.send(html)
    // })

}



//4.输出控制层
module.exports = {
    getIndexPage,
}