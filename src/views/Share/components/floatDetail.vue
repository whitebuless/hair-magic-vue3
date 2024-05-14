<template>
    <div class="floatDetail"

    >
      <div class="leftBox">
        <div class="imgShow">
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
              <img :src="item" alt="" style="height: 100%;" v-for="item in shareStore.shareInfo.imgs?.slice(0,shareStore.shareInfo.imgs?.length-1).split(' ')">
          </a-carousel>
        </div>

      </div>
      <div class="rightBox">
        <div class="details">
          <div class="head">
            <a-avatar :size="50" src="https://th.bing.com/th/id/R.0f7e0f8f147bb9dfafc5e4c3bece59f2?rik=auXMf%2b3yZ3xMLQ&riu=http%3a%2f%2fimg.qqtouxiangzq.com%2f6%2f1182%2f32.jpg&ehk=kLA%2fNQgc8j3Poiz5Hva1NiVpJlwbSQosepCOeN5wde4%3d&risl=&pid=ImgRaw&r=0">
            </a-avatar>
            <span class="userName" @click="router.push(`/home/user/${shareStore.shareInfo.userId}`)">{{ shareStore.shareInfo.userName }}</span>
            <div style="display: inline-block;" v-show="userStore.userInfo.id!=shareStore.shareInfo.userId  ">
              <a-button type="primary" 
                style="margin-left: 10px;"
                v-show="!userStore.following.includes(shareStore.shareInfo.userId)"
                @click="handleFollowClick">+关注</a-button>
              <a-button type="primary" 
                style="margin-left: 10px;background-color: white; color: rgb(100,0,0);"
                v-show="userStore.following.includes(shareStore.shareInfo.userId)"
                @click="handleUnFollowClick">取消关注</a-button>
            </div>
          </div>
          <div class="body">
            <span class="title"><strong>{{ shareStore.shareInfo.title }}</strong></span>
            <span class="hairType">{{ shareStore.shareInfo.hairType }}</span>
            <p class="description">{{ shareStore.shareInfo.description }}</p>
          </div>
          <div class="foot">
            <span class="iconfont icon-weizhi">{{ shareStore.shareInfo.location }}</span>
            <span class="createTime">{{ shareStore.shareInfo.createTime?.split("T")[0]+" "+shareStore.shareInfo.createTime?.split("T")[1]?.slice(0,8) }}</span>
          </div>
        </div>
        <div class="comments">
          <a-comment v-for="i in commentList">
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
        style="margin-bottom: 5px;max-height: 90px;"/>
        <a-button type="primary" @click="subCommentClick">发表</a-button>
        <div class="actions" >
          <span class="iconfont icon-liked unlike" v-if="!shareStore.shareInfo.isLiking" @click="likeBtn"
          >&nbsp;{{ shareStore.shareInfo.likes }}</span>
          <span class="iconfont icon-liked like" v-else @click="unlikeBtn"
          >&nbsp;{{ shareStore.shareInfo.likes }}</span>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted,watchEffect } from "vue";
import { useUserStore } from "../../../stores/user";
import { useShareStore } from "../../../stores/share";
import { getCommentByShareIdApi,subCommentApi } from "../../../apis/commentApi";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import router from "../../../router";
import { message } from "ant-design-vue";
import { likeApi,unlikeApi,getLikeApi } from "../../../apis/likeApi";
import "@/assets/css/color.scss"
const shareStore=useShareStore()
const userStore=useUserStore()

/**
 * 父向子参数
 */
// defineProps({
//   shareBody: Object,
// })
// 评论编辑框
const commentEdit=ref('')
// emit事件绑定
const emit = defineEmits(["follow-click", "unfollow-click"]);
function handleFollowClick(){
 emit("follow-click")
}
function handleUnFollowClick(){
 emit("unfollow-click")
}

// 点击点赞按钮
async function likeBtn(){
  await likeApi(userStore.userInfo.id,shareStore.shareInfo.id).then(res=>{
    message.success(res.data)
  })
  shareStore.shareInfo.isLiking=true
  shareStore.shareInfo.likes++
  await getLikeApi(userStore.userInfo.id).then(res=>{
    userStore.likes=res.data.data
  })
}
// 点击取消点赞按钮
async function unlikeBtn(){
  await unlikeApi(userStore.userInfo.id,shareStore.shareInfo.id).then(res=>{
    message.success(res.data)
  })
  shareStore.shareInfo.isLiking=false
  shareStore.shareInfo.likes--
  await getLikeApi(userStore.userInfo.id).then(res=>{
    userStore.likes=res.data.data
  })
}

// 提交评论
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
    commentList.value=res.data.data
  })
  commentEdit.value=''
}
// 更新生命周期钩子
onMounted(async ()=>{
  if(shareStore.shareInfo.id){
    await getCommentByShareIdApi(shareStore.shareInfo.id).then(res=>{
      commentList.value=res.data.data
    })
  }
})
watchEffect(() => {
  if (shareStore.shareInfo.id) {
    getCommentByShareIdApi(shareStore.shareInfo.id).then(res => {
      commentList.value = res.data.data;
    });
  }
});

dayjs.extend(relativeTime);


const commentList=ref([])
</script>

<style lang="scss" scoped>
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
      border-left:1px dotted rgb(100,0,0);
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
      .actions{
        bottom: 2rem;position: absolute;
        .unlike{
          font-size: 18px;
          font-weight: 200;
          color: #666666;
          cursor: pointer;
          &::before{
            font-size: 30px;
          }
        }
        .like{
          cursor: pointer;
          font-size: 18px;
          font-weight: 200;
          color: rgb(100,0,0);
          &::before{
            font-size: 30px;
          }
        }
    }
  } 

}
</style>