const express = require("express");
const users = require("./data/users.json");
const { PORT = 3000 } = process.env;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get('/users', (req, res) => {
  res.send(req.query);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
module.exports = app;
