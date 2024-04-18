<template>
  <div class="shopCardBox">
    {{ shopInfo.name }}
    <div class="locations"
    style="font-size: 12px;
    color:rgb(100, 100, 100) ;">
    <span class="iconfont icon-weizhi"></span>
      {{ shopInfo.location }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  shopInfo:Object
})
</script>
<style lang="scss" scoped>
.shopCardBox{
  width: 100%;
  height: 5rem;
  background-color: rgb(246, 246, 246);
  border-radius: 4px;
  box-shadow: 0 0 3px 3px rgb(236, 236, 236);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all .3s;
  &:hover{
    box-shadow: 0 0 4px 4px rgba(113, 0, 0, 0.31);
  }
  
}

</style>