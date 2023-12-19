const mysql=require('mysql2');

const pool=mysql.createPool({
  host:'localhost',
  user:'root',
  database:'node-complete',
  password:'drTopper@1994'

});
module.exports=pool.promise();