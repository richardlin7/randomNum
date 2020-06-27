const express = require("express");
const app = express();
const rand = require("./random");

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.send(rand.random().toString());
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
