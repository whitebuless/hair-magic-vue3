<template>
  <div class="shopCardBox">
    <div
    >
      {{ shopInfo.name }}
      <span class="iconfont icon-star-fill"
      style="color:#aaa;">{{ shopInfo.rank }}</span>
    </div>

    <div class="locations"
    style="font-size: 12px;
    color:rgb(100, 100, 100) ;">
    <span class="iconfont icon-weizhi" style="margin-right: 20px;">{{ shopInfo.location }}</span>
    <span v-for="i in shopInfo.waiting" class="iconfont icon-renshu"></span>
      
    </div>

  </div>
</template>
<script setup>
defineProps({
  shopInfo:Object
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/color.scss';
.shopCardBox{
  width: 100%;
  height: 5rem;
  border-radius: 4px;
  box-shadow: 0 0 3px 3px rgb(236, 236, 236);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all .3s;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 4px 4px rgba(113, 0, 0, 0.31);
  }
  
}
.icon-renshu{
  color: $themeColor;
}

</style>