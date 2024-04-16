<template>
  <div class="list-item">
    <div  class='cards' style=" padding: 25px">
      <a-card 
      title="今日营业额" 
      :bordered="true" 
      :style="cardStyle"
      style="
      box-shadow: 0 0 4px 4px rgb(207,207,207);
      ">
        <p :style="cardPStyle">￥32,000元</p>
      </a-card>
      <a-card 
      title="今日客流量" 
      :bordered="true" 
      :style="cardStyle"
      style="box-shadow: 0 0 4px 4px rgb(207,207,207);">
        <p :style="cardPStyle">35人次</p>
      </a-card>
      <a-card 
      title="待处理预约" 
      :bordered="true" 
      :style="cardStyle"
      style="
      box-shadow: 0 0 4px 4px rgb(207,207,207);">
        <p :style="cardPStyle">4人</p>
      </a-card>
      <a-card 
      title="待处理" 
      :bordered="true"
      :style="cardStyle"
      style="
      box-shadow: 0 0 4px 4px rgb(207,207,207);">
        <p :style="cardPStyle">999+</p>
      </a-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const cardStyle=ref({
  width:'250px',
  height:'150px'
})
const cardPStyle=ref({
  fontSize:'25px'
})
</script>
<style lang="scss" scoped>
.cards{
  display: flex;
  justify-content: space-between;
}
</style>