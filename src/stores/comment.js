import { defineStore } from 'pinia'
import { subCommentApi } from '../apis/commentApi.js'
import { getCommentByShareIdApi } from '../apis/commentApi.js'
import router from '../router/index.js'



export const useCommentStore = defineStore('comment', {
  state: () => {
    return { 
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    subComment(userId,userName,comment,shareId) {
      subCommentApi(userId,userName,comment,shareId)
        .then(response => {
          // 处理成功情况

          alert(response.data.msg)

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