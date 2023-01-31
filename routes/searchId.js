const express = require('express');
const router = express.Router();
const { getSearchIdHandle, postSearchIdHandle } = require('../controllers/searchId');


// get : localhost:3000/searchId
router.get('/', getSearchIdHandle )

// post : localhost:3000/searchId  아이디, 비번 넣고 로그인 버튼 클릭
router.post('/', postSearchIdHandle)

module.exports = router;