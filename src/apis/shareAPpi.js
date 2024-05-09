import {axiosInstance}  from "../http/index.js"

const getShareApi=function(title){
  // 定义要发送的数据
  const share = {};
  return axiosInstance({
    url:'/share/get',
    method:'GET',
    params:{
      title:title
    }
  })
}
const uploadShareApi=function(share){
  return axiosInstance({
    url:'/share/upload',
    method:'POST',
    data:share
  })
}
const getShareByShopIdApi=function(id){
  return axiosInstance({
    url:'/share/getbyshopid',
    method:'GET',
    params:{
      id:id
    }
  })
}
const recommendShareApi=function(userId){
  return axiosInstance({
    url:'/share/recommendByContent',
    method:'GET',
    params:{
      userId
    }
  })
}

export {
  getShareApi,
  uploadShareApi,
  getShareByShopIdApi,
  recommendShareApi
}

