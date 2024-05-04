import {axiosInstance}  from "../http/index.js"

const getFollowingApi=function(id){
  return axiosInstance({
    url:`/${id}/following`,
    method:'GET',
  })
}

const followApi=function(userId,followingId){
  return axiosInstance({
    url:'/api/follow',
    method:'POST',
    data:{
      userId,
      followingId
    }
  })
}

const unfollowApi=function(userId,followingId){
  return axiosInstance({
    url:`/${userId}/unfollowing/${followingId}`,
    method:'DELETE'
  })
}

export {
  getFollowingApi,
  followApi,
  unfollowApi
}