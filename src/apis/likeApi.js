import {axiosInstance}  from "../http/index.js"

const getLikeApi=function(id){
  return axiosInstance({
    url:`/${id}/likes`,
    method:'GET',
  })
}

const likeApi=function(userId,shareId){
  return axiosInstance({
    url:'/api/like',
    method:'POST',
    data:{
      userId,
      shareId
    }
  })
}

const unlikeApi=function(userId,shareId){
  return axiosInstance({
    url:`/${userId}/unlike/${shareId}`,
    method:'DELETE'
  })
}

export {
  getLikeApi,
  likeApi,
  unlikeApi
}