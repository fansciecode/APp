const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/IBC';

mongoose.connect(mongoDB,{ useUnifiedTopology: true , useNewUrlParser: true});
mongoose.Promise = global.Promise;
module.exports = mongoose;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<password>@newapp-1aphy.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });