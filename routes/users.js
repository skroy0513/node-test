const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, deleteUser, updateUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/:emp_no', getUser);

module.exports = router;