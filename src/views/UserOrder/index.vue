<template>
  <div class="userOrderBox">
    <div class="title">
      <span style="margin-bottom: 4px;display: block;">我的预约</span>
      <div style="height: 0.5rem;
      width: 20%;
      background-color: rgb(153,0,0);"
      ></div>
    </div>
    <div class="orderList">
      <div v-for="item in userOrderList" class="orderCard">
        <div class="number">
          {{ item.number }}
        </div>
        <div class="name">
          姓名:{{ item.name }}
        </div>
        <div class="phoneNumber">
          电话:{{ item.phoneNumber }}
        </div>
        <div class="orderTime">
          预约时间:{{ item.orderTime.split("T")[0] }}
        </div>
        <div class="createTime">
          下单时间:
        {{ 
        item.createTime.split("T")[0]+" "+
        item.createTime.split("T")[1].slice(0,8) 
        }}
        </div>
        <div class="status">
          状态:
          <span v-if="item.status=='未到店'"
          style="color: red;">{{ item.status }}</span>
          <span v-if="item.status=='处理中'"
          style="color: green;">{{ item.status }}</span>
        </div>

        
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import { useUserStore } from '../../stores/user';
import router from '../../router';
import { findOrderByAllApi } from '../../apis/orderApi';
const userStore=useUserStore()

const userOrderList=ref([])
onMounted(()=>{
  if(!userStore.userInfo.id){
    router.push("/")
  }
  const initData={
    clientId:userStore.userInfo.id
  }
  findOrderByAllApi(initData).then(res=>{
    userOrderList.value=res.data.data.reverse()
  })
})
</script>
<style lang="scss" scoped>
.userOrderBox{
  .title{
    font-size: 40px;
    margin-bottom: 20px;
    color: rgb(60, 60, 60);
  }
  .orderList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .orderCard{
      margin: 10px;
      font-family: 'Courier New', Courier, monospace;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.152);
      background-color: rgb(255, 255, 255);
      cursor: pointer;
      padding: 15px;
      div{
        margin: 4px;
      }
      .number{
        width: 100%;
        font-size: 30px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: rgb(153, 0, 0);
        text-align: center;
      }
      .name{

      }
    }
  }

}
</style>