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
// const shopList=ref([])
const shopList=ref([
  {
    id:1,
    name:"暖密封发廊",
    location:"山东",
    rank:4.2,
  },
  {
    id:2,
    name:"暖密封发廊",
    location:"山东",
    rank:4.2,
  },
  {
    id:3,
    name:"暖密封发廊",
    location:"山东",
    rank:4.2,
  },
  {
    id:4,
    name:"暖密封发廊",
    location:"山东",
    rank:4.2,
  },
  
])

onMounted(()=>{
  let a={location:'山东'}
  getMerchants(a)
})

async function getMerchants(merchant){
  await getMerchantByAllApi(merchant).then((res=>{
    shopList.value=res.data.data
  }))
}

</script>
<style>
</style>