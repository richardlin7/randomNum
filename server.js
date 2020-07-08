const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rand = require("./random.js");
// const mongoose = require("mongoose");

// MongoDB code
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://richard:rlin9774@cluster0.vzfde.gcp.mongodb.net/random?retryWrites=true&w=majority";

// const client = new MongoClient(url, { for mongoose
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// MongoClient.set("useUnifiedTopology", true);

// MongoClient.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// BodyParser code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Requests code
app.post("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  var high = req.body.high;
  var low = req.body.low;
  var id = req.connection.remoteAddress; // gets ip

  if (high != parseInt(high, 10) || low != parseInt(low, 10)) {
    // check if it is an int
    MongoClient.connect(url, function (err, db) {
      if (err) throw err; // if error occurs
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
  if (isNaN(high) || isNaN(low)) {
    // check if its a number
    MongoClient.connect(url, function (err, db) {
      if (err) throw err; // if error occurs
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
      if (err) throw err; // if error occurs
      var dbo = db.db("invalid-input"); // connects to database 'invalid-input'

      var d = new Date(); // gets current date
      var myobj = { high: high, low: low, ip: id, date: d };

      dbo.collection("invalid-input1").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Invalid Input: Logged for Inspection");
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
