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

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
  logEvents(`${req.url} ${req.method}`);
  next();
})

// 회원가입 버튼을 클릭하면 아래의 register.html 열기
// express의 사용자 미들웨어를 만듬
app.use('/', root);
app.use('/register', registers);
app.use('/login', login);
app.use('/searchId', searchId);
app.use('/searchPwd', searchPwd);

app.get('^/$|/index(.html)?', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/products', products);
app.get('/*', (req, res)=>{
  res.send('file not found');
})

app.listen(3000, ()=>{
  console.log('app listening', 3000);
})