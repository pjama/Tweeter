var express     = require("express");
var bodyParser  = require("body-parser");
var User        = require("./user-helper")
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var PORT = process.env.PORT || 8080;
var MongoClient = require("mongodb").MongoClient;
var MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

var dbInstance;
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    throw err;
  }
  console.log("Successfully connected to DB: " + MONGODB_URI);
  dbInstance = db;
});

app.get("/tweets", function(req, res) {
  var tweets = dbInstance.collection("tweets").find().sort({"created_at": -1});
  tweets.toArray((err, results) => {
    return res.json(results);
  });
});

app.post("/tweets", function(req, res) {
  console.log("New Tweet, Body:", req.body);
  if (!req.body.tweet_text) {
    res.status(400);
    return res.send("{'error': 'invalid request'}\n");
  }
  
  var user = req.body.user ? req.body.user : User.generateRandomUser();
  var tweet = {
    user: user,
    content: {
      text: req.body.tweet_text,
      images: []
    },
    created_at: Date.now()
  };
  dbInstance.collection("tweets").insertOne(tweet, (err, result) => {
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  try {
    dbInstance.close();
  } catch (e) {
    throw e;
  } finally {
    console.log("Bye for now");
    process.exit();
  }
}

process.on("SIGTERM", gracefulShutdown); // listen for TERM signal .e.g. kill
process.on("SIGINT", gracefulShutdown);  // listen for INT signal e.g. Ctrl-C
