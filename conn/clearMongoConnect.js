const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DB;
const port = process.env.MONGO_PORT;
const {MongoClient, ObjectID} = require('mongodb');
const winston = require('../loggers/logging')
// Connection URL

let database;
const uri = `mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin&retryWrites=true&useUnifiedTopology=true&useNewUrlParser=true`;

exports.conn = async function connect(){
   const client = new MongoClient(uri);
   try{
      await client.connect();
      const db = client.db('test');
      winston.info(`CLEAR MONGO CONN ${db.databaseName}`);
      return db;

   }catch(err){
      winston.error('CONNECTION ERROR: ', err);
   }
   // finally{
   //    client.close();
   // }

}
exports.objectId = () => {
   return ObjectID
}


exports.getDB = ()=>{
   return database;
}




 

