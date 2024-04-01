// 引入依赖
import {createRouter,createWebHashHistory} from "vue-router"

import LoginView from "../views/Login/index.vue"
import HomeView from "../views/Home/index.vue"
const routes=[
  {
    path:'/',
    component:LoginView,
    name:'login'
  },
  {
    path:'/home',
    component:HomeView,
    name:'home'
  }
] 

const router=createRouter({
  history:createWebHashHistory(),
  routes,
})
// 
export default router