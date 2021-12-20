const express = require("express");
const users = require("./routes/users");
const { PORT = 3000 } = process.env;
const app = express();

app.use('/users', users);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
