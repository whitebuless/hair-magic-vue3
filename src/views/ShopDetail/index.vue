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
      <div style="width: 100%;
      height: 1px;
      margin-bottom: 15px;
      background-color: rgb(100,0,0);"></div>
      <p style="color: #666666;">
        <span class="iconfont icon-calendar-full"
              style="color: rgb(100,0,0);
              margin: 10px;
              font-size: 15px;"
        ></span>
        预约日期选择</p>
      <div class="date">
        <div class="dateCard" 
        v-for="i in days" 
        @click="handleDateCardClick(i)"
        
        >
          <div class="dateText" >
            {{ new Date(Date.now() + (i-1) * 24 * 60 * 60 * 1000)
          .toLocaleDateString().split('/').join('-') }}
          </div>
          <div class="orderNum">
            <span>预约人数：{{ listNum[i] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card shares" v-else-if="nowChoice=='分享'">
      <div class="share" v-for="share in shareList" :key="share.id">
        <shareCardModel  :shareBody="share" />
      </div>
    </div>


    <div class="cover" 
    v-show="ordering"
    @click="ordering=false"></div>
    <div class="appointmentInfo" :class="{open:ordering}">
      <div class="headTxt">
        <h1>预约信息填写</h1>
        <div
        style="width: 100%;
        height: 1px;
        background-color: rgb(100,0,0);margin-bottom: 5px;"
        ></div>
        <p style="font-size: 12px;">
          <span style="color: red;">*</span>
          请如实填写您的信息,便于校验</p>
        <p>预约时间:
          {{ new Date(Date.now() + (choiceDay-1) * 24 * 60 * 60 * 1000)
          .toLocaleDateString().split('/').join('-') }}
        </p>
      </div>
      <div class="formBody" style="padding: 0 20px;">
        <label for="">姓名:</label>
        <input type="text" class="inp" v-model="orderFormData.name"><br>
        <label for="">电话:</label>
        <input type="text" class="inp" v-model="orderFormData.phoneNumber">
        <a-select
          v-model:value="staff"
          style="width: 100%;margin-bottom: 10px;"
          placeholder="Tags Mode"
        >
        <a-select-option :value="item.name"
          v-for="item in staffList"
          >{{ item.name }} ￥ {{ item.price }}</a-select-option>
        </a-select>
        <p style="font-size: 12px;">
          <span style="color: red;">*</span>
          具体发型师以到店为准</p>
        <a-button type="primary" @click="handleOrdeClick">确认预定</a-button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { onMounted,reactive,ref,computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
import { useUserStore } from '../../stores/user';
import { getMerchantByAllApi } from '../../apis/merchantApi';
import { useMerchantStore } from '../../stores/merchant';
import { getShareByShopIdApi } from '../../apis/shareAPpi';
import { addOrderApi } from '../../apis/orderApi';
import { findOrderByAllApi } from '../../apis/orderApi';
import { staffInMerchantApi } from '../../apis/staffApi';
import shareCardModel from '../Share/components/shareCardModel.vue';
import { number } from 'echarts';
import { message } from 'ant-design-vue';
// 用户信息
const userStore=useUserStore()
// 商家信息
const merchant=ref({})
const merchantStore=useMerchantStore()
// 选择面板
const nowChoice=ref("预约")
// 店铺相关分享列表
const shareList=ref([])
//  预约信息结构体
const orderFormData=reactive({
  name:'',
  phoneNumber:'',
  clientId:0,
  merchantId:0,
  number:0,
  status:'',
  orderTime:''
})
// dateCard点击处理
function handleDateCardClick(i){
  ordering.value=true;
  choiceDay.value=i;
}

// 进入预约状态
const ordering=ref(false)
// 选中的天编号
const choiceDay=ref(0)
const staff=ref('')
const staffList=ref([])
// 处理预定
async function handleOrdeClick(){
  if(orderFormData.name==''){
    alert("请输入姓名")
    return
  }
  if(orderFormData.phoneNumber==''){
    alert("请输入联系方式")
    return
  }
  orderFormData.clientId=userStore.userInfo.id;
  orderFormData.merchantId=merchant.value.id;
  orderFormData.number=listNum.value[choiceDay.value]+1;
  orderFormData.status="未到店"
  orderFormData.price=0
  orderFormData.orderTime=
   new Date(Date.now() + (choiceDay.value-1) * 24 * 60 * 60 * 1000)
          .toISOString();
  await addOrderApi(orderFormData).then(res=>{
    if(res.data.code=='200'){
      message.success(res.data.data)
    }
  })
  window.location.reload()
}
// 限制预约天数
const days=ref(8)
// 人数列表
const listNum=ref([])
onMounted(async()=>{
  const route = useRoute();
  const id = route.params.id;
  const data={
    id:id
  }
  await getMerchantByAllApi(data).then(res=>{
    merchant.value=res.data.data[0]
  })

  await staffInMerchantApi(merchant.value.id).then(res=>{
    staffList.value=res.data.data
  })

  // 循环遍历每一天
  for (let i = 1; i <= days.value; i++) {
    const getOrderNumdata = {
      merchantId: merchant.value.id,
      orderTime: new Date(Date.now() + (i - 1) * 24 * 60 * 60 * 1000)
    };

    // 发送请求并等待结果
    const orderRes = await findOrderByAllApi(getOrderNumdata);
    listNum.value[i] = orderRes.data.data.length;
  }
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
      padding: 2rem;
      .date{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .dateCard{
          border-radius: 5px;
          box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.04);
          width: 20%;
          height: 6rem;
          background-color: white;
          color: rgb(100, 0, 0);
          text-align: center;
          margin: 5px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: center;
          &:hover{
            color: white;
            background-color: rgb(100, 0, 0);
          }
          .dateText{
            margin-bottom: 3px;
          }
          .orderNum{
            font-size: 12px;
          }
        }
      }
    }
  .shares {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr)); /* 让列宽自适应，最小宽度50% */
    grid-auto-rows: minmax(100px, auto); /* 定义每行的最小和最大高度 */
    gap: 1rem; /* 添加间距 */
  }
  .cover{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.096);
  }
  .appointmentInfo{
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    height: 0;
    background-color: rgb(255, 254, 249);
    box-shadow: 0 ;
    transition: all 0.3s;
    .headTxt{
      margin: 20px;
      color: #5a5a5a;
    }
    .formBody{
      .inp{
        padding: 5px;
        height: 2rem;
        width: 100%;
        margin-bottom: 15px;
        border: 0;
        border-bottom: 1px solid rgb(100,0,0);
        background-color: transparent;
        outline: none;
      }
    }
  }
  // 展开后
  .open{
    width: 350px;
    height: 500px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.123);
  }
}
</style>