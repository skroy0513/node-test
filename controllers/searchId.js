const path = require('path');
const users = require('../model/users');

const getSearchIdHandle = (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'searchId.html'))
}

// const users = [
//   {userId : 'skroy0513', userPwd : 'tyuiop13!!', userName : '이승규'},
//   {userId : 'test01', userPwd : '12345', userName : '홍길동'},
//   {userId : 'test02', userPwd : '12345', userName : '제이슨'},
//   {userId : 'test03', userPwd : '12345', userName : '길동무'}
// ]

const postSearchIdHandle = (req, res)=>{
  // 아이디 찾기 : 이름 또는 이메일을 기준으로 찾기
  const { userName } = req.body;
  console.log(userName);

  const user = users.find( user => user.userName === userName)
  let resData = {}
  if(user){
    resData = { success : true, message : user}
  }else{
    resData = { success : false, message : "아이디 또는 비밀번호를 확인하세요."}
  }

  res.send(resData);
}

module.exports = {getSearchIdHandle, postSearchIdHandle};