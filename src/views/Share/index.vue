<template>
  <div id="shareBox">
    <div v-for="(item,i) in shareArray" :key="item.id" class="share">
      <ShareCardModelVue 
        :shareBody="item"
        style="transition: all .3s;"
        @click="handleCardClick(item)"
      ></ShareCardModelVue>
    </div>
    <!-- 遮蔽盒子 -->
    <div class="coverBox"
    :style="{visibility:detail?'hidden':'visible'}"
    @click="detail=!detail">
    </div>
    <!-- 浮动细节窗口 -->
    <div class="floatDetail"
    :style="{display:detail?'none':'flex'}">
      <div class="leftBox">
        <div class="imgShow">
          <!-- <img :src="shareBody.imgs?.split(' ')[0]" alt=""> -->
          <a-carousel style="width: 100%;" arrows>
            <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <span class="iconfont icon-bg-left" ></span>
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <span class="iconfont icon-bg-right" ></span>
              </div>
            </template>
              <img :src="item" alt="" style="height: 100%;" v-for="item in imgArray">
          </a-carousel>
        </div>

      </div>
      <div class="rightBox">
        <div class="details">
          <div class="head">
            <a-avatar :size="50" src="https://th.bing.com/th/id/R.0f7e0f8f147bb9dfafc5e4c3bece59f2?rik=auXMf%2b3yZ3xMLQ&riu=http%3a%2f%2fimg.qqtouxiangzq.com%2f6%2f1182%2f32.jpg&ehk=kLA%2fNQgc8j3Poiz5Hva1NiVpJlwbSQosepCOeN5wde4%3d&risl=&pid=ImgRaw&r=0">
            </a-avatar>
            <span class="userName">{{ shareBody.userName }}</span>
            <div style="display: inline-block;" v-show="userStore.userInfo.id!=shareStore.shareInfo.userId  ">
              <a-button type="primary" 
                style="margin-left: 10px;"
                v-show="!userStore.following.includes(shareBody.userId)"
                @click="handleFollowClick">+关注</a-button>

                <a-button type="primary" 
              style="margin-left: 10px;background-color: white; color: rgb(100,0,0);"
              v-show="userStore.following.includes(shareBody.userId)"
              @click="handleUnFollowClick">取消关注</a-button>
            </div>
          </div>
          <div class="body">
            <span class="title"><strong>{{ shareBody.title }}</strong></span>
            <span class="hairType">{{ shareBody.hairType }}</span>
            <p class="description">{{ shareBody.description }}</p>
          </div>
          <div class="foot">
            <span class="iconfont icon-weizhi">{{ shareBody.location }}</span>
            <span class="createTime">{{ shareBody.createTime.split("T")[0]+" "+shareBody.createTime.split("T")[1]?.slice(0,8) }}</span>

          </div>
        </div>
        <div class="comments">
          <a-comment v-for="i in commenList">
            <!-- <template #actions>
              <span key="comment-basic-like">
                <a-tooltip title="Like">
                  <template v-if="action === 'liked'">
                    <LikeFilled @click="like" />
                  </template>
                  <template v-else>
                    <LikeOutlined @click="like" />
                  </template>
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                  {{ i.likes }}
                </span>
              </span>
              <span key="comment-basic-dislike">
                <a-tooltip title="Dislike">
                  <template v-if="action === 'disliked'">
                    <DislikeFilled @click="dislike" />
                  </template>
                  <template v-else>
                    <DislikeOutlined @click="dislike" />
                  </template>
                </a-tooltip>
                <span style="padding-left: 8px; cursor: auto">
                  {{ dislikes }}
                </span>
              </span>
              <span key="comment-basic-reply-to">Reply to</span>
            </template> -->
            <template #author>
              <a
                @click="router.push(`/home/user/${i.userId}`)"
              >{{i.userName}}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://th.bing.com/th/id/R.0f7e0f8f147bb9dfafc5e4c3bece59f2?rik=auXMf%2b3yZ3xMLQ&riu=http%3a%2f%2fimg.qqtouxiangzq.com%2f6%2f1182%2f32.jpg&ehk=kLA%2fNQgc8j3Poiz5Hva1NiVpJlwbSQosepCOeN5wde4%3d&risl=&pid=ImgRaw&r=0" alt="Han Solo" />
            </template>
            <template #content>
              <p>
                {{ i.comment }}
              </p>
            </template>
            <template #datetime>
              <a-tooltip :title="i.createTime.split('T')[0]">
                <span>{{ dayjs().from(i.createTime) }}</span>
              </a-tooltip>
            </template>
          </a-comment>
        </div>
        <a-textarea v-model:value="commentEdit" 
        placeholder="说点什么吧~"
        style="margin-bottom: 5px;max-height: 100px;"/>
        <a-button type="primary" @click="subCommentClick">发表</a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref,inject, watchEffect,provide, reactive } from "vue";
