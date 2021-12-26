const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function readFileData(req, res) {
  fsPromises
    .readFile(usersPath, { encoding: 'utf8' })
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
  usersPath
}
