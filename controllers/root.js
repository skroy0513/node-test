const path = require('path');

const index = (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

const about = (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'about.html'))
}

const info = (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'info.html'))
}

const contact = (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'contact.html'))
}

module.exports = { index, about, info, contact}