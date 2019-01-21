

//-------------------------------------------

//1.连接数据库
//创建了mongodb 的客户端对象
const MongoClient = require('mongodb').MongoClient;
//数据库连接的 URL
const url = 'mongodb://127.0.0.1:27017';
//要连接的库名
const dbName = 'SZHMQD27';
//-------------------------------------------




function createCollection (collectionName,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client1) {
        // useNewUrlParser: true 使用新的url去解析的意思
       //拿到库的对象
        const db = client1.db(dbName);
        //拿到集合
        const collection1 = db.collection(collectionName) 
        //把 collection1 和 client1 交给回调函数使用
        callback(collection1,client1)
    })
}


function insertOne (collectionName,data,callback){
    //给createCollection两个参数,一个是集合名字,一个是回调函数 操作集合和client
        createCollection (collectionName,(collection,client)=>{
            collection.findOne(data,(err,doc)=>{
                client.close();
                callback(err,doc);
            })
        }
    )
}   


function findOne (collectionName,data,callback){
    createCollection(collectionName,(collection,client)=>{
        collection.findOne(data,(err,doc)=>{
            client.close();
            callback(err,doc);
        })
    })
}


function findMany (collectionName,data,callback){
    createCollection(collectionName,(collection,client)=>{
        collection.find(data).toArray((err,docs)=>{
            client.close();
            callback(err,docs);
        })
    })
}






/**
 * 
 * @param {*} type 参数有:insertOne  findOne  findMany
 * @param {*} collectionName 集合名
 * @param {*} data 要使用的数据
 * @param {*} callback 回调函数
 */
function mangodb (type,collectionName,data,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // useNewUrlParser: true 使用新的url去解析的意思
       //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName) 
        if(type=="insertOne"){
            collection.insertOne(data,(err,doc)=>{
                client.close();
                callback(err,doc);
            })
        }else if(type=="findOne"){
            collection.findOne(data,(err,doc)=>{
                client.close();
                callback(err,doc);
            })
        }else if(type=="findMany"){
            collection.find(data).toArray((err,docs)=>{
                client.close();
                callback(err,docs);
            })
        }
    })
}


module.exports = {
    insertOne,
    findOne,
    findMany,
    mangodb
}




function insertOne (collectionName,data,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // useNewUrlParser: true 使用新的url去解析的意思
       //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName) 
        collection.insertOne(data,(err,doc)=>{
            client.close();
            callback(err,doc);
        })
    })
}



/* 
//添加单个数据
function insertOne (collectionName,data,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // useNewUrlParser: true 使用新的url去解析的意思
       //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName) 
        collection.insertOne(data,(err,doc)=>{
            client.close();
            callback(err,doc);
        })
    })
}


//查找单个数据
function findOne (collectionName,data,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // useNewUrlParser: true 使用新的url去解析的意思
       //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName) 
        //查找
        collection.findOne(data,(err,doc)=>{
            client.close();
            callback(err,doc);
        })
    })
}


//查找很多数据
function findMany (collectionName,data,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        // useNewUrlParser: true 使用新的url去解析的意思
       //拿到库的对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName) 
        //查找
        collection.find(data).toArray((err,docs)=>{
            client.close();
            callback(err,docs);
        })
    })
}
 */