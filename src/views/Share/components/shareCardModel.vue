<template>
  <div class="shareCardBox" ref="cardRef">
    <img :src="shareBody.imgs.split(' ')[0]" alt="" ref="imageRef" >
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
        <span class="iconfont icon-dianzan">&nbsp;{{ shareBody.likes }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';

const cardRef = ref(null);
const imageRef = ref(null);
const cardVisible = ref(false);
const imageSrc = ref('');

onMounted(() => {

});

function handleImageLoad() {
  cardVisible.value = true; // 当图片加载完成后，显示整个组件
}

defineProps({
  shareBody: Object
})
</script>

<style lang="scss" scoped>
.shareCardBox {
  margin: 0.5rem;
  // width: calc(100% - 1rem); /* 使用calc函数来动态计算每个卡片的宽度 */
  box-sizing: border-box; /* 计算边框和填充在内 */
  overflow: hidden;
  background-color: rgb(252, 252, 252);
  border-radius: 10px;
  // padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    // background-color: #dcdcdc;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.122);
  }
  img {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .content {
    padding: 2px 12px 5px;

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

      }
    }
  }
}
</style>
