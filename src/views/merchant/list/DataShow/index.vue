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
        <p :style="cardPStyle">￥{{todayPrice.totalPrice}}元</p>
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
    <a-range-picker v-model:value="dateRange" />
    <!-- 添加按钮触发获取数据和渲染图表的操作 -->
    <button @click="fetchAndRenderChart" 
              style="border: 0;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: rgb(100,0,0);
                    padding: 5px;
                    color: white;
                    margin: 0 20px 20px;"
    >渲染图表</button>
    <div class="chart">
      <div id="chartBody" style="height:400px;width:100%" ></div>
    </div>
  </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';
import { useMerchantStore } from '../../../../stores/merchant';
import { findOrderByAllApi } from '../../../../apis/orderApi';
import { getPriceSumByDay } from '../../../../apis/orderApi';
import router from '../../../../router';
const merchantStore=useMerchantStore()
// 今日营业额
const todayPrice=ref({})
//当前选择的日期
const dateRange = ref([]); // 存储用户选择的时间范围
// 获取数据和渲染图表的方法
const fetchAndRenderChart = () => {
  console.log(dateRange.value[0]);
  const [startDate, endDate] = dateRange.value; // 获取用户选择的开始日期和结束日期
  const merchantId = merchantStore.merchantInfo.id; // 获取商户ID
  getPriceSumByDay(merchantId, 
                  startDate?.toISOString()?startDate.toISOString():new Date(Date.now()-8*24*60*60*1000).toISOString(),
                  endDate?.toISOString()?endDate.toISOString():new Date(Date.now()+1*24*60*60*1000).toISOString()).then(res => {
    // 处理获取的数据
    const data = res.data;
    const totalPriceData = processData(data);
    // 渲染图表
    renderChart(totalPriceData);
  });
};
// 处理后端返回的数据
const processData = (data) => {
  // 这里根据后端返回的数据格式进行处理，计算每天的总营业额并返回
  const chartData = [];
  data.forEach(item => {
    const orderDate = item.orderDate.split('T')[0]; // 假设后端返回的时间格式为 'YYYY-MM-DDTHH:mm:ss'
    const totalPrice = item.totalPrice;
    chartData.push({ orderDate, totalPrice });
  });
  return chartData;
};

// 渲染图表
const renderChart = (data) => {
  // 这里使用 ECharts 渲染图表
  const chart = echarts.init(document.getElementById('chartBody'));
  const xAxisData = data.map(item => item.orderDate);
  const seriesData = data.map(item => item.totalPrice);
  const option = {
    title: {
      text: '营业额'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: seriesData,
      type: 'line',
      smooth: true
    }]
  };
  chart.setOption(option);
};
// 今日客流量数
const clientCount=ref(0)
// 待处理预约
const waitingToSolve=ref(0)
onMounted(()=>{
  getPriceSumByDay(merchantStore.merchantInfo.id,new Date(Date.now()).toISOString(),new Date(Date.now()+1*24*60*60*1000).toISOString()).then(res=>{
    todayPrice.value=res.data[0]
  })
  fetchAndRenderChart(); // 页面加载时立即调用获取数据和渲染图表的方法
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
  margin-bottom: 20px;
}
</style>