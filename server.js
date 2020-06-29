const express = require("express");
//const cors = require("cors");
const app = express();
const rand = require("./random.js");

app.get("/", function (req, res) {
  res.header(
    "Access-Control-Allow-Origin",
    "*"
    //"http://localhost:8080"
    //"http://richard.cheung.nyc:8080/"
  );
  res.send(rand.random().toString());
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
