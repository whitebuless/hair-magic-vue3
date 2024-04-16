<template>
  <div class="navBarBox">
    <div class="">    欢迎来到{{ userStore.userInfo.username }}后台管理系统</div>
    <div class=""></div>
  </div>
</template>
<script setup>
import { useUserStore } from "../../../../stores/user";
const userStore=useUserStore()

</script>
<style lang="scss" scoped>
.navBarBox{
  color: var(--theme) ;
  width: 100%;
  background-color: white;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>