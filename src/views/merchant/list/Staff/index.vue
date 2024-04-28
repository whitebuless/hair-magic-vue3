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
      
        <a-button type="primary" @click="showDrawer">+新增员工</a-button>
    </div>

    <a-table
    :columns="columns"
    :dataSource="dataSource"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'action'">
        <span>
          <a>编辑</a>
          <a-divider type="vertical" />
          <a style="color: red;">删除</a>
          <a-divider type="vertical" />
          <!-- <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a> -->
        </span>
      </template>
    </template>
  </a-table>

  </div>
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="新增员工"
    placement="right"
    @after-open-change="afterOpenChange"
  >
  <a-form-item
      label="姓名"
      name="姓名"
    >
      <a-input />
    </a-form-item>
    <a-form-item
        label="联系方式"
        name="联系方式"
      >
      <a-input />
    </a-form-item>
    <a-form-item
        label="工龄"
        name="工龄"
      >
      <a-input-number id="inputNumber"  :min="1" :max="100" />
    </a-form-item>
    <a-form-item
        label="单工费"
        name="单工费"
      >
      <a-input-number id="inputNumber2"  :min="1" :max="1000" />
    </a-form-item>
    <a-form-item label="简介">
      <a-textarea v-model:value="description" />
    </a-form-item>
    <a-form-item
      label="性别"
      name="性别"
    >
      <a-radio-group v-model:value="gender" name="radioGroup">
        <a-radio value="男"><span class="iconfont icon-nan"></span></a-radio>
        <a-radio value="女"><span class="iconfont icon-nv"></span></a-radio>
      </a-radio-group>
    </a-form-item>
    <a-button type="primary">
      <span>提交</span>
    </a-button>


  </a-drawer>
</template>

<script setup>
import { computed,onMounted,ref } from 'vue';
import { usePagination } from 'vue-request';
import { staffInMerchantApi } from '../../../../apis/staffApi';
import axios from 'axios';
import { useMerchantStore } from '../../../../stores/merchant';
const merchantStore=useMerchantStore()
// 新增数据绑定
const gender=ref('男')
const description=ref('')
// 用户新增侧边栏显示
const open = ref(false);
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
        text: '男',
        value: '男',
      },
      {
        text: '女',
        value: '女',
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

// 点击新增
const afterOpenChange = bool => {
  console.log('open', bool);
};
const showDrawer = () => {
  open.value = true;
};
</script>