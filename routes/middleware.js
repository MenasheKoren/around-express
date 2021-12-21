const users = require("../data/users.json");

const doesUserExist = (req, res, next) => {
  if (!users[req.params._id]) {
    res.send(`This user doesn't exist`);
    console.log(users.find(req.params._id));
    return;
  }
  next();
};

module.exports = doesUserExist;
