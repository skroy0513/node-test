const path = require('path');
const users = require('../model/users');

const loginHandle = (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
}

const paramLoginHandle = (req, res)=>{
  // 파라미터로 데이터를 넘겨 받기
  const { userid } = req.params;
  console.log(userid);
  const user = users.find( user => user.userId === userid)
  let resData = {}
  if(user){
    resData = { success : true, message : user}
  }else{
    resData = { success : false, message : "아이디 또는 비밀번호를 확인하세요."}
  }

  res.send(resData);
}

const postLoginHandle = (req, res)=>{
  // res.sendFile(path.join(__dirname, 'login.html'))
  const { userId, userPwd } = req.body;
  console.log(userId, userPwd);
  const user = users.find( user => user.userId === userId && user.userPwd === userPwd)
  let resData = {}
  if(user){
    resData = { success : true, message : user}
  }else{
    resData = { success : false, message : "아이디 또는 비밀번호를 확인하세요."}
  }

  res.send(resData);
}

module.exports = {postLoginHandle, paramLoginHandle, loginHandle};