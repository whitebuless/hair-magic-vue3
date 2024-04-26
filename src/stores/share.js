import { defineStore } from 'pinia'
import router from '../router/index.js'
import { uploadShareApi } from '../apis/shareAPpi.js'

export const useShareStore = defineStore('share', {
  state: () => {
    return { 
      shareInfo:{}
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    uploadShare(share){
      uploadShareApi(share).then(res=>{
        alert(res.data.data)
      })
    }
  },
  persist: true
})