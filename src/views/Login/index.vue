<template>
  <div id="loginBox">
    <div class="loginFormBox">
      <h1 class="loginTopic">用户登录</h1>
      <form action="" class="formBox">
        <input type="text" name="account" id="" placeholder="手机号码">
        <div style="display: flex;">
          <input type="text" name="password" id="" placeholder="输入验证码">
          <a-button type="primary" >发送验证码</a-button>
        </div>
      </form>
      <a-button type="primary" shape="circle" class="loginBtn">登录</a-button>


      <!-- <div class="LoginBtn" style="border-radius: 50%;width: 90px;height: 90px;background-color: grey;"> -->
    </div>

  </div>
</template>
<script>
import axios from "axios"
axios.get('http://127.0.0.1:8080/findById?id=1')
  .then(function (response) {
    // 处理成功情况
    console.log(response.data);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });
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
    height: 522px;

    right: 150px;
    top: 139px;
    bottom: 139px;

    border-radius: 20px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
    background: rgb(242, 242, 242);

    padding: 30px;
    .loginTopic{
      margin-bottom: 2vh;
    }
    .formBox{
      display: flex;
      flex-direction: column;
      input{
        outline: none;
        width: 100%;
        height: 40px;
        border:0;
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
}
</style>