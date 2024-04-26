import {axiosInstance}  from "../http/index.js"

const getCommentByShareIdApi=function(id){
  return axiosInstance({
    url:'/comment/getByShareId',
    method:'GET',
    params:{
      id
    }
  })
}

const subCommentApi=function(userId,userName,comment,shareId){
  const reqBody={
    userId:userId,
    userName:userName,
    comment:comment,
    shareId:shareId
  }
  return axiosInstance({
    url:'/comment/subcomment',
    method:'POST',
    data:reqBody
  })
}

export {
  getCommentByShareIdApi,
  subCommentApi
}

