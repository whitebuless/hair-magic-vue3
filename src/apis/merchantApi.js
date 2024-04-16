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

export {
  getMerchantByUserIdApi
}

