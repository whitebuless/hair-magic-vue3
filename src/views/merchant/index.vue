<template>
  <div class="Box">
    <div class="topBox">
      <NavBar @click="solvedBefore=false" ></NavBar>
    </div>
    <div class="merchantBox">
      <div class="leftView">
        <SideBar @add-new="addNewOrder"></SideBar>
      </div>
      <div class="rightView">
        <div class="tableBox">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="cover" v-show="!solvedBefore">
      <div>
        <h1>选择店铺</h1>
        <ul>
          <li v-for="item in merchantList" @click="handleChooseMerchant(item)" >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>


    <a-modal v-model:open="open" title="新增游客单" @ok="handleOk">
      <a-form-item label="金额">      <a-input-number v-model:value="newPrice"></a-input-number></a-form-item>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import { useMerchantStore } from '../../stores/merchant';
import { useUserStore } from '../../stores/user';
import {getMerchantByUserIdApi} from '../../apis/merchantApi.js'
import { addOrderApi } from '../../apis/orderApi.js';
import router from '../../router/index.js';
import { number } from 'echarts';
import { message } from 'ant-design-vue';
const userStore=useUserStore()
const merchantStore=useMerchantStore()
const merchantList=ref([])
const solvedBefore=ref(false)
onMounted(()=>{
  getMerchantList(userStore.userInfo.id);
  if(merchantStore.merchantInfo!=null){
    solvedBefore.value=true
  }
})
// 游客但编辑面板
const open=ref(false)
const newPrice=ref(0)
// 游客+点击
function addNewOrder(){
  open.value=true
}
// 确认新增
function handleOk(){
  const newOrderBody={
    name:'游客',
    phoneNumber:0,
    clientId:0,
    merchantId:merchantStore.merchantInfo.id,
    number:0,
    price:newPrice.value,
    status:'处理中',
    orderTime:new Date(Date.now()).toISOString()
  }
  addOrderApi(newOrderBody).then(res=>{
    if(res.data.code=='200'){
      message.success('下单成功')
    }

  })
  open.value=false
  location.reload()
}
async function getMerchantList(id){
  await getMerchantByUserIdApi(id).then((res=>{
    if(!res.data.data){
      router.push('/newmerchant')
    }
    else{
      merchantList.value=res.data.data
    }
  }))
}

function handleChooseMerchant(item){
  merchantStore.merchantInfo=item
  solvedBefore.value=true
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.Box{
  max-height: 100vh;
  overflow: hidden;

  .topBox{
    height: 30%;
  }
  .merchantBox{
    height: 70%;
    background-color: rgb(237, 237, 237);
    width:100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .leftView{
      width: 15%;
      height: 100%;
      overflow: scroll;
    }
    .rightView{
      width: 85%;
      height: 100%;
      .tableBox{
        box-sizing: content-box;
        padding: 20px;
        .list-item{
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 0 4px 4px rgb(207, 207, 207);
        }
      }
    }
  }
}
.cover{
  z-index: 99999;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.403);
  div{
    width: 300px;
    background-color: white;
    position: relative;
    left: 50%;
    border-radius: 10px;
    padding: 20px;
    top: 50%;
    transform: translate(-50%,-50%);
    ul{
      li{
        border-radius: 5px;
        padding: 15px;
        background-color: rgb(238, 238, 238);
        cursor: pointer;
        margin-bottom: 5px;
        &:hover{
          background-color:var(--theme);
          color: white;
        }
      }
    }
    
  }
}
</style>