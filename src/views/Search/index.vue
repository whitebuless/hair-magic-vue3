<template>
  <div class="searchContaner">
    <!-- <div class="tabs">
      <span :style="{ color: activeTab === '动态' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab1('动态')">动态</span>
      <a-divider type="vertical" />
      <span :style="{ color: activeTab === '店铺' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab2('店铺')">店铺</span>
      <a-divider type="vertical" />
      <span :style="{ color: activeTab === '关注' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab3( '关注')">关注</span>
    </div> -->
    <div v-if="activeTab=='动态'" class="tab">
      <div class="shareContainer" v-masonry >
        <ShareCardModelVue v-for="(item,i) in shareList" :key="item.id" class="share" v-masonry-tile
          :shareBody="item"
          style="transition: all .3s;max-width: 23%;" >
        ></ShareCardModelVue>
      </div>
    </div>
    <!-- <div v-if="activeTab=='店铺'" class="tab">
      这是店铺页面
    </div>
    <div v-if="activeTab=='关注'" class="tab">
      关注页面
    </div> -->

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getShareApi } from '../../apis/shareAPpi';
import ShareCardModelVue from "@/views/Share/components/shareCardModel.vue";
import router from '../../router';
// 路由动态参数获取
const route = useRoute();
const searchInfo = route.params.searchInfo;
// tab绑定值
const activeTab = ref('动态');
// 分享列表
const shareList=ref([])
// 改变tab
const activateTab1 = (tabNumber) => {
  getShare()
  activeTab.value = tabNumber;
}
const activateTab2 = (tabNumber) => {
  activeTab.value = tabNumber;
}
const activateTab3 = (tabNumber) => {
  activeTab.value = tabNumber;
}
// 获取分享列表
function getShare(){
  const searchInfo=route.params.searchInfo
  getShareApi(searchInfo).then(res=>{
    shareList.value=res.data.data
  })
}
// 

onMounted(()=>{
  getShare(route.params.searchInfo)
})


</script>

<style lang="scss" scoped>
/* 这里可以添加任何你想要的全局样式 */
.searchContaner{
  width: 100%;
  height: 100%;
  .tabs{
    margin-bottom: 1.5rem;
    span{
      cursor: pointer;
      transition: all 0.2s;
      margin: 0 20px;
    }
  }
  .tab{
    min-height: 100%;
    width: 100%;
  }
}
</style>
