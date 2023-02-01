const express = require('express');
const router = express.Router();
const { getEmployees } = require('../controllers/employees');

router.get('/', getEmployees);

module.exports = router;