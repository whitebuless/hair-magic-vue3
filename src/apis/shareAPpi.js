import {axiosInstance}  from "../http/index.js"

const getShareApi=function(shareKey){
  // 定义要发送的数据
  const share = {};
  return axiosInstance({
    url:'/share/get',
    method:'GET',
    params:{
      shareKey:shareKey
    }
  })
}

export {
  userLoginApi
}

