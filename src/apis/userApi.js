import {axiosInstance}  from "../http/index.js"

const userLoginApi=function(phoneNumber,password){
  // 定义要发送的数据
  const userData = {
    phoneNumber: phoneNumber,
    password: password
  };
  return axiosInstance({
    url:'/user/login',
    method:'POST',
    data:userData
  })
}

const findUserById=function(id){
  return axiosInstance({
    url:'/user/findbyid',
    method:'GET',
    params:{
      id
    }
  })
}

export {
  userLoginApi,
  findUserById
}

