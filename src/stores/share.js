import { defineStore } from 'pinia'
import router from '../router/index.js'
import { uploadShareApi } from '../apis/shareAPpi.js'
import { message } from 'ant-design-vue'

export const useShareStore = defineStore('share', {
  state: () => {
    return { 
      shareInfo:{},
      shareList:[],
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    uploadShare(share){
      uploadShareApi(share).then(res=>{
        if(res.data.code=='200'){
          message.success("发布成功")
          router.push("/home/find")
        }
      })
    }
  }
})