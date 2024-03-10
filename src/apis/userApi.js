import {axiosInstance}  from "../http/index.js"


const userLoginApi=function(phoneNumber,password){
  axiosInstance({
    url:'/findByPhoneNumberAndPassword',
    params:{
      phoneNumber:phoneNumber,
      password:password
    }
  })
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    if(response.data){alert("登陆成功")}
    else{
      alert("用户名与密码不匹配")
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

