const mongodb =require('mongodb');
const ObjectId=require('mongodb')
const MongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=(callback)=>{
  MongoClient.connect('mongodb+srv://Aksshaya:drTopper%4094@cluster0.vqnabpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(client=>{
    console.log('connected!')
    _db=client.db();
    //console.log(_db)
    callback();
  })
  .catch(err=>{
    console.log(err);
    throw err;
  })
}

const getDb=()=>{
  if(_db)
  {
    
    return _db;
  }
  throw 'No database found!'
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;

