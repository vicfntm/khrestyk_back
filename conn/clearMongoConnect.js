const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DB;
const port = process.env.MONGO_PORT;
const {MongoClient} = require('mongodb');

// Connection URL

let database;
const uri = `mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin&retryWrites=true&useUnifiedTopology=true&useNewUrlParser=true`;
let databaseConn;

exports.conn = async function connect(){
   const client = new MongoClient(uri);
   try{
      await client.connect();
      const db = client.db('test');
      console.log(`CONNECTED to the db ${db.databaseName}`);
      return db;

   }catch(err){
      console.error('CONNECTION ERROR: ', err);
   }
   // finally{
   //    client.close();
   // }

}


exports.getDB = ()=>{
   return database;
}




 

