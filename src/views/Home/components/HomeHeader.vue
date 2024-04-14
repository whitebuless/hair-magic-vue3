<template>
  <div class="headerBox">
    <!-- logo展示区域 -->
    <div class="logoBox" style="display: flex;align-items: center;">
      <img 
      src="https://img2.imgtp.com/2024/04/12/t8p6tbU8.png" 
      alt="Logo"
      style="width: 25px;margin-right: 1rem;">
      <div >
        > 山东
      </div>
    </div>
    <!-- 搜索框区域 -->
    <div class="searchBox">
      <input type="text"  placeholder="输入搜索内容/发型/店铺">

    </div>
    <!-- 功能区域 -->
    <div class="functionBox"
         style="display: flex;
                align-items: center;">
      <div>
        <span 
        class="iconfont icon-shangchuan" 
        style="font-size: large;
              cursor: pointer;
              margin: 0 10px;"
        title="上传"
        @click="router.push('/func/uploadClient')"

        ></span>
      </div>
      <div>
        <span 
        class="iconfont icon-shezhi" 
        style="font-size: large;
              cursor: pointer;
              margin: 0 10px;"
        title="设置"
        @click="console.log('进入设置页面')"

        ></span>
      </div>
      <!-- 用户信息入口/头像显示 -->
      <div class="userBox">
        <div class="box"
            style="width: 30px;
            height: 30px;
            margin-left: 10px;
            background-color: rgb(179, 179, 179);"></div>
      </div>
    </div>

    

  </div>
</template>
<script setup>
import router from '../../../router';
</script>
<style lang="scss" scoped>
.headerBox{
  background: rgb(15, 15, 15);
  height: 4rem;
  color: white;
  padding: 1rem 3rem;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  margin-bottom: 1rem;
  .searchBox{
    input{
      width: 400px;
      height: 20px;
      background: none;
      border: 2px solid rgb(179, 179, 179);
      padding: 15px;
      box-shadow:none;
      transition: 0.5s all;
      &:active{
        border:  2px solid rgb(248, 248, 248);
      }
      border-radius: 10px;
    }
  }
}
</style>