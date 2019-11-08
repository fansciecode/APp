const express =require("express");
const router = express.Router();

const QueryController = require('../app/api/controllers/query');

router.get('/tags/:tag',QueryController.EventByTag);
router.get('/location/:location', QueryController.EventByLocation);
router.get('/category/:category',QueryController.EventByCategory);
// router.get('/location&category')
module.exports= router;


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<password>@newapp-1aphy.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
