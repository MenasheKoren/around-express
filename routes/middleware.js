const users = require("../data/users.json");

const doesUserExist = (req, res, next) => {
  for (const userEntity in users) {
    if (!userEntity.find(req.params._id)) {
      res.send(`This user doesn't exist`);
      return;
    }
    next();
  }
};

const sendUser = (req, res) => {
  res.send(users(req.params._id));
};

module.exports = { doesUserExist, sendUser };
