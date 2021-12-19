const app = require("./app");
const { PORT = 3000 } = process.env;
// Middlewares...
// Routes...
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
