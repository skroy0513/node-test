const path = require('path');
const users = require('../model/users');
const connection = require('../model/db');
const pool = connection();

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

const getLogin = async (req, res)=>{
  const { userId, userPwd } = req.body;
  let conn;
  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from users where userId = ? and userPwd = ?;`
    const returnCheck = await conn.query(sqlCheck, [userId, userPwd]);
    console.log(returnCheck);
    const data = {userId, userPwd}

    // 데이터가 없으면 로그인 못함
    if(parseInt(returnCheck[0].cnt) === 0){
      const resMessage = { success : false, message : `아이디, 패스워드를 확인하세요.` }
      return res.json(resMessage);
    }else{
      res.cookie('user', data.userId);
      const resMessage = { success : true, message : data};
      res.json(resMessage);
    }
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

const logoutHandle = (req, res)=> {
  res.clearCookie('user');
  res.send({success:true, message:'로그아웃'});
}

module.exports = {getLogin, paramLoginHandle, loginHandle, logoutHandle};