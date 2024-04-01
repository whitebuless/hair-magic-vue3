import { defineStore } from 'pinia'
import {userLoginApi} from '../apis/userApi'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      count: 0,
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
    login(phoneNumber,password){
      console.log(userLoginApi(phoneNumber,password));
    }
  },
})