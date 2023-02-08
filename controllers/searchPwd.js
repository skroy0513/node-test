const path = require('path');
const connection = require('../model/db');
const pool = connection();

const getSearchPwdHandle = (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'searchPwd.html'));
}

const postSearchPwdHandle = async (req, res)=>{
  // 패스워드 찾기 : 아이디와 이름을 기준으로 찾기
  const { userName, userId } = req.body;
  let conn;
  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from users where userId = ? and userName = ?;`
    const returnCheck = await conn.query(sqlCheck, [userId, userName]);
    console.log(returnCheck);

    if(parseInt(returnCheck[0].cnt) === 0){
      const resData = {success : false , message : '가입한 회원이 아닙니다'}
      return res.json(resData);
    }else{
      const sql2 = `SELECT * FROM users WHERE username=? ;`;
      const rows2 = await conn.query(sql2, [userName]);
      console.log(rows2[0])

      const resData = {success : true, message : rows2[0]};
      return res.json(resData);
    }
  }catch(err){
    console.log(err);
  }finally{
    if(conn){conn.end()};
  }
}

// const postSearchPwdHandle =  (req, res)=>{
//   // 비밀번호 찾기 : 아이디와 이름을 기준으로 찾기
//   const { userName, userId } = req.body;
//   console.log(userName, userId);

//   const user = users.find( user => user.userName === userName && user.userId === userId)
//   let resData = {}
//   if(user){
//     resData = { success : true, message : user}
//   }else{
//     resData = { success : false, message : "아이디 또는 비밀번호를 확인하세요."}
//   }

//   res.send(resData);
// }

module.exports = {getSearchPwdHandle, postSearchPwdHandle};