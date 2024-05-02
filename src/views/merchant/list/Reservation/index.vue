<template>
  <div class="list-item" >
    <div class="topTables">
      <!-- 今日订单 -->
      <a-table :columns="columnsToday" :data-source="dataToday" @change="onChange" class="todayTable" >
        <h1>今日订单</h1>
        <template #bodyCell="{ column,row,record }">
          <template v-if="column.key === 'action'">
          <span>
            <a @click="alignClick(record)">分配</a>
            <a-divider type="vertical" />
            <a style="color: red;">取消</a>
            <a-divider type="vertical" />
          </span>
        </template>
        </template>
      </a-table>   
      <a-divider type="vertical" />
      <!-- 正在进行的订单 -->
      <a-table :columns="columnsIng" :data-source="dataIng" @change="onChange" class="ingTable">
        <template #bodyCell="{ column,row,record }">
          <template v-if="column.key === 'action'">
          <span>
            <a @click="handleCleanClick(record)">结算</a>
            <a-divider type="vertical" />
            <a-divider type="vertical" />
          </span>
        </template>
        </template>
      </a-table>
    </div>
    <!-- 全部订单 -->
    <a-table :columns="columns" :data-source="data" @change="onChange">
      <!-- <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
        <span>
          <a>结算</a>
          <a-divider type="vertical" />
          <a style="color: red;">取消</a>
          <a-divider type="vertical" />
        </span>
      </template>
      </template> -->
    </a-table>
  </div>

  <a-drawer :width="500" title="选择发型师" placement="right" :open="open" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="alignConfirm">确认</a-button>
    </template>
    <a-radio-group v-model:value="choiceStaff">
      <a-radio v-for="item in staffList" :style="radioStyle" :value="item">{{item.name}}</a-radio>
    </a-radio-group>
  </a-drawer>

  <!-- 分配对话框 -->
  <a-modal v-model:open="openClean" title="结算面板" @ok="handleOk">
    <label for="">金额：</label>
    <a-input v-model:value="cleaningItem.price" placeholder="Basic usage" />
  </a-modal>
</template>
<script setup>  
import { onMounted,ref,reactive } from 'vue';
import { findOrderByAllApi } from '../../../../apis/orderApi';
import { useMerchantStore } from '../../../../stores/merchant';
import { staffInMerchantApi } from '../../../../apis/staffApi';
import { updateOrderApi } from '../../../../apis/orderApi';
import { message } from 'ant-design-vue';
const merchantStore=useMerchantStore()
// 分配抽泣
const open=ref(false)
// 分配对话框
const openClean=ref(false)
function alignClick(item){
  choiceOrder.value=item
  staffInMerchantApi(merchantStore.merchantInfo.id).then(res=>{
    staffList.value=res.data.data
  })
  open.value=true
}
const onClose = () => {
  open.value = false;
};
// 结算函数
const cleaningItem=ref({})
function handleCleanClick(item){
  openClean.value=true
  cleaningItem.value.id=item.id
  cleaningItem.value.price=item.price
  console.log(item);
}
// 处理确认
const handleOk=async ()=>{
  const orderCleanBody={
    id:cleaningItem.value.id,
    status:'已完成',
    price:cleaningItem.value.price
  }
  await updateOrderApi(orderCleanBody).then(res=>{
    message.success(res.data.data)
  })
  openClean.value=false
  await getIngOrder()
  console.log('ok');
}
// 分配样式
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
// 分配提交函数
async function alignConfirm(){
  const orderBodyUpdate={
    id:choiceOrder.value.id,
    clientId:0,
    merchantId:0,
    number:0,
    price:choiceStaff.value.price,
    status:'处理中',
  }
  await updateOrderApi(orderBodyUpdate).then(res=>{
    message.success(res.data.data)
  })
  open.value=false
  await getTodayOrder()
  await getIngOrder()
}
// 选中的员工
const choiceStaff=ref({})
// 选中的分配订单
const choiceOrder=ref({})
// 员工列表
const staffList=ref([])
onMounted(()=>{
  // 定义结构体
  const formData={
    merchantId:merchantStore.merchantInfo.id
  }
  findOrderByAllApi(formData).then(res=>{
    data.value=res.data.data
  })
  getTodayOrder()
  getIngOrder()

})
// 获取今日订单
async function getTodayOrder(){
  const formDataToday={
    orderTime:new Date(Date.now()).toISOString(),
    merchantId:merchantStore.merchantInfo.id,
    status:"未到店"
  }
  await findOrderByAllApi(formDataToday).then(res=>{
    dataToday.value=res.data.data
  })
}
// 获取进行中订单
async function getIngOrder(){
  const formDataIng={
    status:'处理中',
    merchantId:merchantStore.merchantInfo.id
  }
   await findOrderByAllApi(formDataIng).then(res=>{
    dataIng.value=res.data.data
  })
}

// 今日订单表格结构
const columnsToday = [
  {
    title: '订单编号',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '电话号',
    dataIndex: 'phoneNumber',
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: '未到店',
        value: '未到店',
      },
      {
        text: '已处理',
        value: '已处理',
      },
      {
        text: '已取消',
        value: '已取消',
      },
    ],
  },
  {
    title: '操作',
    key:'action'
  },

];
// 今日订单数据源
const dataToday=ref([])

//进行中订单表格结构
const columnsIng = [
  {
    title: '订单编号',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '电话号',
    dataIndex: 'phoneNumber',
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: '未到店',
        value: '未到店',
      },
      {
        text: '已处理',
        value: '已处理',
      },
      {
        text: '已取消',
        value: '已取消',
      },
    ],
  },
  {
    title: '操作',
    key:'action'
  },
];
// 进行中订单数据源
const dataIng=ref([])

// 全部订单绑定表格结构
const columns = [
{
    title: '订单编号',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '电话号',
    dataIndex: 'phoneNumber',
  },
  {
    title: '预约时间',
    dataIndex: 'orderTime',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: '未到店',
        value: '未到店',
      },
      {
        text: '已处理',
        value: '已处理',
      },
      {
        text: '已取消',
        value: '已取消',
      },
    ],
  },
  // {
  //   title: '操作',
  //   key:'action'
  // },

];
// 全部订单数据源
const data = ref([
])
// 全部订单筛选函数
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
  const formData = {
    merchantId: merchantStore.merchantInfo.id,
    status: filters.status?.[0], // 获取筛选条件中的状态值
  };
  findOrderByAllApi(formData).then(res => {
    data.value = res.data.data;
  });
}

// 
</script>
<style lang="scss" scoped>
.list-item{
  .topTables{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    .todayTable{
      width: 49%;
    }
    .ingTable{
      width: 49%;
    }
  }
}
</style>