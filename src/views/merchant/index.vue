<template>
  <div class="merchantBox">
    <div class="leftView">
      <SideBar></SideBar>
    </div>

    <div class="rightView">
      <NavBar></NavBar>
      <div class="tableBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
</script>
<style lang="scss" scoped>
.merchantBox{
  background-color: rgb(237, 237, 237);
  width:100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .leftView{
    width: 15%;

  }
  .rightView{
    width: 85%;
    .tableBox{
      box-sizing: content-box;
      padding: 20px;
      height: 100%;
      .list-item{
        background-color: white;
        border-radius: 10px;
        height: 100%;
        padding: 30px;
        box-shadow: 0 0 4px 4px rgb(207, 207, 207);
      }
    }
  }
}
</style>