import { getShareApi } from "../../apis/shareAPpi"
import ShareCardModelVue from "./components/shareCardModel.vue";
import { useShareStore } from "../../stores/share";
import { getCommentByShareIdApi } from "../../apis/commentApi"
import { useCommentStore } from "../../stores/comment";
import { useUserStore } from "../../stores/user";
import { subCommentApi } from "../../apis/commentApi";
import router from "../../router";
import leftCircleOutlined from 'ant-design-vue'
import rightCircleOutlined from 'ant-design-vue'
// test
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message } from "ant-design-vue";
import { followApi,unfollowApi,getFollowingApi } from "../../apis/followApi";

const shareStore=useShareStore()
const commentStore=useCommentStore()
const userStore=useUserStore()
const shareArray=ref([])


onMounted(()=>{
  console.log();
  getShares('')
})
// 点击关注
async function handleFollowClick(){
  await followApi(userStore.userInfo.id,shareStore.shareInfo.userId).then(res=>{
    message.success(res.data)
  })
  await   getFollowingApi(userStore.userInfo.id).then(res=>{
    userStore.following=res.data.followers
  })
}
// 点击取消关注
async function handleUnFollowClick(){
  await unfollowApi(userStore.userInfo.id,shareStore.shareInfo.userId).then(res=>{
    message.success(res.data)
  })
  await   getFollowingApi(userStore.userInfo.id).then(res=>{
    userStore.following=res.data.followers
  })
}
// 评论列表
const commenList=ref([])
// 详情页相关
const detail=ref(true)
// 绑定评论信息
const commentEdit=ref('')
async function getShares(title){
  await getShareApi(title).then((res=>{
    shareArray.value=res.data.data
  }))
}

// 
const shareBody=reactive({
  imgs:'',
  title:'',
  hairType:'',
  description:'',
  location:'',
  createTime:'',
  userName:'',
})
// 点击分享
async function handleCardClick(item){
  shareStore.shareInfo=item
  await getCommentByShareIdApi(item.id).then(res=>{
    commenList.value=res.data.data
  })
  detail.value=!detail.value
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
// 走马灯图片列表
const imgArray=ref([])

// 发表评论
async function subCommentClick(){
  if(commentEdit.value==''){
    alert('写点东西再发吧')
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


dayjs.extend(relativeTime);
const likes = ref(0);
const dislikes = ref(0);
const action = ref();

</script>

<style lang="scss" scoped>
@import '@/assets/css/color.scss';
#shareBox {
  column-count: 1; /* 设置列数 */
  column-gap: 1rem; /* 设置列之间的间隔 */
  .floatDetail{
    width: 1000px;
    height: 700px;
    position: fixed;
    top: 50%;
    left: 50%;
    background: rgb(255, 255, 255);
    transform: translate(-50%,-50%);
    border-radius: 15px;
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.095);
    display: flex;
    padding: 20px;
    overflow: hidden;
    animation: expand 0.2s ;
  
    .leftBox {
      width: 50%;
      padding: 5px;
      position: relative;
      display: flex;
      flex-direction: column; /* 将 leftBox 设为 flex 布局，方便下方的 .details 定位 */
      .imgShow {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: 100%; /* 确保图片不超出容器，并保持宽度完全展示 */
          display: block;
          margin: 0 auto;
        }
        margin-bottom: 0.6rem;
      }

}

    .rightBox{
      width: 50%;
      padding: 25px;
      margin-left: 20px;
      border-left:1px dotted $themeColor;
      .details {
        padding: 15px;
        font-family: 'Microsoft YaHei', sans-serif;
        .head {
          margin-bottom: 20px;
        }
        .body {
          margin-bottom: 10px;
          .title{
            font-size: 20px;
            margin-bottom: 10px;
          }
          .hairType{
            float: right;
            color: #666666;
            margin-bottom: 10px;
          }
          .description{
            margin-top: 20px;
          }
        }
        .foot {
          color: #666666;
          .createTime{
            float: right;
          }
        }
      }
      .comments{
        margin-bottom: 10px;
        overflow-y: auto; /* 添加滚动条 */
        max-height: 250px; /* 设置最大高度 */
          /* 设置滚动条的宽度和颜色 */
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track {
          background-color: #f5f5f5;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .pcomment{
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
          &:hover{
            background-color: #e1e1e1;
          }
          .userName{
            color: rgb(146, 146, 146);
            font-size: 13px;
            margin-bottom: 5px;
          }
          .foot{
            color: rgb(146, 146, 146);
            span{
              &:hover{
                color: rgb(104, 0, 0);
              }
            }
          }
        }
      }
      /* 如果您需要针对滚动条悬停状态进行调整，可以添加下面的样式 */
      .comments:hover::-webkit-scrollbar-thumb {
        background-color: #555;
      }
    } 

  }
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
/* 媒体查询 */
@media (min-width: 768px) {
  /* 调整grid布局 */
  #shareBox {
    column-count: 3;
  }
}
@media (min-width: 1024px) {
  /* 调整grid布局 */
  #shareBox {
    column-count: 4;
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