import { defineStore } from 'pinia'
import {userLoginApi} from '../apis/userApi'
import router from '../router/index.js'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      userInfo:{}
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    login(phoneNumber,password){
      userLoginApi(phoneNumber,password).then(function (response) {
        // 处理成功情况
        if(response.data.code=='200'){
          
          router.push('/home')
        }
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .finally(function () {
        // 总是会执行的
      });
    }
  },
})