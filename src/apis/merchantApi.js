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
// 新增会员
const addVipApi=function(vips,id){
  return axiosInstance({
    url:'/merchant/addVip',
    method:'GET',
    params:{
      vips,
      id
    }
  })
}
// 获取vip数组
const getVipApi=function(vips){
  return axiosInstance({
    url:'/merchant/queryVips',
    method:'GET',
    params:{
      vips
    }
  })
}
export {
  getMerchantByUserIdApi,
  getMerchantByAllApi,
  addMerchantApi,
  addVipApi,
  getVipApi
}

