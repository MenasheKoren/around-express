const express = require("express");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { PORT = 3000 } = process.env;
const app = express();

app.use("/users", users);
app.use("/cards", cards);

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error:...${err}`);
  }
  console.log(`App listening on port ${PORT}`);
});
