import { defineStore } from 'pinia'
import { addStaffApi } from '../apis/staffApi.js'
import router from '../router/index.js'
import { message } from 'ant-design-vue'



export const useStaffStore = defineStore('staff', {
  state: () => {
    return { 
      staffInfo:{}
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    addStaff(staff) {
      addStaffApi(staff)
        .then(res=>{
          message.success(res.data.data)
        })
    }
  },
  persist: true
})