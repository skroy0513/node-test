const express = require('express');
const router = express.Router();
const { getSearchPwdHandle, postSearchPwdHandle } = require('../controllers/searchPwd');


// get : localhost:3000/searchId
router.get('/', getSearchPwdHandle )

// post : localhost:3000/searchId  아이디, 비번 넣고 로그인 버튼 클릭
router.post('/', postSearchPwdHandle)

module.exports = router;