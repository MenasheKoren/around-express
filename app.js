const express = require("express");
const users = require("./routes/users");
const cards = require("./routes/cards");
// const { readFile } = require("./middleware");
const { PORT = 3000 } = process.env;
const app = express();

app.get("/test", (req, res) => {
  res.send("test test test");
});

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error:...${err}`);
  }
  console.log(`App listening on port ${PORT}`);
});

app.use("/", users);
app.use("/", cards);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
