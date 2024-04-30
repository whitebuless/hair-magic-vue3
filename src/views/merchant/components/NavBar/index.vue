<template>
  <div class="navBarBox">
    <span class="title">    欢迎来到{{ merchantStore.merchantInfo.name==null?'***':merchantStore.merchantInfo.name }}后台管理系统</span>
  </div>
</template>
<script setup>
import { useUserStore } from "../../../../stores/user";
import { useMerchantStore } from "../../../../stores/merchant";
const userStore=useUserStore()
const merchantStore=useMerchantStore()

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
  .title{
    text-align: center;
    width: 100%;
    font-size: larger;
  }
}
</style>