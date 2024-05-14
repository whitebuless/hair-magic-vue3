<template>
  <div class="userOrderBox">
    <div class="title">
      <span style="margin-bottom: 4px;display: block;">我的预约</span>
      <div style="height: 0.5rem;
      width: 20%;
      background-color: rgb(153,0,0);"
      ></div>
    </div>

    <a-table bordered :data-source="userOrderList" class="table" :columns="columns" :pagination="{ pageSize: pageSize }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm
          v-if="userOrderList.length && record.status=='未到店'"
          title="确认取消预约?"
          @confirm="onDelete(record)"
        >
          <a>取消</a>
        </a-popconfirm>

        <a v-else-if="userOrderList.length && record.status=='已完成'" @click="handleComment(record)">评价一下</a>

      </template>
      <template v-else-if="column.dataIndex==='status'">
        <span style="color: red;" v-if="record.status=='已取消'">{{ record.status }}</span>
        <span style="color: green;" v-else-if="record.status=='已完成'">{{ record.status }}</span>
        <span style="color: blue;" v-else-if="record.status=='未到店'">{{ record.status }}</span>
      </template>
      <template v-else-if="column.dataIndex==='orderTime'">
        {{ record.orderTime.split("T")[0] }}
      </template>
    </template>
  </a-table>

  <a-drawer :width="500" title="请为本次理发体验做出评价" placement="bottom" :open="open" @close="onClose"
    style="text-align: center;"
  maskClosable>
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="handleSubmit">Submit</a-button>
    </template>
    <span>
      <a-rate v-model:value="commentForOrder.rank" :tooltips="desc" style="margin-bottom: 20px;"/>
      <span class="ant-rate-text">{{ desc[value - 1] }}</span>
    </span>
    <a-textarea v-model:value="commentForOrder.content"></a-textarea>
  </a-drawer>
  </div>
</template>
<script setup>
import { onMounted,ref,computed,reactive } from 'vue';
import { useUserStore } from '../../stores/user';
import router from '../../router';
import { findOrderByAllApi } from '../../apis/orderApi';
import { updateOrderApi } from '../../apis/orderApi';
import { message } from 'ant-design-vue';
import { addCommentForOrerApi } from '../../apis/commentForOrderApi';
const userStore=useUserStore()
const pageSize = ref(7); // 默认每页显示 10 条数据
const open=ref(false)


const desc = ref(['糟糕', '就这', '还行', '不错', '太棒了！']);
// 表单绑定
const commentForOrder=ref({})
// 评价中的
const commentingOrder=ref({})
// 确认提交
async function handleSubmit(){
  const formData={
    orderId:commentingOrder.value.id,
    userId:userStore.userInfo.id,
    userAvatar:userStore.userInfo.avatar,
    userName:userStore.userInfo.username,
    merchantId:commentingOrder.value.merchantId,
    content:commentForOrder.value.content,
    rank:commentForOrder.value.rank,
  }
  await addCommentForOrerApi(formData).then(res=>{

  })
  const changeStatus={
    id:commentingOrder.value.id,
    status:'已评价'
  }
  await updateOrderApi(changeStatus).then(res=>{
    message.success("评价成功")
    getOrder()
  })
  onClose()
}

const userOrderList=ref([])
onMounted(()=>{
  if(!userStore.userInfo.id){
    router.push("/")
  }
  getOrder()
})

// 处理评价一下
function handleComment(item){
  commentingOrder.value=item
  open.value=true
}

// 关抽屉
function onClose(){
  open.value=false
}

function getOrder(){
  const initData={
    clientId:userStore.userInfo.id
  }
  findOrderByAllApi(initData).then(res=>{
    userOrderList.value=res.data.data
  })
}


const columns = [
  {
    title: '订单号',
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
    title: '号码',
    dataIndex: 'number',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '预约时间',
    dataIndex: 'orderTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

const count = computed(() => userOrderList.value.length + 1);
const editableData = reactive({});

const save = key => {
  Object.assign(userOrderList.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const onDelete = record => {
  const formDate={
    id:record.id,
    status:'已取消'
  }
  updateOrderApi(formDate).then(res=>{
    message.success(res.data)
    getOrder()
  })
  console.log(record);
};

</script>
<style lang="scss" scoped>
.userOrderBox{
  overflow: hidden;
  padding-bottom: 120px;
  height: 100%;
  .title{
    font-size: 40px;
    margin-bottom: 20px;
    color: rgb(60, 60, 60);
  }

}

@media (min-width: 768px) {
  /* 调整grid布局 */
  .orderList {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (min-width: 1024px) {

  /* 点整grid布局 */
  .orderList {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}

</style>