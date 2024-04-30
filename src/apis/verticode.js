import {axiosInstance}  from "../http/index.js"

const getCode=function(email){
  return axiosInstance({
    url:`/sendEmail/${email}`,
    method:'GET',
  })
}
export{
  getCode
}