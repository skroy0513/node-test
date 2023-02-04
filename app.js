const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// 사용자가 만든 미들웨어
const { logEvents } = require('./middleware/logEvents');
const registers = require('./routes/register')
const login = require('./routes/login')
const searchId = require('./routes/searchId')
const searchPwd = require('./routes/searchPwd');
const products = require('./routes/products')
const root = require('./routes/root');
const employees = require('./routes/employees');
const users = require('./routes/users');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3500;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
  logEvents(`${req.url} ${req.method}`);
  next();
})

// express의 사용자 미들웨어를 만듬
app.use('/', root);
app.use('/register', registers);
app.use('/login', login);
app.use('/searchId', searchId);
app.use('/searchPwd', searchPwd);
app.use('/products', products);
app.use('/employees', employees);
app.use('/users', users);

app.get('^/$|/index(.html)?', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/*', (req, res)=>{
  res.send('file not found');
})

app.listen(PORT, ()=>{
  console.log('app listening', PORT);
})