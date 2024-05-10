<template>
  <div class="userInfoBox">
    <div class="avatar">
      <a-avatar :size="160" src="https://img2.imgtp.com/2024/05/07/ycPa2cfu.jpg">
      </a-avatar>
    </div>
    <div class="baseInfo">
      <p style="color: #999999;" disabled>
        {{ lookingUser.username }}
        <span 
        v-if="lookingUser.gender=='男'" 
        class="iconfont icon-nan"
        style="color: blue;"></span>
        <span 
        v-else-if="lookingUser.gender=='女'"
        class="iconfont icon-nv"
        ></span>
      </p>
      <p>{{ lookingUser.explain }}</p>
      <div style="margin-bottom: 15px;color: #999999;">
        <span >关注：{{ lookingUser.following?.length }}</span>
        <span>粉丝：{{ lookingUser.followers?.length }}</span>
      </div>
      <a-button type="primary" block v-if="status=='other'">+关注</a-button>
      <a-button block v-else-if="status=='myself'">编辑资料</a-button>


    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="作品">  <a-skeleton active /></a-tab-pane>
      <a-tab-pane key="2" tab="点赞" force-render>  <a-skeleton active /></a-tab-pane>
      <!-- <a-tab-pane key="3" tab="">  <a-skeleton active /></a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { findUserById } from '../../apis/userApi';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { getFollowerApi,getFollowingApi } from '../../apis/followApi';
const userStore=useUserStore()
// 定义tab选择
const activeKey = ref('1');

const lookingUser=ref({})
const status=ref('other')
onMounted(()=>{
  const route = useRoute();
  const id = route.params.id;
   findUserById(id).then( res=>{
    lookingUser.value=res.data.data
    if(res.data.data.id==userStore.userInfo.id){
      status.value="myself"
    }
     getFollowingApi(res.data.data.id).then(result=>{
      lookingUser.value.following=result.data.followers

    })
     getFollowerApi(res.data.data.id).then(result=>{
      lookingUser.value.followers=result.data.followers
    })
  })
  
})
</script>
<style lang="scss" scoped>
.userInfoBox{

  .baseInfo{
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>