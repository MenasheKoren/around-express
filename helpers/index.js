const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function readFileUsers(dataUsersPath, req, res) {
  fsPromises
    .readFile(dataUsersPath, { encoding: 'utf8' })
    .then((data) => {
      if (!data.match(req.params._id)) {
        if (!JSON.parse(data).find((user) => user._id === req.params._id)) {
          res.status(404).send({ message: 'This user doesn\'t exist' });
        } else {
          res
            .status(200)
            .send(
              JSON.parse(data).filter((user) => user._id === req.params._id)
            );
        }
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

function readFileData(dataFilePath, req, res) {
  fsPromises
    .readFile(dataFilePath, { encoding: 'utf8' })
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

module.exports = {
  cardsPath,
  readFileData,
  usersPath,
  readFileUsers,
};
