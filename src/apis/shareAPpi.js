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

export {
  getShareApi
}

