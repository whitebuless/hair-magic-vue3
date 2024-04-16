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
    :row-key="record => record.login.uuid"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
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
import { computed,ref } from 'vue';
import { usePagination } from 'vue-request';
import axios from 'axios';
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
    width: '20%',
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
// 查询数据
const queryData = params => {
  return axios.get('https://localhost:8080/staff/get', {
    params,
  });
};
// 
const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});

const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

// 搜索框配置
const value = ref('');
const onSearch = searchValue => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};
</script>