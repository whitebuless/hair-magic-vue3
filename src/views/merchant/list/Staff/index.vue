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
  >
    <template #bodyCell="{ column, text,record }">
      <template v-if="column.key === 'action'">
        <span>
          <a @click="handleEditClick(record)">编辑</a>
          <a-divider type="vertical" />
          <a style="color: red;"
          @click="handleDeleteClick(record.id)"
          >删除</a>
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
  <!-- 新增员工抽屉 -->
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
      <a-input v-model:value="addStaffFormData.name" />
    </a-form-item>
    <a-form-item
        label="联系方式"
        name="联系方式"
      >
      <a-input v-model:value="addStaffFormData.phoneNumber"/>
    </a-form-item>
    <a-form-item
        label="工龄"
        name="工龄"
      >
      <a-input-number id="inputNumber"  
      v-model:value="addStaffFormData.years"
      :min="1" :max="100" />
    </a-form-item>
    <a-form-item
        label="单工费"
        name="单工费"
      >
      <a-input-number id="inputNumber2"  v-model:value="addStaffFormData.price" :min="1" :max="1000" />
    </a-form-item>
    <a-form-item label="简介">
      <a-textarea v-model:value="addStaffFormData.detail" />
    </a-form-item>
    <a-form-item
      label="性别"
      name="性别"
    >
      <a-radio-group v-model:value="addStaffFormData.gender" name="radioGroup">
        <a-radio value="男"><span class="iconfont icon-nan"></span></a-radio>
        <a-radio value="女"><span class="iconfont icon-nv"></span></a-radio>
      </a-radio-group>
    </a-form-item>
    <a-button type="primary" @click="handleAddClick">
      <span>提交</span>
    </a-button>


  </a-drawer>
  <!-- 编辑员工资料抽屉 -->
  <a-drawer
  title="编辑员工资料"
  placement="bottom"
  :closable="false"
  :open="openEdit"
  @close="onCloseEdit"
>
  <a-form
    :model="EditStaffFormData"
    name="EditStaff_login"
    layout="vertical"
    autocomplete="off"
  >
    <a-row gutter="16">
      <a-col :span="24">
        <a-form-item
          label="姓名"
          name="name"
        >
          <a-input v-model:value="EditStaffFormData.name" />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          label="手机号"
          name="phoneNumber"
        >
          <a-input v-model:value="EditStaffFormData.phoneNumber" />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          label="出席费"
          name="price"
        >
          <a-input v-model:value="EditStaffFormData.price" />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          label="经验"
          name="years"
        >
          <a-input v-model:value="EditStaffFormData.years" />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          label="性别"
          name="gender"
        >
          <a-radio-group v-model:value="EditStaffFormData.gender" name="gender">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item
          label="简介"
          name="detail"
        >
          <a-textarea v-model:value="EditStaffFormData.detail" />
        </a-form-item>
      </a-col>

    </a-row>

    <a-form-item>
      <a-button type="primary" @click="handleSaveClick">保存</a-button>
    </a-form-item>
  </a-form>
</a-drawer>


  <!-- 弹出删除确认 -->
  <a-modal v-model:open="deleteing" title="删除确认窗口" @ok="handleOk">
      <p>确认删除该员工??</p>
  </a-modal>
</template>

<script setup>
import { computed,onMounted,reactive,ref } from 'vue';
import { usePagination } from 'vue-request';
import { staffInMerchantApi } from '../../../../apis/staffApi';
import axios from 'axios';
import { useStaffStore } from '../../../../stores/staff';
import { useMerchantStore } from '../../../../stores/merchant';
import { addStaffApi } from '../../../../apis/staffApi';
import { deleteStaffApi } from '../../../../apis/staffApi';
import { updateStaffApi } from '../../../../apis/staffApi';
import { message } from 'ant-design-vue';
const merchantStore=useMerchantStore()
const staffStore=useStaffStore()
// 删除框配置
const deleteing = ref(false);
const deleteingId=ref(0)
// 新增员工数据结构体
const addStaffFormData=reactive({
  name:'',
  phoneNumber:'',
  years:1,
  gender:'男',
  detail:'',
  price:0
})
// 修改员工信息结构体
const EditStaffFormData=ref({
  id:'',
  name:'',
  phoneNumber:'',
  years:1,
  gender:'男',
  detail:'',
  price:0
})
// 用户新增侧边栏显示
const open = ref(false);
// 员工资料编辑侧边栏显示
const openEdit = ref(false);
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
  },
  {
    title:'电话',
    dataIndex:'phoneNumber'
  },
  {
    title:'出席费',
    dataIndex:'price',
  },
  {
    title:'经验',
    dataIndex:'years',
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
onMounted(()=>{
  getStaffList(merchantStore.merchantInfo.id)
})
async function getStaffList(id){
  await staffInMerchantApi(id).then((res=>{
    dataSource.value=res.data.data
  }))
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
// 点击编辑
function handleEditClick(item){
  EditStaffFormData.value.id=item.id
  EditStaffFormData.value.name=item.name
  EditStaffFormData.value.phoneNumber=item.phoneNumber
  EditStaffFormData.value.price=item.price
  EditStaffFormData.value.years=item.years
  EditStaffFormData.value.detail=item.detail
  EditStaffFormData.value.gender=item.gender
  openEdit.value=true
}
// 点击保存编辑
function handleSaveClick(){
  updateStaffApi(EditStaffFormData.value).then(res=>{
    message.success(res.data.data)
    openEdit.value=false
    getStaffList(merchantStore.merchantInfo.id)
  })
}
// 更新员工信息关闭
const onCloseEdit = () => {
  openEdit.value = false;
};
// 点击提交
async function handleAddClick(){
  if(addStaffFormData.name==''){ message.error("输入姓名");return}
  if(addStaffFormData.phoneNumber==''){ message.error("输入联系方式");return}
  if(addStaffFormData.phoneNumber==''){ message.error("输入联系方式");return}
  if(addStaffFormData.detail==''){ message.error("输入简介");return}
  addStaffFormData.merchant=merchantStore.merchantInfo.id
  addStaffFormData.merchantName=merchantStore.merchantInfo.name
  await addStaffApi(addStaffFormData).then(res=>{
    message.success(res.data.data)
  })
  open.value = false;
  await getStaffList(merchantStore.merchantInfo.id)
}
// 点击删除
function handleDeleteClick(id){
  deleteing.value = true;
  deleteingId.value=id
}
const handleOk =async e => {
  console.log(e);
  deleteing.value = false;
  await deleteStaffApi(deleteingId.value).then(res=>{
    message.success(res.data.data)
  })
  await getStaffList(merchantStore.merchantInfo.id)
};
</script>