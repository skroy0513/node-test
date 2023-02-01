const express = require('express');
const router = express.Router();

const {index, products, about, info, contact} = require('../controllers/root');

router.get('/', index);
router.get('/about', about);
router.get('/info', info);
router.get('/contact', contact);

module.exports = router;