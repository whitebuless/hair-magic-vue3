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
    login(phoneNumber, password) {
      userLoginApi(phoneNumber, password)
        .then(response => {
          // 处理成功情况
          if (response.data.code === '200') {
            // 使用箭头函数来确保正确的上下文
            this.userInfo = response.data.data;
            if (response.data.data.identity === '用户') {
              router.push('/home');
            } else {
              router.push('/merchant');
            }
          }
        })
        .catch(error => {
          // 处理错误情况
          console.log(error);
        })
        .finally(() => {
          // 总是会执行的
        });
    }
  },
  persist: true
})