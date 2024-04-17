<template>
  <div class="list-item">
    <div class="title">
      <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
      style="width: 300px;margin-bottom: 10px;"
    />
    </div>

    <a-table
    :columns="columns"
    :dataSource="dataSource"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'action'">
        <span>
          <a>Invite</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>

  </div>
</template>

<script setup>
import { computed,onMounted,ref } from 'vue';
import { usePagination } from 'vue-request';
import { staffInMerchantApi } from '../../../../apis/staffApi';
import axios from 'axios';
import { useMerchantStore } from '../../../../stores/merchant';
const merchantStore=useMerchantStore()
//表格配置
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
  },
  {
    title:'电话',
    dataIndex:'phoneNumber'
  },
  {
    title:'出席费',
    dataIndex:'price',
    sorter: true,
  },
  {
    title:'经验',
    dataIndex:'years',
    sorter:true
  },
  {
    title:'简介',
    dataIndex:'detail'
  },
  {
    title:'操作',
    key:'action'
  }
];
// 
const dataSource=ref([])
const data = [
  {
    key: '1',
    name: 'John Brown',
    phoneNumber:'1231231231',
    gender:'male',
    price:20,
    years:3,
    detail:"gugugde",
  },
];

onMounted(()=>{
  getStaffList(merchantStore.merchantInfo.id)
})
async function getStaffList(id){
  await staffInMerchantApi(id).then((res=>{
    dataSource.value=res.data.data
  }))
}


function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

// 搜索框配置
const value = ref('');
const onSearch = searchValue => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};
</script>