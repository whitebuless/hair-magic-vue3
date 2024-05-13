import {axiosInstance}  from "../http/index.js"

// 新增服务接口
const addBusinessApi=function(business){
  return axiosInstance({
    url:'/business/add',
    method:'POST',
    data:business
  })
}

// 查询接口
const findBusinessApi=function(merchantId){
  return axiosInstance({
    url:'/business/find',
    method:'GET',
    params:{
      merchantId
    }
  })
}

export {
  addBusinessApi,
  findBusinessApi
}