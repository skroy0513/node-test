const path = require('path');
const registers = [];

const getRegister = (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'register.html'))
}

const postRegister = (req, res)=>{
  const user = req.body;
  registers.push(user);
  console.log(registers.length);
}

const getRegisters = (req, res)=>{
  res.send(JSON.stringify(registers))
}

module.exports = {getRegister, postRegister, getRegisters}