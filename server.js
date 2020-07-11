if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const assert = require("assert");
const rand = require("./random.js");

// MongoDB code
const MongoClient = require("mongodb").MongoClient;
// const url = process.env.url;
const url = "mongodb://localhost:27017";

// BodyParser code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

// Requests code
app.options("/", cors(corsOptions));
app.post("/", function (req, res) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
  // res.header("Access-Control-Allow-Methods", "POST");
  // res.header("Access-Control-Allow-Headers", "Content-Type");

  var high = parseInt(req.body.high, 10); // converts strings to ints
  var low = parseInt(req.body.low, 10); // converts strings to ints
  var id = req.connection.remoteAddress; // gets ip

  if (isNaN(high) || isNaN(low)) {
    // check if its a number
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      if (err) throw err; // if error occurs
      console.log("Connected successfully to server");
      var dbo = db.db("invalid-input"); // connects to database 'invalid-input'

      var d = new Date(); // gets current date
      var myobj = { high: high, low: low, ip: id, date: d };

      dbo.collection("invalid-input1").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Invalid Input: logged for inspection");
        db.close();
      });
    });
    return res.end();
  }
  if (high <= 0 || low <= 0 || low >= high) {
    // check if low is greater than high, make sure they are not negative
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      if (err) throw err; // if error occurs
      console.log("Connected successfully to server");
      var dbo = db.db("invalid-input"); // connects to database 'invalid-input'

      var d = new Date(); // gets current date
      var myobj = { high: high, low: low, ip: id, date: d };

      dbo.collection("invalid-input1").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Invalid Input: logged for inspection");
        db.close();
      });
    });
    return res.end();
  }
  console.log("Got body.max:", high);
  console.log("Got body.min:", low);
  res.send(rand.random(high, low).toString());
});

// port connection code
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
