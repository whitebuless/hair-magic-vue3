<template>
  <div class="userInfoBox">
    <div class="info">
      <div class="avatar">
        <a-avatar :size="160" :src="lookingUser.avatar">
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
        <a-button block v-else-if="status=='myself'" @click="handleEdit">编辑资料</a-button>


      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey" class="tabs">
      <a-tab-pane key="1" tab="作品"> 
        <div class="shareContainer"  v-masonry >
          <div v-for="i in shareList" class="share" v-masonry-tile>
            <img :src="i.imgs.split(' ')[0]" alt="">
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="点赞" force-render>
        <a-skeleton active />
      </a-tab-pane>
      <!-- <a-tab-pane key="3" tab="">  <a-skeleton active /></a-tab-pane> -->
    </a-tabs>
  </div>

  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="Basic Drawer"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { findUserById } from '../../apis/userApi';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { getFollowerApi,getFollowingApi } from '../../apis/followApi';
import { getShareByUserId } from '../../apis/shareAPpi';
const userStore=useUserStore()
// 定义tab选择
const activeKey = ref('1');
// 正在查看的user信息
const lookingUser=ref({})
// 用户作品列表
const shareList=ref([])
const status=ref('other')

//控制抽屉
const open = ref(false);
//处理点击编辑资料
function handleEdit(){
  open.value=true
} 


onMounted(async ()=>{
  // 获取id
  const route = useRoute();
  const id = route.params.id;
  // 获取用户信息
  await findUserById(id).then( async res=>{
    lookingUser.value=res.data.data
    if(res.data.data.id==userStore.userInfo.id){
      status.value="myself"
    }
     await getFollowingApi(res.data.data.id).then(result=>{
      lookingUser.value.following=result.data.followers
    })
     await getFollowerApi(res.data.data.id).then(result=>{
      lookingUser.value.followers=result.data.followers
    })
  })
  // 获取用户分享
  await getShareByUserId(id).then(async res=>{
    shareList.value=res.data.data
  })
})
</script>
<style lang="scss" scoped>
.userInfoBox{
  width: 100%;
  height: 100%;
  .info{
    display: flex;
    width: 100%;
    .baseInfo{
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .tabs{
    width: 100%;
    height: 100%;
    .shareContainer{
      overflow-y: scroll;
      width: 100%;
      height: 400px !important;
      .share{
        border-radius: 15px;
        width: 20%;
        overflow: hidden;
        cursor: pointer;
        img{
          width: 100%;
        }
      }
    }
  }


}
</style>