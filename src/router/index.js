// 引入依赖
import {createRouter,createWebHashHistory} from "vue-router"

import LoginView from "../views/Login/index.vue"
import HomeView from "../views/Home/index.vue"
import ShareView from "../views/Share/index.vue"
import FuncView from "../views/Func/index.vue"
import UploadingClientView from "../views/UploadClient/index.vue"
const routes=[
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
        path:'find',
        component:ShareView,
        name:'share'
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