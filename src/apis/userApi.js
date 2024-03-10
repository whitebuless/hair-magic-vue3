import {axios}  from "../http/index.js"


const userLoginApi=function(phoneNumber,password){
  axios.get('/user?ID=12345')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行的
  });
}

export {
  userLoginApi
}

