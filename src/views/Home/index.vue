<template>
  <div>
    <HomeHeader></HomeHeader>
    <!--  -->
    <div class="content">
      <div class="menu">
        <ul>
          <li @click="router.push('/home/find')">
            <span class="iconfont icon-faxian"
                  >发现</span>
          </li>
          <li>
            <span class="iconfont icon-dianpu">店铺</span>
          </li>
          <li>
            <span class="iconfont icon-liulan">关注</span>
          </li>
        </ul>
      </div>
      <div class="BOX">
        <router-view ></router-view>
      </div>
    </div>
    <HomeFooter></HomeFooter>
  </div>
</template>
<script setup>
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
import router from '../../router';

</script>
<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  &>div{
    padding: 1rem;
  }
  .menu{
    background-color: rgb(251, 251, 255);
    flex: 1;
    margin-right: 1rem;
    height: 400px;
    ul{
      li{
        padding: 0.9rem;
        cursor: pointer;
        &:hover{
          background-color: rgb(142, 0, 0);
          color: white;
          &>span::before{
            color: white;
          }
        }
        .iconfont::before{
          vertical-align: middle;
          margin-right: 5px;
          font-size: 1.5rem;
          color: rgb(129, 0, 0);
        }
      }
    }

  }
  .BOX{
    background-color: rgb(255, 255, 255);
    flex: 5;
    position: relative;
  }

}

</style>