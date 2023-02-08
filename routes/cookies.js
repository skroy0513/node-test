const express = require('express');
const router = express.Router();
const {getCookies, acceptCookies, delCookies} = require('../controllers/cookies')

router.get('/', getCookies);
router.post('/accept', acceptCookies);
router.delete('/', delCookies);



module.exports = router;