<template>
  <div class="headerBox">
    <!-- logo展示区域 -->
    <div class="logoBox" style="display: flex;align-items: center;">
      <img 
      src="https://img2.imgtp.com/2024/04/12/t8p6tbU8.png" 
      alt="Logo"
      style="width: 25px;margin-right: 1rem;"
      @click="router.push('/home/find')">
      <div >
        > 山东
      </div>
    </div>
    <!-- 搜索框区域 -->
    <div class="searchBox">
      <input type="text"  
      placeholder="输入搜索内容/发型/店铺"
      v-model="searchText">

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
        <div class="actives">
          <ul>
            <li @click="router.push(`/home/user/${userStore.userInfo.id}`)">个人中心</li>
            <li>我的分享</li>
            <li>我的预约</li>
          </ul>

        </div>
      </div>
    </div>

    

  </div>
</template>
<script setup>
import { ref,watch,provide } from 'vue';
import router from '../../../router/index.js';
import { useUserStore } from '../../../stores/user.js';
const userStore=useUserStore()
const searchText = ref('');

// 监听输入框内容的变化，更新提供的值
watch(searchText, newValue => {
  provide('searchText', newValue);
});

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
  .logoBox{
    cursor: pointer;
  }
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
  .functionBox{
    .userBox{
      &:hover{
        .actives{
          height: 150px;
        }
      }
      .actives{
        height: 0;
        overflow: hidden;
        cursor: pointer;
        color: black;
        top: 46px;
        position: absolute;
        width: 100px;
        right: 10px;
        background-color: rgb(255, 255, 255);
        z-index: 999;
        box-shadow: 0px 0px 3px black;
        transition: all 0.5s;
        ul{
          width: 100%;
          li{
            padding: 10px;
            &:hover{
              background:rgb(104, 0, 0);
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>