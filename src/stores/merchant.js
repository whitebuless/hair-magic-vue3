import { defineStore } from 'pinia'
import {getMerchantByUserIdApi} from '../apis/merchantApi.js'
import router from '../router/index.js'

export const useMerchantStore = defineStore('merchant', {
  state: () => {
    return { 
      merchantInfo:{}
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    async getMerchant(id) {

      await getMerchantByUserIdApi(id)
        .then(response => {
          // 处理成功情况

        })
        .catch(error => {
          // 处理错误情况
          console.log(error);
        })
        .finally((res) => {
          // 总是会执行的
        });
    }
  },
  persist: true
})