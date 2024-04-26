// 引入依赖
import {createRouter,createWebHashHistory} from "vue-router"

import LoginView from "../views/Login/index.vue"
import HomeView from "../views/Home/index.vue"
import ShareView from "../views/Share/index.vue"
import ShopView from "../views/Shop/index.vue"
import FuncView from "../views/Func/index.vue"

import UploadingClientView from "../views/UploadClient/index.vue"
import MerchantView from "../views/merchant/index.vue"


import DataShowView from "../views/merchant/list/DataShow/index.vue"
import StaffView from "../views/merchant/list/Staff/index.vue"
import ClientView from "../views/merchant/list/Client/index.vue"
import ReservationView from "../views/merchant/list/Reservation/index.vue"
const routes=[
  {
    path:'/merchant',
    component:MerchantView,
    name:'merchant',
    children:[
      {
        path:'datashow',
        component:DataShowView,
        name:'datashow'
      },
      {
        path:'staff',
        component:StaffView,
        name:'staff'
      },
      {
        path:'client',
        component:ClientView,
        name:'client'
      },
      {
        path:'reservation',
        component:ReservationView,
        name:'reservation'
      }
    ]
  },
  {
    path:'/',
    component:LoginView,
    name:'login'
  },
  {
    path:'/home',
    component:HomeView,
    name:'home',
    children:[
      {
        
        path:'/',
        redirect:'/home/find'
      },
      {
        path:'find',
        component:ShareView,
        name:'share'
      },
      {
        path:'shop',
        component:ShopView,
        name:'shop'
      }
    ]
  },
  {
    path:'/func',
    component:FuncView,
    name:'func',
    children:[
      {
        path:'uploadClient',
        component:UploadingClientView,
        name:'uploadClient'
      },
    ]
  }
] 

const router=createRouter({
  history:createWebHashHistory(),
  routes,
})
// 
export default router