import {axiosInstance}  from "../http/index.js"

const cutwordApi=function(str){
  return axiosInstance({
    url:'/cutword/str',
    method:'GET',
    params:{
      str
    }
  })
}
export {
  cutwordApi
}

