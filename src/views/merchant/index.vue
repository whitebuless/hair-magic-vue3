<template>
  <div class="Box">
    <div class="topBox">
    <NavBar @click="solvedBefore=false"></NavBar>
  </div>
  <div class="merchantBox">
    
    <div class="leftView">
      <SideBar></SideBar>
    </div>
    <div class="rightView">

      <div class="tableBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div class="cover" v-show="!solvedBefore">
    <div>
      <h1>选择店铺</h1>
      <ul>
      <li v-for="item in merchantList" @click="handleChooseMerchant(item)" >
        {{ item.name }}
      </li>
    </ul>
    </div>
  </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import { useMerchantStore } from '../../stores/merchant';
import { useUserStore } from '../../stores/user';
import {getMerchantByUserIdApi} from '../..//apis/merchantApi.js'
import router from '../../router/index.js';
const userStore=useUserStore()
const merchantStore=useMerchantStore()
const merchantList=ref([])
const solvedBefore=ref(false)
onMounted(()=>{
  getMerchantList(userStore.userInfo.id);
  if(merchantStore.merchantInfo!=null){
    solvedBefore.value=true
  }
})

async function getMerchantList(id){
  await getMerchantByUserIdApi(id).then((res=>{
    if(!res.data.data){
      router.push('/newmerchant')
    }
    else{
      merchantStore.merchantInfo=res.data.data[0]
      merchantList.value=res.data.data
    }
  }))
  console.log(merchantList.value);
}

function handleChooseMerchant(item){
  solvedBefore.value=true
  merchantStore.merchantInfo=item
}

</script>
<style lang="scss" scoped>
.Box{
  height: 100vh;
  overflow: hidden;
}
.merchantBox{
  background-color: rgb(237, 237, 237);
  width:100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .leftView{
    width: 15%;

  }
  .rightView{
    width: 85%;
    .tableBox{
      box-sizing: content-box;
      padding: 20px;
      height: 100%;
      .list-item{
        background-color: white;
        border-radius: 10px;
        height: 100%;
        padding: 30px;
        box-shadow: 0 0 4px 4px rgb(207, 207, 207);
      }
    }
  }
}
.cover{
  z-index: 99999;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.403);
  div{
    width: 300px;
    background-color: white;
    position: relative;
    left: 50%;
    border-radius: 10px;
    padding: 20px;
    top: 50%;
    transform: translate(-50%,-50%);
    ul{
      li{
        border-radius: 5px;
        padding: 15px;
        background-color: rgb(238, 238, 238);
        cursor: pointer;
        margin-bottom: 5px;
        &:hover{
          background-color:var(--theme);
          color: white;
        }
      }
    }
    
  }
}
</style>