const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
app.use(express.json());

app.use(function (req, res, next) {
  console.log(req.body);
  next();
});

app.post("/users/", (req, res) => {
  res.send(req.query);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
