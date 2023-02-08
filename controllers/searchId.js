const path = require('path');
const connection = require('../model/db');
const pool = connection();

const getSearchIdHandle = (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'searchId.html'))
}

// const users = [
//   {userId : 'skroy0513', userPwd : 'tyuiop13!!', userName : '이승규'},
//   {userId : 'test01', userPwd : '12345', userName : '홍길동'},
//   {userId : 'test02', userPwd : '12345', userName : '제이슨'},
//   {userId : 'test03', userPwd : '12345', userName : '길동무'}
// ]

const postSearchIdHandle = async (req, res)=>{
  // 아이디 찾기 : 이름 또는 이메일을 기준으로 찾기
  const { userName } = req.body;
  let conn;
  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from users where userName = ?`;
    const returnCheck = await conn.query(sqlCheck, userName);
    console.log(returnCheck);

    if(parseInt(returnCheck[0].cnt) === 0){
      const resData = {success : false , message : '가입한 회원이 아닙니다'}
      return res.json(resData);
    }else{
      const sql2 = `SELECT * FROM users WHERE username=? ;`;
      const rows2 = await conn.query(sql2, [userName]);

      const resData = {success : true, message : rows2[0]};
      return res.json(resData);
    }
  }catch(err){
    console.log(err);
  }finally{
    if(conn){conn.end()};
  }
}
// const postSearchIdHandle = (req, res)=>{
//   // 아이디 찾기 : 이름 또는 이메일을 기준으로 찾기
//   const { userName } = req.body;
//   console.log(userName);

//   const user = users.find( user => user.userName === userName)
//   let resData = {}
//   if(user){
//     resData = { success : true, message : user}
//   }else{
//     resData = { success : false, message : "아이디 또는 비밀번호를 확인하세요."}
//   }

//   res.send(resData);
// }

module.exports = {getSearchIdHandle, postSearchIdHandle};