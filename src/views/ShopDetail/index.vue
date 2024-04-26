<template>
  <div class="detailBox">
    <div class="info" v-if="merchant!=null">
      <h1>{{ merchant.name }}</h1>
      <p>
        <a-rate v-model:value="merchant.rank" disabled/>
        {{ merchant.rank }}
      </p>
      <p>简介：{{ merchant.description }}</p>
    </div>
    <div v-else>
      <a-spin size="large" />
    </div>
    <!-- 选择服务 -->
    <div class="choice">
      <div @click="handleOrder">预约</div>
      <div @click="handleShare">分享</div>
    </div>

    <div class="card order" v-if="nowChoice=='预约'">
      <p>日期选择</p>
    </div>
    <div class="card shares" v-else-if="nowChoice=='分享'">
      <div class="share" v-for="share in shareList" :key="share.id">
        <shareCardModel  :shareBody="share" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
import { getMerchantByAllApi } from '../../apis/merchantApi';
import { useMerchantStore } from '../../stores/merchant';
import { getShareByShopIdApi } from '../../apis/shareAPpi';
import shareCardModel from '../Share/components/shareCardModel.vue';
const merchant=ref({})
const merchantStore=useMerchantStore()
const nowChoice=ref("预约")
const shareList=ref([])
onMounted(()=>{
  const route = useRoute();
  const id = route.params.id;
  const data={
    id:id
  }
  getMerchantByAllApi(data).then(res=>{
    merchant.value=res.data.data[0]
    merchantStore.merchantInfo=res.data.data[0]
  })
})
// 处理点击预约卡片
function handleOrder(){
  nowChoice.value="预约"
}
// 处理点击分享卡片
function handleShare(){
  nowChoice.value="分享"
  getShareByShopIdApi(merchant.value.id).then(res=>{
    shareList.value=res.data.data
  })

}
</script>
<style lang="scss" scoped>
.detailBox{
  width: 100%;
  background-color: #fff;
  .choice{
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    div{
      flex: 1;
      text-align: center;
      background-color: #e2e2e2;
      padding: 1rem;
      &:hover{
        background-color: rgb(100, 0, 0);
        color: white;
      }
    }


  }
  .card{
    padding: 1rem;
    box-shadow: 0 0 5px 5px rgba(15, 14, 14, 0.082);
    border: 0;
  }
  .order{
      width: 100%;
      height: 500px;
      background-color: rgb(255, 255, 255);
    }
  .shares {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr)); /* 让列宽自适应，最小宽度50% */
    grid-auto-rows: minmax(100px, auto); /* 定义每行的最小和最大高度 */
    gap: 1rem; /* 添加间距 */
  }
}
</style>