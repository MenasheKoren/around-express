const fsPromises = require("fs").promises;
const path = require("path");

const readFileUsers = () => {
  const users = path.join(__dirname, "data", "users.json");

  fsPromises
    .readFile(users, { encoding: "utf8" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const readFileCards = () => {
  const cards = path.join(__dirname, "data", "cards.json");

  fsPromises
    .readFile(cards, { encoding: "utf8" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const doesUserExist = (req, res, next) => {
  if (!users.find((user) => user._id === req.params._id)) {
    res.status(404).send(`This user doesn't exist`);
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.send(users.filter((user) => user._id === req.params._id));
};

module.exports = {
  readFileUsers,
  readFileCards,
  doesUserExist,
  sendUser,
};
