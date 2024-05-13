<template>
  <div class="businessBox">
    <a-button type="primary" @click="addBusinessBtn" style="margin-bottom: 20px;">新增服务</a-button>
    <div class="businessContainer" >
      <a-table :columns="columns" :data-source="businessList" bordered>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'operation'">
            <a-popconfirm
              title="Sure to delete?"
              @confirm="onDelete(record.key)"
            >
              <a>编辑</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确认删除?"
              @confirm="onDelete(record.key)"
            >
              <a>删除</a>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>

  <a-modal v-model:open="open" title="添加服务" @ok="handleOk">
    <a-form>
      <a-form-item label="服务名称">
        <a-select v-model:value="newBusiness.name" @change="newBusiness.detail=''">
          <a-select-option value="剪发" >剪发</a-select-option>
          <a-select-option value="烫发" >烫发</a-select-option>
          <a-select-option value="染发" >染发</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="详细描述"  >
        <a-input v-model:value="newBusiness.detail" min="0" />
      </a-form-item>
      <a-form-item label="普通价格"  >
        <a-input-number v-model:value="newBusiness.price" min="0"/>
      </a-form-item>
      <a-form-item label="会员价格"  >
        <a-input-number v-model:value="newBusiness.vipPrice" min="0" />
      </a-form-item>
    
    </a-form>
  </a-modal>
</template>
<script setup>
import { onMounted, ref,computed } from 'vue';
import { addBusinessApi,findBusinessApi } from '../../../../apis/businessApi';
import { useMerchantStore } from '../../../../stores/merchant';
import { message } from 'ant-design-vue';
const merchantStore=useMerchantStore()

const newBusiness=ref({})
const open=ref(false)

// 表单配置
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
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
const businessList=ref([])
onMounted(()=>{
  findBusinessApi(merchantStore.merchantInfo.id).then(res=>{
    businessList.value=res.data.data
  })
})
//  列表长度
const length = computed(() => {
  return businessList.value.length;
});

const addBusinessBtn=()=>{
  open.value=true
}
const handleOk=async()=>{
  newBusiness.value.merchantId=merchantStore.merchantInfo.id
  newBusiness.value.merchantName=merchantStore.merchantInfo.name
  newBusiness.value.order=length.value+1;
  await addBusinessApi(newBusiness.value).then(res=>{
    message.success(res.data.data)
  })
  open.value=false
  await findBusinessApi(merchantStore.merchantInfo.id).then(res=>{
    businessList.value=res.data.data
  })
}

</script>
<style lang="scss" scoped>
.businessBox{
  background-color: white;
  padding: 20px;
  .businessContainer{
    .business{
      display: flex;
      &>div{
        flex: 1;
      }
    }
  }
}
</style>