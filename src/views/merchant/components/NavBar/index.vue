<template>
  <div class="navBarBox">
    <div class="">    欢迎来到{{ merchantStore.merchantInfo.name==null?'***':merchantStore.merchantInfo.name }}后台管理系统</div>
    <div class=""></div>
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
}
</style>