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
const recommendShareApi=function(userId,page,pageSize){
  return axiosInstance({
    url:'/share/recommendByContent',
    method:'GET',
    params:{
      userId,
      page,
      pageSize
    }
  })
}
// 根据用户id获取作品
const getShareByUserId=function(userId){
  return axiosInstance({
    url:'/share/getbyuserid',
    method:'GET',
    params:{
      userId
    }
  })
}
// 查询用户关注的作品
const getShareFocusApi=function(following){
  return axiosInstance({
    url:'/share/getfocusshare',
    method:'GET',
    params:{
      following
    }
  })
}
export {
  getShareApi,
  uploadShareApi,
  getShareByShopIdApi,
  recommendShareApi,
  getShareByUserId,
  getShareFocusApi
}

