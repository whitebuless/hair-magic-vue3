<template>
<div class="addInfoBox">
  <div class="whiteBox">
    <h1
      style="font-family: Verdana, Geneva, Tahoma, sans-serif;"
    >
      填写用户信息
    </h1>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 6}"
        :wrapper-col="{ span: 15 }"
        :rules="rules"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="用户名"
          name="username" >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="设置密码"
          name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item has-feedback label="确认密码" 
        name="checkPass">
          <a-input-password v-model:value="formState.checkPass" 
           />
        </a-form-item>

        <a-form-item
          label="手机号码"
          name="phoneNumber"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.phoneNumber" />
        </a-form-item>
        <a-form-item
          label="性别"
          name="gender"
        >
        <a-radio-group v-model:value="formState.gender" name="radioGroup">
          <a-radio value="男"><span class="iconfont icon-nan">男</span></a-radio>
          <a-radio value="女"><span class="iconfont icon-nv">女</span></a-radio>
        </a-radio-group>

        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary"
           @click="handleSubmit"
           >开启极客之旅→</a-button>
        </a-form-item>
      </a-form>
  </div>
</div> 
</template>
<script setup>
import { onMounted, reactive,ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { message } from 'ant-design-vue';
import { updateUserApi } from '../../apis/userApi';
import router from '../../router';
const [messageApi, contextHolder] = message.useMessage();

const formRef = ref();
const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password');
  } else {
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.password) {
    return Promise.reject("密码输入不一致");
  } else {
    return Promise.resolve();
  }
};
const rules = {
  username:[
    {
      require:true,
      message: '请输入用户名!'
    }
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change',
    },
  ],
  checkPass: [
    {
      validator: validatePass2,
      trigger: 'change',
    },
  ],
};

const userStore=useUserStore()
const formState = reactive({
  username: '',
  password: '',
  gender:'男',
  checkPass:''
});
const passwordAgain=ref('')
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
onMounted(()=>{
  formState.username=userStore.userInfo.username
})
// 处理提交
const handleSubmit=()=>{
  if(!formState.username){
    message.warning('请输入用户名');
    return
  }
  if(!formState.password){
    message.warning("请设置密码")
    return
  }
  if(formState.password!=formState.checkPass){
    message.warning('密码输入不一致')
    return
  }
  if(!formState.phoneNumber){
    message.warning("请输入您的手机号码")
    return
  }
  formState.id=userStore.userInfo.id
  updateUserApi(formState).then(res=>{
    if(!res.data.data){
      message.warning("填写失败，请稍后再试")
    }else{
      userStore.userInfo=res.data.data
      message.success(res.data.msg)
      router.replace("/home/find")
    }
  })

}
</script>
<style lang="scss" scoped>
.addInfoBox{
  background-color: rgb(100,0,0);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .whiteBox{
    padding: 15px;
    width: 500px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
  }
}
</style>