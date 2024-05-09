import {axiosInstance}  from "../http/index.js"

// 浏览接口
const lookApi=function(userId,shareId){
  return axiosInstance({
    url:'/behavior/look',
    method:'POST',
    data:{
      userId,
      shareId
    }
  })
}
// 点赞行为接口
const likeApi=function(userId,shareId){
  return axiosInstance({
    url:'/behavior/like',
    method:'POST',
    data:{
      userId,
      shareId
    }
  })
}


export {
  lookApi,
  likeApi
}