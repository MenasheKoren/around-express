const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/users/:userId', (req, res) => getUserById(req, res));
router.get('/users', (req, res) => getUsers(req.userId, res));
router.post('/', createUser);
module.exports = router;
