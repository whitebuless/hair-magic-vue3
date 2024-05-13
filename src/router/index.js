// 引入依赖
import {createRouter,createWebHashHistory} from "vue-router"

import LoginView from "@/views/Login/index.vue"
import HomeView from "@/views/Home/index.vue"
import ShareView from "@/views/Share/index.vue"
import ShopView from "@/views/Shop/index.vue"
import FuncView from "@/views/Func/index.vue"

import UploadingClientView from "@/views/UploadClient/index.vue"
import MerchantView from "@/views/merchant/index.vue"


import DataShowView from "@/views/merchant/list/DataShow/index.vue"
import StaffView from "@/views/merchant/list/Staff/index.vue"
import ClientView from "@/views/merchant/list/Client/index.vue"
import ReservationView from "@/views/merchant/list/Reservation/index.vue"
import ShopDetailView from "@/views/ShopDetail/index.vue"
import UserInfoView from "@/views/UserInfo/index.vue"
import UserOrderView from "@/views/UserOrder/index.vue"
import AddInfoView from "@/views/AddInfo/index.vue"
import NewMerchantView from "@/views/NewMerchant/index.vue"
import SearchView from "@/views/Search/index.vue"
import FocusView from "@/views/Focus/index.vue"
import BusinessView from "@/views/merchant/list/Business/index.vue"
import VipView from "@/views/merchant/list/Vip/index.vue"
// 平台管理员部分组件导入
import SuperLogin from "@/views/Super/Login/index.vue"
import SuperAccount from "@/views/Super/index.vue"

const routers=[
  {
    path:'/superlogin',
    component:SuperLogin,
    name:'superlogin'
  },
  {
    path:'/superaccount',
    component:SuperAccount,
    name:'superaccount'
  },
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
      },
      {
        path:'business',
        component:BusinessView,
        name:'business'
      },
      {
        path:'vip',
        component:VipView,
        name:'vip'
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
        
        path:'',
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
      },
      {
        path:'focus',
        component:FocusView,
        name:'focus'
      },
      {
        path:'shopdetail/:id',
        component:ShopDetailView,
        name:'shopDetial'
      },
      {
        path:'user/:id',
        component:UserInfoView,
        name:'userInfo'
      },
      {
        path:'userorder',
        component:UserOrderView,
        name:'userorder'
      },
      {
        path:'search/:searchInfo',
        component:SearchView,
        name:'search',     
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
  },
  {
    path:'/addInfo',
    component:AddInfoView,
    name:'addInfo'
  },
  {
    path:'/newmerchant',
    component:NewMerchantView,
    name:'NewMerchant'
  },
] 

const router=createRouter({
  history:createWebHashHistory(),
  routes:routers
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 在这里执行你想要的逻辑，例如权限验证、页面访问记录等

  // 调用 next() 继续路由导航
  next();
});
// 
export default router