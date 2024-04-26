<template>
  <div id="loginBox">
    <div class="loginFormBox">
      <div class="topicBox">
        <h1 class="loginTopic"
        :style="{color:roleColor}"
        @click="role=true"
        >用户登录</h1>
        <h1 class="loginTopic"
        :style="{color:roleColor2}"
        @click="role=false">商家登录</h1>
        <div class="topicRight">
          <span class="iconfont icon-mimadenglu" :class="loginWay==true?'hightLight':'lowLight'" @click="changeWay(true)"></span>
          <span class="iconfont icon-yanzhengmadenglu" :class="loginWay==false?'hightLight':'lowLight'" @click="changeWay(false)"></span>
        </div>
      </div>
      <form action="" class="formBox">
        <input type="text" name="account" id="" placeholder="输入手机号" v-model="userData.phoneNumber">
        <div style="display: flex;" v-if="loginWay==true">
          <input type="text" name="password" id="" placeholder="输入密码" v-model="userData.password">
        </div>
        <div  v-else-if="loginWay==false">
          <div style="display: flex;">
            <input type="text" name="password" id="" placeholder="输入验证码">
            <a-button type="primary" >发送验证码</a-button>
          </div>
        </div>
        <div style="display: flex;">
          <input type="text" name="" id="" placeholder="输入图形验证码" v-model="userCode">
          <canvas ref="myCanvas" width="120" height="45" @click="generateCode()"></canvas>
        </div>
        <a-button type="primary" class="loginBtn" @click="clickLogin()">登录/注册</a-button>
      </form>
      <div class="texts">
        <span style="color: #aaa;">账号不存在将自动注册</span>
        <span>
          <div class="checkbox">
            <label :style="{color:checkedColor}" style="transition: all 0.3s;">
              <input type="checkbox" value="" v-model="checked" >
                同意<a>用户隐私协议</a>
            </label>
          </div>
        </span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="leftTexts">
      <h1 class="txt"><i><b>海马极客</b></i></h1>

      <div class="rectangle"></div>
      <span class="hair"><b>Hair</b></span>     <span class="magic"><b>Magic</b></span>
    </div>

  </div>
</template>
<script setup>
// 导入Vue相关依赖
import { computed, onMounted, ref } from "vue";
import { useUserStore } from '../../stores/user'
const user = useUserStore()
// 导入请求
import {userLoginApi} from "../../apis/userApi"
// 用户类型
const role=ref(true)
const roleColor=computed(()=>role.value==true?'black':'#aaaaaa')
const roleColor2=computed(()=>role.value==false?'black':'#aaaaaa')
// 登录方式标志
let loginWay=ref(true)
// 用户登录信息
let userData=ref({})
// 验证码相关
let userCode=ref('')
const myCanvas=ref(null)
const checkCode=ref('')
// 同意协议
let checked=ref(false)
let checkedColor=ref('black')


// 生命周期钩子
onMounted(()=>{
  generateCode()

})

function generateCode(){
  const canvas=myCanvas.value;
  // 获取Canvas的上下文
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 随机生成四个字母和颜色
  const captchaText = generateCaptcha();
  checkCode.value=captchaText
  console.log(checkCode.value)
  const colors = generateColors();
  // 设置文字样式
  ctx.font = 'bold 22px Arial'; // 调整字体大小为24px
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'right';
  // 对每个字母设置不同的颜色并在Canvas上绘制扭曲和旋转后的文字
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = colors[i];
    drawDistortedText(ctx, captchaText[i], i * 30 + 15, 22); // 调整位置
  }

}
// 验证码字母生成
function generateCaptcha() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 4; i++) {
    captcha += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return captcha;
}
// 随机生成颜色
function generateColors() {
  const colors = [];
  for (let i = 0; i < 4; i++) {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16); // 随机生成颜色值
    colors.push(color);
  }
  return colors;
}
// 验证码文字变换
function drawDistortedText(ctx, text, x, y) {
  // 设置扭曲和旋转变换
  ctx.setTransform(1, 0.2 * Math.random(), -0.2 * Math.random(), 1, 0, 0);

  // 在Canvas上绘制文字
  ctx.fillText(text, x, y);
}


// 改变登陆方式
let changeWay=function(status){
  loginWay.value=status
}
// 点击登录事件
let clickLogin=function(){
  // 验证码模块检验
  if(userCode.value.toUpperCase()!=checkCode.value){
    alert("验证码错误")
    generateCode()
    userCode.value=''
    return
  }
  // 用户协议模块检验
  if(checked.value!=true){
    checkedColor.value='red'
    alert("请勾选用户隐私协议")
    return
  }
  if(loginWay.value==true){
    user.login(userData.value.phoneNumber,userData.value.password,role.value)
  }
}



</script>
<style lang="scss" scoped>
#loginBox{
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/topicImg.jpg");
  background-size: 110% auto;
  background-position: center center; 
  background-repeat: no-repeat;
  background-color: #910000;
  .loginFormBox{
    position: absolute;
    width: 404px;
    height: 400px;
    right: 150px;
    top: 139px;
    bottom: 139px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
    background: rgb(242, 242, 242);
    padding: 30px;
    .topicBox{
      cursor: pointer;
    }
    .texts{
      height: 10vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 2vh;
      font-size: 14px;
      span{
        cursor: pointer;
      }
    }
    .topicBox{
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 0;
      .topicRight{
        span{
          margin: 5px;
          font-size: 20px;
          cursor: pointer;
        }
        .hightLight{
          color: #323232;
        }
        .lowLight{
          color: #ccc;
        }
      }
    }
    .loginTopic{
      margin-bottom: 4vh;
    }
    .formBox{
      display: flex;
      flex-direction: column;
      input{
        outline: none;
        width: 100%;
        height: 40px;
        border:none;
        border-bottom: 1px solid #252525;
        padding: 2px 5px;
        margin-bottom: 10px;
        background-color: rgba(0, 0, 0, 0);
        font-size: 15px;
        transition: 0.4s all;
        &:focus{
          font-size: 20px;
        }
      }
    }
  }
  .leftTexts{
    width: 700px;
    height: 70vh;
    position: absolute;
    top: 15vh;
    left: 20vw;
    padding: 40px;
    h1{
      font-size: 90px;
      display: block;
      color: white;
    }
    span{
      margin-top: 5px;
      position: absolute;
      color: white;
      font-size: 50px;
    }
    .hair{
      top: 30vh;
    }
    .magic{
      top: 35vh;
      left: 15vw;
    }
    .rectangle{
      width:60%;
      height: 15px;
      margin-top: 40px;
      background-color: white;
      &::after{
        content: " ";
        width: 100px;
        height: 100px;
        background-color: #fff;
      }
    }
  }
}

</style>