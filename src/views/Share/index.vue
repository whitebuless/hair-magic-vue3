<script setup>
import { onMounted, ref,inject, watchEffect } from "vue";
import { getShareApi } from "../../apis/shareAPpi"
import ShareCardModelVue from "./components/shareCardModel.vue";

const shareArray=ref([])

const searchText = inject('searchText');

onMounted(()=>{
  getShares('')
})

watchEffect((searchText)=>{
  getShares(searchText)
})

async function getShares(title){
  await getShareApi(title).then((res=>{
    shareArray.value=res.data.data
  }))
  console.log(shareArray.value);
}


</script>
<template>
  <div id="shareBox">
    <div v-for="(item,i) in shareArray" :key="item.id" class="share">
      <ShareCardModelVue
        :shareBody="item"
      ></ShareCardModelVue>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#shareBox{
  display: flex;
  flex-wrap: wrap;
}
</style>