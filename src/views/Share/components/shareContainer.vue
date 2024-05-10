<template>
  <div class="shareContainer"       v-masonry>
    <ShareCardModelVue
      v-for="(item, index) in shareArray"
      class="share"
      v-masonry-tile
      :key="item.id"
      :shareBody="item"
      @click="handleCardClick(item)"
    />
  </div>
</template>

<script setup>
import ShareCardModelVue from "@/views/Share/components/shareCardModel.vue";

defineProps({
  shareArray: Array
})

const emit = defineEmits(["card-click"]);

function handleCardClick(item) {
  emit("card-click", item);
}
</script>
<style lang="scss" scoped>
.shareContainer{
  width: 100%;
  .share{
    width: 23%;
  }
}
</style>