<template>
  <div class="sideBarBox">
    <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="vertical"
    :items="items"
    @click="handleClick"
  />
  <button @click="addNewOrder"><strong>游客+</strong></button>
  </div>
</template>
<script setup>
import { h, ref } from 'vue';
import router from '../../../../router';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
// 定义emit
const emit = defineEmits(["add-new"]);
function addNewOrder(){
 emit("add-new")
}


const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    icon: () => h(MailOutlined),
    label: '数据大屏',
    title: 'datashow',
  },
  {
    key: '2',
    icon: () => h(CalendarOutlined),
    label: '员工管理',
    title: 'staff',
  },
  // {
  //   key: '3',
  //   icon: () => h(CalendarOutlined),
  //   label: '顾客管理',
  //   title: 'client',
  // },
  {
    key: '4',
    icon: () => h(CalendarOutlined),
    label: '订单管理',
    title: 'reservation',
  },

]);
const handleClick = menuInfo => {
  
  router.replace('/merchant/'+menuInfo.item.title)
};
</script>
<style lang="scss" scoped>
.sideBarBox{
  height: 992px;
  background-color: white;
  overflow: hidden;
}
button{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    border: 0;
    color: white;
    background-color:rgb(100, 0, 0);
    cursor: pointer;
    &:hover{
      background-color:rgb(52, 0, 0);
    }
  }
</style>