const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;
const {readFileData} = require('../helpers/index')
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function readFileUsers(req, res) {
  fsPromises
    .readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      if (!JSON.parse(data).find((user) => user._id === req.params._id)) {
        res.status(404).send({ message: 'This user doesn\'t exist' });
      } else {
        res.send(
          JSON.parse(data).filter((user) => user._id === req.params._id),
        );
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

router.get('/users/:_id', readFileUsers);
router.use(usersPath, readFileData)
router.get('/users', readFileData);
// router.get('/users', (req, res) => {
//   fsPromises
//     .readFile(usersPath, { encoding: 'utf8' })
//     .then((data) => {
//       res.status(200).send(JSON.parse(data));
//     })
//     .catch(() => {
//       res.status(500).send({ message: 'An error has occurred on the server' });
//     });
// });

module.exports = router;
