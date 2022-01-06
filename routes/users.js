const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users/:userId', (req, res) => getUserById(req, res));
router.get('/users', (req, res) => getUsers(req, res));
router.post('/users', createUser);
router.patch('/users/me', (req, res) => updateUserProfile(req, res));
router.patch('/users/me/avatar', (req, res) => updateUserAvatar(req, res));
module.exports = router;
