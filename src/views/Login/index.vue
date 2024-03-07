<template>
  <div id="loginBox">
    <div class="loginFormBox">
      <div class="topicBox">
        <h1 class="loginTopic">用户登录</h1>
        <div class="topicRight">
          <span class="iconfont icon-mimadenglu" :class="loginWay==true?'hightLight':'lowLight'" @click="changeWay(true)"></span>
          <span class="iconfont icon-yanzhengmadenglu" :class="loginWay==false?'hightLight':'lowLight'" @click="changeWay(false)"></span>
        </div>
      </div>
      <form action="" class="formBox">
        <input type="text" name="account" id="" placeholder="手机号码">
        <div style="display: flex;" v-if="loginWay==true">
          <input type="text" name="password" id="" placeholder="输入密码" >
        </div>
        <div style="display: flex;" v-else-if="loginWay==false">
          <input type="text" name="password" id="" placeholder="输入验证码">
          <a-button type="primary" >发送验证码</a-button>
        </div>
        <a-button type="primary" class="loginBtn">登录/注册</a-button>
      </form>
      <div class="texts">
        <span style="color: #aaa;">账号不存在将自动注册</span>
        <span>
          <div class="checkbox">
            <label>
              <input type="checkbox" value="">
                同意<a>用户隐私协议</a>
            </label>
          </div>
        </span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="leftTexts">
      <h1><i><b>海马极客</b></i></h1>

      <div class="rectangle">

      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from "vue";
let loginWay=ref(true)

let changeWay=function(status){
  loginWay.value=status
}

</script>
<style lang="scss" scoped>
#loginBox{
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/topicImg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;

  .loginFormBox{
    position: absolute;
    width: 404px;
    height: 400px;
    right: 150px;
    top: 139px;
    bottom: 139px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
    background: rgb(242, 242, 242);
    padding: 30px;
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
    .rectangle{
      width: 40%;
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