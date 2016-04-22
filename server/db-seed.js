var MongoClient = require("mongodb").MongoClient;
var MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

var tweets = require("./seed-data");

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    throw err;
  }
  
  db.collection("tweets").insertMany(tweets);
  db.close();
});
