const express = require('express');
const router = express.Router();
const {postLoginHandle, paramLoginHandle, loginHandle} = require('../controllers/login');


// get : localhost:3000/login
router.get('/', loginHandle )

// get : localhost:3000/login/test01(userid)
router.get('/:userid', paramLoginHandle)

// post : localhost:3000/login  아이디, 비번 넣고 로그인 버튼 클릭
router.post('/', postLoginHandle)

module.exports = router;