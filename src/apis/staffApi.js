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
// 更新员工信息
const updateStaffApi=function(staff){
  return axiosInstance({
    url:'/staff/update',
    method:"POST",
    data:staff
  })
}
export {
  staffInMerchantApi,
  addStaffApi,
  deleteStaffApi,
  updateStaffApi
}

