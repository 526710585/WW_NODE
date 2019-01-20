const path = require('path')

const getRegisterPage = (req,res)=>{
    // res.send('11111111')
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}


//吧输出对象设定好
module.exports = {
    getRegisterPage
}