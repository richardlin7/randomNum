const express = require("express");
const cors = require("cors");
const app = express();
const rand = require("./random.js");

// app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.get("/", function (req, res) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:8080/"
    // "http://richard.cheung.nyc:8080/"
  );
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET"
  //   // "http://localhost:8080/"
  //   // "http://richard.cheung.nyc:8080/"
  // );
  res.send(rand.random().toString());
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
