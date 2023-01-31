const express = require('express');
const router = express.Router();
const { getRegister, postRegister, getRegisters} = require('../controllers/register');


// get : localhost:3000/register
router.get('/', getRegister)
// get : localhost:3000/register/registers
router.get('/registers', getRegisters)
// post : localhost:3000/register => html에서 fetch 요청
router.post('/', postRegister)

module.exports = router;