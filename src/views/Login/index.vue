<template>
  <div id="loginBox">
    <div class="loginFormBox">
      <h1 class="loginTopic">用户登录</h1>
      <input type="text" name="" id="">

      <input type="text" name="" id=""><button>发送验证码</button>

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
    background: rgb(234, 234, 234);

    padding: 30px;
  }
}
</style>