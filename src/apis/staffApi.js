import {axiosInstance}  from "../http/index.js"

const staffInMerchantApi=function(id){
  return axiosInstance({
    url:'/staff/getbyid',
    method:'GET',
    params:{id}
  })
}

const addStaffApi=function(staff){
  return axiosInstance({
    url:'/staff/add',
    method:'POST',
    data:staff
  })
}

const deleteStaffApi=function(id){
  return axiosInstance({
    url:'/staff/delete',
    method:'GET',
    params:{
      id
    }
  })
}

export {
  staffInMerchantApi,
  addStaffApi,
  deleteStaffApi
}

