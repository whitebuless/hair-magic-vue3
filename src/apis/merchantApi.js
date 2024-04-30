import {axiosInstance}  from "../http/index.js"

const getMerchantByUserIdApi=function(id){
  // 定义要发送的数据
  return axiosInstance({
    url:'/merchant/getbyuserid',
    method:'GET',
    params:{
      id
    }
  })
}


const getMerchantByAllApi=function(merchant){
  // 定义要发送的数据
  return axiosInstance({
    url:'/merchant/getbyall',
    method:'POST',
    data:merchant
  })
}

// 新增
const addMerchantApi=function(merchant){
  return axiosInstance({
    url:"/merchant/add",
    method:"POST",
    data:merchant
  })
}
export {
  getMerchantByUserIdApi,
  getMerchantByAllApi,
  addMerchantApi
}

