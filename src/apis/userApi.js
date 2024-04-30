import {axiosInstance}  from "../http/index.js"

const userLoginApi=function(email,password){
  // 定义要发送的数据
  const userData = {
    email: email,
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

const userLoginVerticalApi=function(email,code,identity){
  return axiosInstance({
    url:'/user/login2',
    method:'GET',
    params:{
      email,
      code,
      identity
    }
  })
}
// 更新和用户信息
const updateUserApi=function(user){
  return axiosInstance({
    url:'/user/update',
    method:'POST',
    data:user
  })
}


export {
  userLoginApi,
  findUserById,
  userLoginVerticalApi,
  updateUserApi
}

