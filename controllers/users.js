const connection =require('../model/db');
const pool = connection();

const getUsers = async (req, res)=>{
  let conn;
  try{
    conn = await pool.getConnection();
    const sql = 'select * from users;';
    const rows = await conn.query(sql);
    res.json(rows)
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

const getUser = async (req, res)=>{
  const id = req.params.id
  // 다양한 검색 함수
  let conn;
  try{
    conn = await pool.getConnection();
    const sql = `SELECT * FROM users WHERE id = ?;`;
    const rows = await conn.query(sql, [id]);
    res.json(rows)
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

// 새로운 회원가입  post : create
const createUser = async (req, res)=>{
  const {id, userName, userId, userEmail, userPhone, userPwd} = req.body;
  
  let conn;
  try{
    conn = await pool.getConnection();
    const sqlCheck = `select count(*) as cnt from users where userId = ?;`
    const returnCheck = await conn.query(sqlCheck, userId);
    console.log(returnCheck);

    if(parseInt(returnCheck[0].cnt) === 1){
      const resMessage = { success : false, message : `${userId} 회원은 존재합니다.` }
      return res.json(resMessage);
    }

    const sql = `insert into users(userName, userId, userEmail, userPhone, userPwd)
      values (?, ?, ?, ?, ?);`;
    const rows = await conn.query(sql, [userName, userId, userEmail, userPhone, userPwd]);
    // Query OK, 1 row affected (0.003 sec)
    console.log(rows);
    // { affectedRows: 1, insertId: 0n, warningStatus: 0 } 
    const resMessage = rows.affectedRows ? 
    { success : true , message : "회원이 등록되었습니다."} : 
    { success : false , message : '데이터를 확인하세요.'};

    res.json(resMessage) 
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

// 유저 삭제
const deleteUser = async (req, res)=>{
  // const userId = req.params.userId;
  const {userId} = req.body;

  let conn;
  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from users where userId = ?;`
    const returnCheck = await conn.query(sqlCheck, [userId]);
    console.log(returnCheck);

    // 데이터가 없으면 삭제할 필요 없음
    if(parseInt(returnCheck[0].cnt) === 0){
      const resMessage = { success : false, message : `${userId} 회원은 존재하지 않습니다.` }
      return res.json(resMessage);
    }

    const sql = `delete from users where userId = ?;`;
    const rows = await conn.query(sql, [userId]);
    // Query OK, 1 row affected (0.003 sec)
    console.log(rows);
    // { affectedRows: 1, insertId: 0n, warningStatus: 0 } 
    const resMessage = rows.affectedRows ? 
    { success : true , message : "삭제완료."} : 
    { success : false , message : '데이터를 확인하세요.'};

    res.json(resMessage) 
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

const updateUser = async (req, res)=>{
  const { userName, userId, userEmail, userPhone, userPwd} = req.body;

  let conn;

  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from users where userId = ?;`
    const returnCheck = await conn.query(sqlCheck, [userId]);
    console.log(returnCheck);

    if(parseInt(returnCheck[0].cnt) === 0){
      const resMessage = { success : false, message : `${userId} 회원은 존재하지 않습니다.` }
      return res.json(resMessage);
    }

    const sql = `update users set userName = '${userName}', 
                        userId = "${userId}", 
                        userEmail = '${userEmail}',  
                        userPhone = '${userPhone}',
                        userPwd = '${userPwd}'
                  where userId = '${userId}';`;
    const rows = await conn.query(sql);
    console.log(rows);
    // { affectedRows: 1, insertId: 0n, warningStatus: 0 } 

    const resMessage = rows.affectedRows ? 
    { success : true , message : "수정되었습니다."} : 
    { success : false , message : '데이터를 확인하세요.'};

    res.json(resMessage);
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

module.exports = {getUsers, getUser, createUser, deleteUser, updateUser};