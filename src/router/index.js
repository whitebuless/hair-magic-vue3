// 引入依赖
import {createRouter,createWebHashHistory} from "vue-router"

import LoginView from "../views/Login/index.vue"
const routes=[
  {
    path:'/',
    component:LoginView
  }
]

const router=createRouter({
  history:createWebHashHistory(),
  routes,
})


export default router