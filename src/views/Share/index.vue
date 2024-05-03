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
            <span class="title">{{ shareBody.title }}</span>
            <span class="hairType">{{ shareBody.hairType }}</span>
          </div>
          <div class="body">
            <p class="description">{{ shareBody.description }}</p>
          </div>
          <div class="foot">
            <span class="iconfont icon-weizhi">{{ shareBody.location }}</span>
            <span class="createTime">{{ shareBody.createTime.split("T")[0]+" "+shareBody.createTime.split("T")[1]?.slice(0,8) }}</span>
            <span class="userName">{{ shareBody.userName }}</span>
          </div>
        </div>
        <h1 style="color: #999999;font-size: 18px;">评论</h1>
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
              <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                <span>{{ dayjs().from(i.createTime) }}</span>
              </a-tooltip>
            </template>
          </a-comment>
        </div>
        <a-textarea v-model:value="commentEdit" 
        placeholder="说点什么吧~"
        style="margin-bottom: 5px;"/>
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

const shareStore=useShareStore()
const commentStore=useCommentStore()
const userStore=useUserStore()
const shareArray=ref([])


onMounted(()=>{
  getShares('')
})
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
  console.log(item.imgs.split(' '))
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
#shareBox {
  column-count: 4; /* 设置列数 */
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
      padding: 5px;
      .details {
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 15px;
        z-index: 1;
        overflow: auto;
        border-top: 1px solid #ccc;
        font-family: 'Microsoft YaHei', sans-serif;
        font-size: 14px; /* 调整字体大小 */

        .head {
          margin-bottom: 15px;
          .title {
            font-size: 18px; /* 调整标题字体大小 */
            font-weight: bold;
            color: #333;
          }
          .hairType {
            color: #666;
            font-style: italic;
            float: right;
          }
        }

        .body {
          margin-bottom: 15px;
          .description {
            text-indent: 24px;
            color: #555;
            /* font-size: 16px; 移除字体大小，使用父级的字体大小 */
            line-height: 1.6;
          }
        }

        .foot {
          color: #888;
          font-size: 12px; /* 调整时间和用户名的字体大小 */
          .icon-weizhi {
            margin-right: 10px;
            color: #555;
          }
          .createTime,
          .userName {
            display: block;
            color: #777;
          }
        }
      }
      .comments{
        margin-bottom: 10px;
        overflow-y: auto; /* 添加滚动条 */
        max-height: 250px; /* 设置最大高度 */
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

:deep(.slick-slide) {
  text-align: center; /* 文字居中 */
  height: 540px; /* 设置高度 */
  line-height: 540px; /* 行高与高度相等，实现垂直居中 */
  overflow: hidden; /* 隐藏溢出内容 */
  background-color: #f3f3f3; /* 设置背景颜色 */
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