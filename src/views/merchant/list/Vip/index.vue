<template>
  <div class="vipBox">
    <a-button type="primary" @click="addVipBtn">新增会员</a-button>
    <a-table :dataSource="vipList" :columns="columns" />
  </div>



  <a-modal v-model:open="open" title="搜索用户" @ok="handleAdd">
    <a-form-item label="根据id搜索">
      <a-input v-model:value="searchId" @change="changeInputId"/>
    </a-form-item>
    <div class="userDisplay" v-if="searchUser">
      {{ searchUser.username }}
      <br>
      {{ searchUser.email }}
    </div>

  </a-modal>
</template>
<script setup>
import { message } from 'ant-design-vue';
import {onMounted, ref,watch} from 'vue'
import { findUserById } from '../../../../apis/userApi';
import { addVipApi,getVipApi,getMerchantByAllApi } from '../../../../apis/merchantApi';

import { useMerchantStore } from '../../../../stores/merchant';
const merchantStore= useMerchantStore()
const open=ref(false)
// 添加新vip
// 输入id查询
const searchId=ref()
// 监听 searchId 的变化
function changeInputId(){
  findUserById(searchId.value).then(res=>{
      searchUser.value=res.data.data
      console.log(searchUser.value);
    })
}
// 会员数组
const vipList=ref([
])
const columns=[
          {
            title: 'id',
            dataIndex: 'id',
          },
          {
            title: '用户名',
            dataIndex: 'username',
          },
          {
            title: '性别',
            dataIndex: 'gender',
          }
        ]

onMounted(()=>{
  // 获取vip数组
  getVipApi(merchantStore.merchantInfo.vips).then(res=>{
    if(res.data.code=='500'){
      message.error(res.data.msg)
    }
    else if(res.data.code=='200'){
      vipList.value=res.data.data
    }
  })
})


// 查询到的user
const searchUser=ref({})

// 确认新增
async function handleAdd(){
  if(!searchUser.value){
    message.error("未找到该用户")
  }
  await addVipApi(searchId.value,merchantStore.merchantInfo.id).then(res=>{
    if(res.data.code=='200'){
      message.success("添加成功")
    }
    if(res.data.code=='500'){
      message.error(res.data.msg)
    }
  })
  const data={
    id:merchantStore.merchantInfo.id
  }
  await getMerchantByAllApi(data).then(res=>{
    merchantStore.merchantInfo=res.data.data[0]
  })
  await getVipApi(merchantStore.merchantInfo.vips).then(res=>{
    if(res.data.code=='500'){
      message.error(res.data.msg)
    }
    else if(res.data.code=='200'){
      vipList.value=res.data.data
    }
  })
  open.value=false
}

function addVipBtn(){
  open.value=true
}
</script>
<style lang="scss" scoped>
.vipBox{
  width: 100%;
  padding: 20px;
  height: 100vh;
  background-color: white;
}
</style>