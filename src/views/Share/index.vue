<script setup>
import { onMounted, ref,inject, watchEffect,provide } from "vue";
import { getShareApi } from "../../apis/shareAPpi"
import ShareCardModelVue from "./components/shareCardModel.vue";

const shareArray=ref([])


onMounted(()=>{
  getShares('')
})

async function getShares(title){
  await getShareApi(title).then((res=>{
    shareArray.value=res.data.data
  }))
  console.log(shareArray.value);
}



const toggleExpand = (item) => {
  item.isExpanded = !item.isExpanded;
};

</script>
<template>
  <div id="shareBox">
    <div v-for="(item,i) in shareArray" :key="item.id" class="share">
      <ShareCardModelVue 
      @click="toggleExpand(item)"
      :class="{ 'expanded': item.isExpanded }"
        :shareBody="item"
        style="transition: all .3s;"
      ></ShareCardModelVue>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#shareBox {
  column-count: 4; /* 设置列数 */
  column-gap: 1rem; /* 设置列之间的间隔 */
}
.expanded {
  width: 800px;
  height: 600px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  img{
    width: 20%;
  }
}
</style>