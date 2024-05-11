import {axiosInstance}  from "../http/index.js"

// 新增
const addCommentForOrerApi=function(CommentForOrder){
  return axiosInstance({
    url:'/comfororder/add',
    method:'POST',
    data:CommentForOrder
  })
}


export {
  addCommentForOrerApi
}

