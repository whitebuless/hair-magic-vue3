<script setup>
import { onMounted, ref,inject, watchEffect,provide } from "vue";
import { getShareApi } from "../../apis/shareAPpi"
import ShareCardModelVue from "./components/shareCardModel.vue";
import { useShareStore } from "../../stores/share";
import { getCommentByShareIdApi } from "../../apis/commentApi"
import { useCommentStore } from "../../stores/comment";
import { useUserStore } from "../../stores/user";
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


function handleCardClick(item){
  getCommentByShareIdApi(item.id).then(res=>{
    commenList.value=res.data.data
  })
  detail.value=!detail.value
  shareStore.shareInfo=item
}

// 发表评论
async function subCommentClick(){
  if(commentEdit.value==''){
    alert('空字符')
    return
  }
  await commentStore.subComment(
    userStore.userInfo.id,
    userStore.userInfo.username,
    commentEdit.value,
    shareStore.shareInfo.id
  ).then(()=>{
    setTimeout(()=>{
      getCommentByShareIdApi(item.id).then(res=>{
    commenList.value=res.data.data
  })
    },1000)
  })
}
</script>
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
    <div class="floatDetail"
    :style="{display:detail?'none':'flex'}">

      <div class="leftBox">
        <div class="imgShow">
          <img :src="shareStore.shareInfo.imgs.split(' ')[0]" alt="">
        </div>
        <div class="details">
          <div class="head">
            <span class="title">{{ shareStore.shareInfo.title }}</span>
            <span class="hairType">{{ shareStore.shareInfo.hairType }}</span>
          </div>
          <div class="body">
            <span class="description">
              {{ shareStore.shareInfo.description}}
            </span>
          </div>
          <div class="foot">
            <span class="iconfont icon-weizhi">{{ shareStore.shareInfo.location }}</span>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <h1><b>评论</b></h1>
        <div class="comments">
          <div v-for="item in commenList" class="pcomment">
            <div class="userName">{{ item.userName }}</div>
            <div class="comment">{{ item.comment }}</div>
            <div class="foot">
              <span class="iconfont icon-dianzan">{{ item.likes }}</span>
            </div>
          </div>
        </div>
        <a-textarea v-model:value="commentEdit" 
        placeholder="说点什么吧~"
        style="margin-bottom: 5px;"/>
        <a-button type="primary" @click="subCommentClick">发表</a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#shareBox {
  column-count: 4; /* 设置列数 */
  column-gap: 1rem; /* 设置列之间的间隔 */
  .floatDetail{
    width: 800px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    background: rgb(255, 255, 255);
    transform: translate(-50%,-50%);
    border-radius: 10px;
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.095);
    display: flex;
    padding: 20px;
    .leftBox{
      width: 50%;
      padding: 5px;
      .imgShow{
        width: 100%;
        max-height: 70%;
        overflow: hidden;
        
        img{
          width: 100%;
          max-height: 70%
        }
        margin-bottom: 0.6rem;
      }
      .details{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .head{
          margin-bottom: 10px;
          .title{
          }
          .hairType{
            color: rgb(146, 146, 146);
            float:right;
          }
        }
        .body{
          margin-bottom: 10px;
          .description{
            text-indent:24px;
            color: rgb(146, 146, 146);
          }
        }
        
        .foot{
          color: rgb(146, 146, 146);
        }
      }
    }
    .rightBox{
      width: 50%;
      padding: 5px;
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

</style>