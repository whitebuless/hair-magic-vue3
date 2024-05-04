<template>
  <div class="headerBox">
    <!-- logo展示区域 -->
    <div class="logoBox" style="display: flex;align-items: center;">
      <img 
      src="@/assets/logoLongWhite.png" 
      alt="Logo"
      style="width: 175px;margin-right: 1rem;"
      @click="router.push('/home/find')">
      <!-- <div class="location">
        <a-space>
          <a-select
            v-model:value="province"
            style="width: 100px"
            :options="provinceData.map(pro => ({ value: pro }))"
          ></a-select>
          <a-select
            v-model:value="secondCity"
            style="width: 100px;"
            :options="cities.map(city => ({ value: city }))"
          ></a-select>
        </a-space>
      </div> -->
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
        class="iconfont icon-mind-full" 
        style="font-size: large;
              cursor: pointer;
              margin: 0 10px;"
        title="Ai推荐"
        ></span>
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
            background-color: rgb(179, 179, 179);">
                <img src="https://th.bing.com/th/id/R.0f7e0f8f147bb9dfafc5e4c3bece59f2?rik=auXMf%2b3yZ3xMLQ&riu=http%3a%2f%2fimg.qqtouxiangzq.com%2f6%2f1182%2f32.jpg&ehk=kLA%2fNQgc8j3Poiz5Hva1NiVpJlwbSQosepCOeN5wde4%3d&risl=&pid=ImgRaw&r=0" 
                  alt=""
                  style="width: 100%;">  
        </div>

        <div class="actives">
          <ul>
            <li @click="router.push(`/home/user/${userStore.userInfo.id}`)">个人中心</li>
            <li @click="router.push(`/home/userorder`)">我的预约</li>
            <li @click="logOut">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref,watch,provide,computed } from 'vue';
import router from '../../../router/index.js';
import { useUserStore } from '../../../stores/user.js';
const userStore=useUserStore()
const searchText = ref('');
// location相关
const provinceData = ['山东', 'Jiangsu'];
const cityData = {
  山东: ['青岛', '济南', '潍坊'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
const province = ref(provinceData[0]);
const secondCity = ref(cityData[province.value][0]);
const cities = computed(() => {
  return cityData[province.value];
});
watch(province, val => {
  secondCity.value = cityData[val][0];
});
// 退出登录
function logOut(){
  router.replace('/')
  // userStore.userInfo=null
  location.reload()
}
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
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  .logoBox{
    cursor: pointer;
  }
  .searchBox{
    width: 30%;
    input{
      width: 100%;
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
        transition: all 0.3s;
        border-radius: 5px;
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