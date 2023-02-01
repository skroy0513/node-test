const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host : 'svc.gksl2.cloudtype.app',
  user : 'root',
  post : '32514',
  database : 'test10',
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
  }
}

module.exports = {getEmployees};