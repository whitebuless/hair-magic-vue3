<template>
  <div>
    <div v-for="i in shopList" @click="router.push(`/home/shopDetail/${i.id}`)">
      <shopCardModelVue :shopInfo="i"></shopCardModelVue>
    </div>  
  </div>
</template>
<script setup>
import shopCardModelVue from "./components/shopCardModel.vue";
import { ref,onMounted } from "vue";
import router from "../../router/index.js";
import { getMerchantByAllApi} from "../../apis/merchantApi.js"
import { findOrderByAllApi } from "../../apis/orderApi";
const shopList=ref([
])

onMounted(()=>{
  let a={location:''}
  getMerchants(a)
})
async function getMerchants(merchant){
  await getMerchantByAllApi(merchant).then((res=>{
    shopList.value=res.data.data
    shopList.value.forEach(item=>{
      const data={
        merchantId:item.id,
        status:'处理中',
      }
      findOrderByAllApi(data).then(res=>{
        item.waiting=res.data.data.length;
      })

    })
  }))
}

async function getInorderPeople(){
  const data={
    merchantId:1,
    status:'处理中',
  }
  findOrderByAllApi(data).then(res=>{

  })
}
</script>
<style>
</style>