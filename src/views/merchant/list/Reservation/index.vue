<template>
  <div class="list-item">
    <a-table :columns="columns" :data-source="data" @change="onChange">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
        <span>
          <a>结算</a>
          <a-divider type="vertical" />
          <a style="color: red;">取消</a>
          <a-divider type="vertical" />
        </span>
      </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import { findOrderByAllApi } from '../../../../apis/orderApi';
import { useMerchantStore } from '../../../../stores/merchant';
const merchantStore=useMerchantStore()

onMounted(()=>{
  const formData={
    merchantId:merchantStore.merchantInfo.id
  }
  findOrderByAllApi(formData).then(res=>{
    data.value=res.data.data
  })
})

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
    ],
  },
  {
    title: '操作',
    key:'action'
  },

];

const data = ref([

])
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
</script>
<style lang="scss" scoped>

</style>