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
// 更新订单状态
const updateOrderApi=function(order){
  return axiosInstance({
    url:'/order/update',
    method:'POST',
    data:order
  })
}


export {
  findOrderByAllApi,
  addOrderApi,
  updateOrderApi
}

