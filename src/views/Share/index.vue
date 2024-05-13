<template>
  <div id="shareBox">
    <div class="tabs" style="padding: 0 10px;margin-bottom: 15px;">
      <span :style="{ color: activeTab === '长发' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab1('长发')">长发</span>
      <a-divider type="vertical" />
      <span :style="{ color: activeTab === '短发' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab2('短发')">短发</span>
      <a-divider type="vertical" />
      <span :style="{ color: activeTab === '随便看看' ? 'rgb(100,0,0)' : '#999999' }" @click="activateTab3( '关注')">随便看看</span>
    </div>
    <ShareContainer v-if="shareContainerOpacity == 1"  @card-click="handleCardClick" />
    <div :style="{ opacity: Math.abs(shareContainerOpacity-1) }" 
     v-else
    >
      <a-skeleton active />
      <a-skeleton active />
      <a-skeleton active />
      <a-skeleton active />
    </div>
    <!-- 遮蔽盒子 -->
    <div class="coverBox"
    :style="{visibility:detail?'hidden':'visible'}"
    @click="detail=!detail">
    </div>
    <!-- 浮动细节窗口 -->
    <FloatDetail v-show="!detail" 
      :shareBody="shareBody" 
      @follow-click="handleFollowClick" 
      @unfollow-click="handleUnFollowClick" 
      @cover-click="toggleDetail" />
  </div>
</template>
<script setup>
import { onMounted, ref,inject, watchEffect,provide, reactive } from "vue";
import { getShareApi,recommendShareApi } from "../../apis/shareAPpi"
import { useShareStore } from "../../stores/share";
import { getCommentByShareIdApi } from "../../apis/commentApi"
import { useCommentStore } from "../../stores/comment";
import { useUserStore } from "../../stores/user";
import { subCommentApi } from "../../apis/commentApi";
import router from "../../router";
import leftCircleOutlined from 'ant-design-vue'
import rightCircleOutlined from 'ant-design-vue'
import ShareContainer from "./components/shareContainer.vue"
import FloatDetail from "./components/floatDetail.vue"
// test
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message } from "ant-design-vue";
import { followApi,unfollowApi,getFollowingApi } from "../../apis/followApi";
import { lookApi } from "@/apis/behaviorApi"
const shareStore=useShareStore()
const userStore=useUserStore()

const PAGE_SIZE = 10;
let currentPage = 1;

// tab绑定值
const activeTab = ref('随便看看');
// 分享页骨架屏控制
const shareContainerOpacity = ref(0);
// 评论列表
const commenList=ref([])

/**
 * 生命周期钩子函数
 */
onMounted(async() => {
  setTimeout(() => {
    shareContainerOpacity.value = 1;
  }, 1500);

  await getShares(userStore.userInfo.id, currentPage, PAGE_SIZE);

});


async function getShares(id, page, pageSize) {
    const response = await recommendShareApi(id, page, pageSize);
    const newData = response.data;
    shareStore.shareList =newData;
}


/**
 * 处理卡片点击事件
 */
async function handleCardClick(item) {
  // 存入Store
  shareStore.shareInfo=item
  //浏览行为记录
  lookApi(userStore.userInfo.id,item.id).then(res=>{
  })
  // 显示细节
  toggleDetail()
  shareBody.userId=item.userId
  shareBody.imgs=item.imgs
  shareBody.title=item.title
  shareBody.hairType=item.hairType
  shareBody.description=item.description
  shareBody.location=item.location
  shareBody.createTime=item.createTime
  shareBody.userName=item.userName
  imgArray.value=item.imgs.split(' ')
  if(imgArray.value.length>1){
    imgArray.value.pop()
  }
}
/**
 * 动态细节显示控制
 */
function toggleDetail() {
  detail.value = !detail.value;
}

/**
 * 处理关注事件
 */
async function handleFollowClick(){
  await followApi(userStore.userInfo.id,shareStore.shareInfo.userId).then(res=>{
    message.success(res.data)
  })
  await   getFollowingApi(userStore.userInfo.id).then(res=>{
    userStore.following=res.data.followers
  })
}
/**
 * 处理取消关注
 */
async function handleUnFollowClick(){
  await unfollowApi(userStore.userInfo.id,shareStore.shareInfo.userId).then(res=>{
    message.success(res.data)
  })
  await   getFollowingApi(userStore.userInfo.id).then(res=>{
    userStore.following=res.data.followers
  })
}

// 详情页相关
const detail=ref(true)
// 绑定评论信息
const commentEdit=ref('')



const shareBody=reactive({
  imgs:'',
  title:'',
  hairType:'',
  description:'',
  location:'',
  createTime:'',
  userName:'',
})

// 走马灯图片列表
const imgArray=ref([])

// 发表评论
async function subCommentClick(){
  if(commentEdit.value==''){
    message.error('写点东西再发吧')
    return
  }
  await subCommentApi(
    userStore.userInfo.id,
    userStore.userInfo.username,
    commentEdit.value,
    shareStore.shareInfo.id
  ) .then(response => {
          // 处理成功情况
          if(response.data.code=='200')
          message.success("发布成功！")
        })
        .catch(error => {
          // 处理错误情况
          console.log(error);
        })
        .finally(() => {
          // 总是会执行的
        });
  await getCommentByShareIdApi(shareStore.shareInfo.id).then(res=>{
    commenList.value=res.data.data
  })
  commentEdit.value=''
}
// 时间插件
dayjs.extend(relativeTime);


</script>

<style lang="scss" scoped>
@import '@/assets/css/color.scss';
#shareBox {
  width: 100%;
  overflow: hidden;
  height: 100%;
  // .tabs{
  //   width: 100%;
  //   height: 50px;
  //   background-color: white;
  //   position: fixed;
  //   z-index: 99;
  // }
  .coverBox{
      position:fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.275);
    }
}

@keyframes expand {
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }
  100% {
    width: 1000px;
    height: 700px;
    opacity: 1;
  }
}

@keyframes viewShares {
  0% {
    opacity: 0;
  }
  100% {opacity: 1;
  }
}


:deep(.slick-slide) {
  text-align: center; /* 文字居中 */
  height: 540px; /* 设置高度 */
  line-height: 540px; /* 行高与高度相等，实现垂直居中 */
  overflow: hidden; /* 隐藏溢出内容 */
  // background-color: #f3f3f3; /* 设置背景颜色 */
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 50px;
  color: #414141;
  transition: ease all 0.3s;
  opacity: 0.5;
  z-index: 9999999;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #490000;
  opacity: 0.5;
}


</style>