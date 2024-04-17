import {axiosInstance}  from "../http/index.js"

const staffInMerchantApi=function(id){
  return axiosInstance({
    url:'/staff/getbyid',
    method:'GET',
    params:{id}
  })

}

export {
  staffInMerchantApi
}

