import {axiosInstance}  from "../http/index.js"

const findOrderByAllApi=function(order){ 
  return axiosInstance({
    url:'/order/getbyall',
    method:'POST',
    data:order
  })
}

const addOrderApi=function(order){
  return axiosInstance({
    url:'/order/add',
    method:'POST',
    data:order
  })
}


export {
  findOrderByAllApi,
  addOrderApi
}
