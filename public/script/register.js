const regexHandle = (regex, input)=>{
  const inputValue = input.value;
  const checked = regex.test(input.value);
  if(!checked){
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.nextElementSibling.style.display = "block";
  }else{
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.nextElementSibling.style.display = "none";
  }
}

// 이름
document.getElementById('userName').addEventListener('input', (event)=>{
  const input = event.target;
  const regex = /^[가-힣]{2,4}|^[a-z]{2,30}/gmi
  regexHandle(regex, input);
})

// id
document.getElementById('userId').addEventListener('input', (event)=>{
  const input = event.target;
  const regex = /^[a-z]{5,12}(\d+|\+|\$)?/gmi
  regexHandle(regex, input);
})

// email
document.getElementById('userEmail').addEventListener('input', (event)=>{
  const input = event.target;
  const regex = /[a-z\d.+-]+@[a-z\d]+\.([a-z]{2,8})(\.[a-z]{2,8})?/gmi
  regexHandle(regex, input);
})

// 전화번호
document.getElementById('userPhone').addEventListener('input', (event)=>{
  const input = event.target;
  const regex = /\(?\d{2,3}\)?[- ]?\d{4}[- ]?\d{4}/gm
  regexHandle(regex, input);
})

// 비밀번호
document.getElementById('userPwd').addEventListener('input', (event)=>{
  const input = event.target;
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$])\w+/gm
  regexHandle(regex, input);
})

// 비밀번호 확인
document.getElementById('userRepwd').addEventListener('input', (event)=>{
  const input = event.target;
  const pwd = document.querySelector('#userPwd');
  const repwd = document.querySelector('#userRepwd');
  // console.log(repwd.value)
  if(pwd.value !== repwd.value ){
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.nextElementSibling.style.display = "block";
  }else{
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.nextElementSibling.style.display = "none";
  }
})

document.getElementById('submitBtn').addEventListener('click', ()=>{
  const user = {
    user_name : userName.value,
    userId : userId.value,
    userEmail : userEmail.value,
    userPhone : userPhone.value,
    userPassword : userPwd.value,
  }
  console.log(user);

  const url = 'https://port-0-node-test-sop272gldk7qjen.gksl2.cloudtype.app/register'
  // fetch(url, {
  //   method : "POST",
  //   body:JSON.stringify(user),
  //   headers: {'Content-Type' : 'application/json;charset=utf-8'}
  // })
  fetchFunc.post(url, user)
  .then(res => res.json())
  .then(res=>console.log(res))
})