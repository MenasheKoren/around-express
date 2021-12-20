const express = require("express");
const users = require("./routes/users");
const { PORT = 3000 } = process.env;
const app = express();

app.use(users);
app.get('/', (req, res) => {
  res.status(200).send('<h1>Home page</h1>')
})
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
