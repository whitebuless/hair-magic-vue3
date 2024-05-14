import { defineStore } from 'pinia'
import {userLoginApi,userLoginVerticalApi} from '../apis/userApi'

import router from '../router/index.js'
import { message } from 'ant-design-vue'



export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      userInfo:{},
      following:[],
      follower:[],
      likes:[],
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    login(email, password) {
      userLoginApi(email, password)
        .then(response => {
          // 处理成功情况
          if (response.data.state) {
            localStorage.setItem("token",response.data.token)
            // 使用箭头函数来确保正确的上下文
            this.userInfo = response.data.user;
            if (response.data.user.identity === '用户') {
              router.push('/home');
            } else {
              router.push('/merchant');
            }
          }
          else{
            message.error(response.data.msg)
          }
        })
        .catch(error => {
          // 处理错误情况
          message.error("服务器错误,请联系管理员")
        })
        .finally(() => {
          // 总是会执行的
        });
    },
    loginVertical(email,code,identity){
      userLoginVerticalApi(email,code,identity).then(res=>{
        if(res.data.data=='验证码错误'){
          message.error(res.data.data)
        }else{
          this.userInfo = res.data.data;
          if (res.data.data.identity === '用户') {
            router.push('/home');
          } else {
            router.push('/merchant');
          }
        }
      })

    }
  },
  persist: true
})