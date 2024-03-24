import {axiosInstance}  from "../http/index.js"



const userLoginApi=function(phoneNumber,password){
  // 定义要发送的数据
  const userData = {
    phoneNumber: phoneNumber,
    password: password
  };
  axiosInstance({
    url:'/user/login',
    method:'POST',
    data:userData
  })
  .then(function (response) {
    // 处理成功情况
    if(response.data.data){alert("登陆成功")}
    else{
      alert(response.data.msg)
    }
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

