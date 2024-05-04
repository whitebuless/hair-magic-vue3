<template>
  <div class="shareCardBox">
    <img :src="shareBody.imgs.split(' ')[0]" alt="" loading="lazy">
    <div class="content">
      <div class="title">
        <b style="margin-right: 10px;">{{ shareBody.title }}</b>
        <span>{{ shareBody.hairType }}</span>
      </div>
      <div class="description">
        {{ shareBody.description }}
      </div>
      <div class="infos">
        <span style="float: left;">{{ shareBody.userName }}</span>
        <!-- <span class="iconfont icon-dianzan">{{ shareBody.likes }}</span> -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shareBody: Object
})
</script>

<style lang="scss" scoped>
.shareCardBox {
  margin: 0.5rem;
  width: calc(100% - 1rem); /* 使用calc函数来动态计算每个卡片的宽度 */
  float: left; /* 左浮动实现瀑布流布局 */
  box-sizing: border-box; /* 计算边框和填充在内 */
  overflow: hidden;
  background-color: rgb(252, 252, 252);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #dcdcdc;
  }

  img {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .content {
    padding: 2px 2px 5px;

    .title {
      padding: 2px;
      margin-bottom: 0.6rem;
    }

    .description {
      font-family: 'Courier New', Courier, monospace;
    }

    .infos {
      width: 100%;

      margin-top: 1rem;
      color: rgb(153, 153, 153);
      span {
        float: right;
        margin: 0.3rem;
        font-size: 1rem;
        color: rgb(153, 153, 153);

        &:hover {
          &::before {
            color: rgb(112, 0, 0);
          }
        }
      }
    }
  }
}
</style>
