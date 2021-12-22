const express = require("express");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { PORT = 3000 } = process.env;
const app = express();

app.use("/users", users);
app.use("/cards", cards);

app.get("/", (req, res) => {
  res.status(404).send("Requested resource not found");
});

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error:...${err}`);
  }
  console.log(`App listening on port ${PORT}`);
});
