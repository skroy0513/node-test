const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//   host : 'svc.gksl2.cloudtype.app',
//   user : 'root',
//   port : '32514',
//   database : 'test10',
//   password : '12345',
//   connectionLimit : 5
// })

const pool = mariadb.createPool({
  host : '127.0.0.1',
  user : 'root',
  port : '3306',
  database : 'mystory',
  password : '12345',
  connectionLimit : 5
})

const getEmployees = async (req, res)=>{
  let conn;
  try{
    conn = await pool.getConnection();
    const sql = 'select * from employees;';
    const rows = await conn.query(sql);
    res.json(rows)
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

const getEmployee = async (req, res)=>{
  const emp_no = req.params.emp_no
  // 다양한 검색 함수
  let conn;
  try{
    conn = await pool.getConnection();
    const sql = `SELECT * FROM employees WHERE emp_no = ${emp_no};`;
    const rows = await conn.query(sql);
    res.json(rows)
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

// 새로운 사원 입사  post : create
const createEmployee = async (req, res)=>{
  const {emp_no, birth_date, first_name, last_name, gender, hire_date} = req.body;
  
  let conn;
  try{
    conn = await pool.getConnection();
    const sqlCheck = `select count(*) as cnt from employees where emp_no = ${emp_no};`
    const returnCheck = await conn.query(sqlCheck);
    console.log(returnCheck);

    if(parseInt(returnCheck[0].cnt) === 1){
      const resMessage = { success : false, message : `${emp_no} 사원 번호는 존재합니다.` }
      return res.json(resMessage);
    }

    const sql = `insert into employees(
      emp_no, birth_date, first_name, last_name, gender, hire_date) 
      values ('${emp_no}', '${birth_date}', '${first_name}', '${last_name}', '${gender}', '${hire_date}');`;
    const rows = await conn.query(sql);
    // Query OK, 1 row affected (0.003 sec)
    console.log(rows);
    // { affectedRows: 1, insertId: 0n, warningStatus: 0 } 
    const resMessage = rows.affectedRows ? 
    { success : true , message : "사원이 등록되었습니다."} : 
    { success : false , message : '데이터를 확인하세요.'};

    res.json(resMessage) 
  }catch(err){
    console.log(err);
  }finally{
    if( conn ){conn.end()};
  }
}

const deleteEmployee = async (req, res)=>{
  // const emp_no = req.params.emp_no;
  const {emp_no} = req.body;

  let conn;
  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from employees where emp_no = ${emp_no};`
    const returnCheck = await conn.query(sqlCheck);
    console.log(returnCheck);

    // 데이터가 없으면 삭제할 필요 없음
    if(parseInt(returnCheck[0].cnt) === 0){
      const resMessage = { success : false, message : `${emp_no} 사원 번호는 존재하지 않습니다.` }
      return res.json(resMessage);
    }

    const sql = `delete from employees where emp_no = ${emp_no};`;
    const rows = await conn.query(sql);
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

const updateEmployee = async (req, res)=>{
  const {emp_no, birth_date, first_name, last_name, hire_date} = req.body; 

  let conn;

  try{
    conn = await pool.getConnection();

    const sqlCheck = `select count(*) as cnt from employees where emp_no = ${emp_no};`
    const returnCheck = await conn.query(sqlCheck);
    console.log(returnCheck);

    if(parseInt(returnCheck[0].cnt) === 0){
      const resMessage = { success : false, message : `${emp_no} 사원 번호는 존재하지 않습니다.` }
      return res.json(resMessage);
    }

    const sql = `update employees set first_name = '${first_name}', 
                        birth_date = '${birth_date}', 
                        last_name = '${last_name}',  
                        hire_date = '${hire_date}'
                  where emp_no = ${emp_no};`;
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

module.exports = {getEmployees, getEmployee, createEmployee, deleteEmployee, updateEmployee};