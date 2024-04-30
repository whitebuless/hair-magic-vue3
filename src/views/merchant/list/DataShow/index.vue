<template>
  <div class="list-item">
    <div  class='cards' style=" padding: 10px">
      <a-card 
      title="今日营业额" 
      :bordered="true" 
      :style="cardStyle"
      style="
      box-shadow: 0 0 4px 4px rgb(207,207,207);
      cursor: pointer;
      ">
        <p :style="cardPStyle">￥32,000元</p>
      </a-card>
      <a-card 
      title="今日预约" 
      :bordered="true" 
      :style="cardStyle"
      style="box-shadow: 0 0 4px 4px rgb(207,207,207);
            cursor: pointer;">
        <p :style="cardPStyle">{{clientCount}}人</p>
      </a-card>
      <a-card 
      title="待处理预约" 
      :bordered="true" 
      :style="cardStyle"
      style="
      box-shadow: 0 0 4px 4px rgb(207,207,207);      cursor: pointer;">
        <p :style="cardPStyle">{{waitingToSolve}}人</p>
      </a-card>
      <!-- <a-card 

      title="待处理" 
      :bordered="true"
      :style="cardStyle"
      style="
      box-shadow: 0 0 4px 4px rgb(207,207,207);      cursor: pointer;">
        <p :style="cardPStyle">999+</p>
      </a-card> -->
    </div>
    <div class="chart">
      <div id="chartBody" style="height:70vh;width:100%" ></div>
    </div>
  </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';
import { useMerchantStore } from '../../../../stores/merchant';
import { findOrderByAllApi } from '../../../../apis/orderApi';
import router from '../../../../router';
const merchantStore=useMerchantStore()
// 今日客流量数
const clientCount=ref(0)
// 待处理预约
const waitingToSolve=ref(0)
onMounted(()=>{
  const OrderBody={
    merchantId:merchantStore.merchantInfo.id,
    orderTime:new Date(Date.now()).toISOString() 
  }
  findOrderByAllApi(OrderBody).then(res=>{
    res.data.data.forEach(item=>{
      if(item.status=='未到店'){
        waitingToSolve.value++
      }
      clientCount.value++
    })
  })
  // chart生成
  let myChart = echarts.init(document.getElementById('chartBody'));
  myChart.setOption({
    title: {
      text: '营业额'
    },
    tooltip: {},
    xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      smooth: true
    }
  ]
  });
})

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