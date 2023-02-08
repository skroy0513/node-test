const path = require('path');

const getCookies = (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'cookies.html'))
  console.log('getCookies');
}
const acceptCookies = (req, res)=>{
  const {setCookie} = req.body;
  console.log('acceptCookies', setCookie);

  res.setHeader('set-cookie', 'user=customer');
  // res.cookie('myBrandName', 'Hello');
  // res.cookie('myBrandName', setCookie);
  res.cookie('brand', setCookie, {
    maxAge : 5000,
    Expires : new Date('2023-02-07'),
    // httpOnly : true, // 브라우저 단에서 쿠키를 함부로 접근하지 못하도록 제한
    // secure : true, // http가 아닌 https로만 접근허용
    // domain : 'example.com', // 생략하면 기본주소
    authorized : true
  });
  res.json({success : true, message : setCookie});
}

const delCookies = (req, res)=>{
  res.clearCookie('brand');
  res.send({success : true});
}


module.exports = {getCookies, acceptCookies, delCookies};