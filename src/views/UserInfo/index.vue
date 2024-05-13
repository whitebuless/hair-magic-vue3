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
          style="color: pink;"
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
  width="600px"
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'black' }"
    height="600px"
    title="个人信息修改"
    placement="bottom"
    @after-open-change="afterOpenChange"
  >
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel  header="基本信息修改">
        <a-form :model="userEditForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="头像上传">
            <a-upload action="/upload.do" list-type="picture-card">
              <div>
                <PlusOutlined />
                <div style="margin-top: 8px"><img :src="userEditForm.avatar" style="width:100%" alt=""></div>
              </div>
            </a-upload>
        </a-form-item>
          <a-form-item label="用户名">
            <a-input v-model:value="userEditForm.username" />
          </a-form-item>
          <a-form-item label="简介">
            <a-textarea v-model:value="userEditForm.explain" />
          </a-form-item>
          <a-form-item
              label="性别"
              name="gender"
            >
            <a-radio-group v-model:value="userEditForm.gender" name="radioGroup">
              <a-radio value="男"><span class="iconfont icon-nan">男</span></a-radio>
              <a-radio value="女"><span class="iconfont icon-nv">女</span></a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="手机号">
            <a-input v-model:value="userEditForm.phoneNumber" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">确认</a-button>
            <a-button style="margin-left: 10px" @click="open=false">取消</a-button>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel  header="修改密码">
        <!-- <a-form-item label="验证码">
          <a-input style="margin-bottom: 5px;" />
          <a-button @click="handleSend"  type="primary" v-if="isCounting">发送邮箱验证码</a-button>
          <a-button @click="handleSend"  type="primary" v-else>{{count}}</a-button>
        </a-form-item> -->
        <div v-show="displayPassord">
          <a-form-item label="新密码">
            <a-input style="margin-bottom: 5px;" v-model:value="newPassword"/>
          </a-form-item>
          <a-form-item  label="确认密码">
            <a-input style="margin-bottom: 5px;" v-model:value="newPasswordAgain"/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitNewPassord">确认</a-button>
          </a-form-item>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </a-drawer>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { findUserById } from '../../apis/userApi';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { getFollowerApi,getFollowingApi } from '../../apis/followApi';
import { getShareByUserId } from '../../apis/shareAPpi';
import { updateUserApi } from '../../apis/userApi';
import { message } from 'ant-design-vue';
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
  userEditForm.value.id=userStore.userInfo.id
  userEditForm.value.username=userStore.userInfo.username
  userEditForm.value.explain=userStore.userInfo.explain
  userEditForm.value.avatar=userStore.userInfo.avatar
  userEditForm.value.gender=userStore.userInfo.gender
  userEditForm.value.phoneNumber=userStore.userInfo.phoneNumber
  open.value=true
}

// 展示修改密码
const displayPassord=ref(true)
// 倒计时
const isCounting=ref(false)
const count=ref(60)
const newPassword=ref('')
const newPasswordAgain=ref('')
async function submitNewPassord(){
  if(newPassword.value!=newPasswordAgain.value){
    message.error("两次密码不一致")
    return
  }
  const newPassord={
    id:userStore.userInfo.id,
    password:newPassword.value
  }
  await updateUserApi(newPassord).then(res=>{
    message.success(res.data)
  })
  await findUserById(userStore.userInfo.id).then(res=>{
    userStore.userInfo=res.data.data
  })
}

// 定义用户信息修改结构体
const userEditForm=ref({})
const labelCol = {
  style: {
    width: '150px',
  },
};
const onSubmit =async () => {
  await updateUserApi(userEditForm.value).then(res=>{
    message.success(res.data.msg)
  })
  await findUserById(userStore.userInfo.id).then(res=>{
    userStore.userInfo=res.data.data
  })
};
const wrapperCol = {
  span: 14,
};


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