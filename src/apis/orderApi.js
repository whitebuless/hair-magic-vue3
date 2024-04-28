import {axiosInstance}  from "../http/index.js"

const findOrderByAllApi=function(order){ 
  return axiosInstance({
    url:'/order/getbyall',
    method:'POST',
    data:order
  })
}


export {
  findOrderByAllApi
}

