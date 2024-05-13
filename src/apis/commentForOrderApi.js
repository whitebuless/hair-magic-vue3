import {axiosInstance}  from "../http/index.js"

// 新增
const addCommentForOrerApi=function(CommentForOrder){
  return axiosInstance({
    url:'/comfororder/add',
    method:'POST',
    data:CommentForOrder
  })
}
// 根据店家查询
const findByMerchantIdApi=function(id){
  return axiosInstance({
    url:'/comfororder/findbymerchantid',
    method:'GET',
    params:{
      id
    }
  })
}


export {
  addCommentForOrerApi,
  findByMerchantIdApi
}

