<template>
  <div class="searchContaner">
    <div class="tabs">
      <span :style="{ color: activeTab === '动态' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab1('动态')">动态</span>
      <a-divider type="vertical" />
      <span :style="{ color: activeTab === '店铺' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab2('店铺')">店铺</span>
      <a-divider type="vertical" />
      <span :style="{ color: activeTab === '关注' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab3( '关注')">关注</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
// 路由动态参数获取
const route = useRoute();
const searchInfo = route.params.searchInfo;
// tab绑定值
const activeTab = ref('动态');

// 改变tab
const activateTab1 = (tabNumber) => {
  activeTab.value = tabNumber;
}
const activateTab2 = (tabNumber) => {
  activeTab.value = tabNumber;
}
const activateTab3 = (tabNumber) => {
  activeTab.value = tabNumber;

}


</script>

<style lang="scss" scoped>
/* 这里可以添加任何你想要的全局样式 */
.searchContaner{
  width: 100%;
  .tabs{
    margin-bottom: 1.5rem;
    span{
      cursor: pointer;
      transition: all 0.2s;
      margin: 0 20px;
    }
  }
}
</style>
