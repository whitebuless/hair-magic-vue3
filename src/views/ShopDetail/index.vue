<template>
  <div class="detailBox">
    <div class="info" v-if="merchant!=null">
      <div class="infoBox">
        <span class="name"><b>{{ merchant.name }} 
          <span class="iconfont icon-huiyuan" v-if="imVip" style="color: rgb(156,0,0);font-size: 20px;"></span> 
        </b></span>
        <p>
          <a-rate v-model:value="merchant.rank" style="font-size: 10px;" disabled/>
        </p>
        <p>{{ merchant.description }}</p>
        <span class="iconfont icon-weizhi" style="margin-right: 20px;font-size: 13px;">{{ merchant.location }}</span>
        <span class="iconfont icon-dianhua" style="margin-right: 20px;font-size: 13px;">{{ merchant.phoneNumber }}</span>
      </div>
      <div class="businessBox">
        <a-table :columns="columns" :data-source="businessList" bordered>
          <template #bodyCell="{ column, text }">
          </template>
        </a-table>
      </div>
    </div>
    <div v-else>
      <a-spin size="large" />
    </div>
    <!-- 选择服务 -->
    <a-tabs v-model:activeKey="activeKey" class="tabs">
      <a-tab-pane key="1" tab="预约"> 
        <div class="card order">
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
        <a-skeleton active />
      </a-tab-pane>
      <a-tab-pane key="2" tab="评论" force-render>
        <div class="card shares" >
          <div v-if="shareList.length==0">
            <a-result title="暂无评论，快来预约吧">
              <template #icon>
                <span class="iconfont icon-xiaolian" style="font-size: 50px;color: rgb(100,0,0);"></span>
              </template>
            </a-result>
          </div>
          <div class="share" v-for="item in shareList" :key="item.id">
            <a-comment>
              <template #author>
                <a>{{ item.userName }}
                  <a-rate v-model:value="item.rank"  
                          style="font-size: 15px;margin-left: 10px;" 
                          disabled/>
                </a>
              </template>
              <template #avatar>
                <a-avatar :src="item.userAvatar" alt="Han Solo" />
              </template>
              <template #content>
                {{ item.content }}
              </template>
              <template #datetime>
                <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{ dayjs().from(item.createTime) }}</span>
                </a-tooltip>
              </template>
            </a-comment>
          </div>
        </div>

      </a-tab-pane>
      <!-- <a-tab-pane key="3" tab="">  <a-skeleton active /></a-tab-pane> -->
    </a-tabs>
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
          v-if="!imVip"
          v-model:value="choiceBusiness"
          style="width: 100%;margin-bottom: 10px;"
          placeholder="Tags Mode"
        >
        <a-select-option :value="item.price" 
          v-for="item in businessList"
          >{{ item.name }} ￥ {{ item.price }}</a-select-option>
        </a-select>
        <a-select v-else
          v-model:value="choiceBusiness"
          style="width: 100%;margin-bottom: 10px;"
          placeholder="Tags Mode"
        >
        <a-select-option :value="item.vipPrice" 
          v-for="item in businessList"
          >{{ item.name }} ￥ {{ item.vipPrice }}</a-select-option>
        </a-select>
        <p style="font-size: 12px;">
          <span style="color: red;">*</span>
          发型师以到店确定</p>
        <a-button type="primary" @click="handleOrdeClick">确认预定</a-button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { onMounted,reactive,ref,computed,watchEffect } from 'vue';
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
import { findByMerchantIdApi } from '../../apis/commentForOrderApi';
import { number } from 'echarts';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { findBusinessApi } from '../../apis/businessApi';
// 用户信息
const userStore=useUserStore()
// 商家信息
const merchant=ref({})
// 选择面板
const activeKey=ref("1")
watchEffect(() => {
  if (activeKey.value) {
    if(activeKey.value=='2'){
      findByMerchantIdApi(merchant.value.id).then(res=>{
        shareList.value=res.data.data
      })
    }
  }
});

// 判断是否为vip
const imVip=ref(false)

const columns = [
  {
    title: '项目名',
    dataIndex: 'name',
  },
  {
    title: '项目具体描述',
    dataIndex: 'detail',
  },
  {
    title: '普通价格',
    dataIndex: 'price',
  },
  {
    title: '会员价格',
    dataIndex: 'vipPrice',
  }
];
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
    message.error("请输入姓名")
    return
  }
  if(orderFormData.phoneNumber==''){
    message.error("请输入联系方式")
    return
  }
  orderFormData.clientId=userStore.userInfo.id;
  orderFormData.merchantId=merchant.value.id;
  orderFormData.number=listNum.value[choiceDay.value]+1;
  orderFormData.status="未到店"
  orderFormData.price=choiceBusiness.value
  orderFormData.orderTime=
   new Date(Date.now() + (choiceDay.value-1) * 24 * 60 * 60 * 1000)
          .toISOString();
  await addOrderApi(orderFormData).then(res=>{
    if(res.data.code=='200'){
      message.success(res.data.data)
    }
  })
  // window.location.reload()
}
// 限制预约天数
const days=ref(8)
// 服务列表
const businessList=ref([])
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
    if(merchant.value.vips){
      console.log(merchant.value.vips);
      if(merchant.value.vips.trim().split(' ').indexOf(userStore.userInfo.id.toString())!=-1){
        imVip.value=true
      }
    }
    console.log(imVip.value);

  })
  await staffInMerchantApi(merchant.value.id).then(res=>{
    staffList.value=res.data.data
  })
  await findBusinessApi(merchant.value.id).then(res=>{
    businessList.value=res.data.data
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

// 处理点击分享卡片
function handleShare(){
  nowChoice.value="分享"
  getShareByShopIdApi(merchant.value.id).then(res=>{
    shareList.value=res.data.data
  })
}

// 选中的项目
const choiceBusiness=ref({})
dayjs.extend(relativeTime);
</script>
<style lang="scss" scoped>
.detailBox{
  width: 100%;
  background-color: #fff;
  .info{
    max-height: 240px;
    overflow: hidden;
    background-color: white;
    padding: 30px;
    box-shadow: 0 0 5px 5px #f1f1f1;
    border-left: 5px solid rgb(100,0,0);
    display: flex;
    justify-content: space-between;
    .infoBox{
      width: 40%;;
    }
    .businessBox{
      width: 50%;
      overflow-y: scroll;
    }
    .name{
      font-size: 25px;
    }
  }
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
    .share{
      padding:0 5px 0;
      height: 4rem;
      &:hover{
      }
    }
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