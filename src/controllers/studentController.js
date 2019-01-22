//1.引包
const path = require('path');
const template = require('art-template')
const mongodbTools = require(path.join(__dirname, "../tools/mangodbTools")); //引入mangodb的操作工具




//3.写get 首页page回调函数
const getIndexPage = (req,res)=>{
    const keyWords=req.query.keyWords||"";//有就用传过来的,没有就用空字符串,也就是搜索所有的数据
    //3.3链接数据库
    mongodbTools.findMany('studentInfo',{name:{$regex:keyWords}},(err,docs)=>{
        const html = template(path.join(__dirname,"../public/views/index.html"), {data:docs,keyWords,loginName:req.session.loginName});
        res.send(html)
    })
    // mongodbTools.mangodb("findMany",'studentInfo',{name:{$regex:keyWords}},(err,docs)=>{ 
    //     const html = template(path.join(__dirname,"../public/views/index.html"), {data:docs,keyWords});
    //     res.send(html)
    // })
}
//4.新增页面的请求
const getAddPage = (req,res)=>{
    const html = template(path.join(__dirname,"../public/views/add.html"), {loginName:req.session.loginName});
    res.send(html)
}


//5.新增学生
const addStudent = (req,res)=>{
    mongodbTools.insertOne("studentInfo",req.body,(err,doc)=>{
        if(!doc){
            
            res.send(`<script>alert("新增失败!");</script>`);
        }else{
            res.send(`<script>window.location.href="/student/index"</script>`);
        }
    })
}

//6.编辑页面的请求
const editStudentPage = (req,res)=>{
    const _id = mongodbTools.ObjectId(req.params.studentId);

    mongodbTools.findOne("studentInfo",{_id},(err,doc)=>{
        doc.loginName=req.session.loginName;
        const html = template(path.join(__dirname,"../public/views/edit.html"),doc)
        res.send(html)
    })
}

//7.编辑学生的按钮
const editStudent = (req,res)=>{
    const _id = mongodbTools.ObjectId(req.params.studentId);
    delete req.body._id;
    mongodbTools.updateOne("studentInfo",{_id},req.body,(err,resulet)=>{
        if(!resulet){
            res.send(`<script>alert("修改失败!");</script>`);
        }else{
            res.send(
                `<script>window.location.href="/student/index"</script>`);
        }
    })
}

//8.删除学生的按钮
const deleteStudent=(req,res)=>{
    const _id = mongodbTools.ObjectId(req.params.studentId);
    mongodbTools.deleteOne("studentInfo",{_id},(err,resulet)=>{
        if(!resulet){
            res.send(`<script>alert("删除失败!");</script>`);
        }else{
            res.send(
                `<script>window.location.href="/student/index"</script>`);
        }
    })
}
//4.输出控制层
module.exports = {
    getIndexPage,
    getAddPage,
    addStudent,
    editStudentPage,
    editStudent,
    deleteStudent

}