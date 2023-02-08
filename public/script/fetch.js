const fetchFunc = {
  get(url){
    return fetch(url);
  },
  post(url, payload){
    return fetch(url, {
      method : 'POST',
      body:JSON.stringify(payload),
      headers : {'Content-Type' : 'application/json;charset=utf-8'}
    })
  },
  put(url, payload){
    return fetch(url, {
      method : 'PUT',
      body:JSON.stringify(payload),
      headers : {'Content-Type' : 'application/json;charset=utf-8'}
    })
  },
  delete(url, payload){
    return fetch(url, {
      method : 'DELETE'
    })
  }
}