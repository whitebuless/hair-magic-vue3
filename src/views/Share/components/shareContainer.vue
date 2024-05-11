<template>
  <div class="shareContainer"  v-masonry >
    <ShareCardModelVue
      v-for="(item, index) in shareStore.shareList"
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
import { recommendShareApi } from "../../../apis/shareAPpi";
import { onMounted, ref } from "vue";
import { useScroll } from "@vueuse/core";
import { useUserStore } from "../../../stores/user";
import { useShareStore } from "../../../stores/share";
import { useRouter } from "vue-router";

const router=useRouter()
const userStore = useUserStore()
const shareStore= useShareStore()

const PAGE_SIZE = 10;
let currentPage = 2;
const shareArray = ref([]);
let isLoading = false;

onMounted(async () => {
  // await getShares(userStore.userInfo.id, currentPage, PAGE_SIZE);
  
  // // 在DOM加载完成后执行监听滚动事件的代码
  // const { y } = useScroll(document.querySelector('.shareContainer'));

  // // 当滚动到距离底部一定距离时加载更多数据
  // if (y.value + window.innerHeight >= document.querySelector('.shareContainer').offsetHeight - 50) {
  //   // 根据需要调整 200 的值，它表示距离底部的距离
  //   if (!isLoading) {
  //     getShares(userStore.userInfo.id, currentPage, PAGE_SIZE);
  //   }
  // }
  let open=false
  document.querySelector(".shareContainer").addEventListener("scroll", async(event) => {
    const container = event.target;
      if ( container.scrollHeight - container.scrollTop <= container.clientHeight + 400) {
        if (!open) {
          open=true
          if(router.currentRoute.value.fullPath.toString().indexOf('find')!=-1){
            await getShares(userStore.userInfo.id, currentPage, PAGE_SIZE);
          }
          setTimeout(()=>{open=false},500)
        }
      }
    });
});
// 分享页调用
async function getShares(id, page, pageSize) {
  try {
    isLoading = true;
    const response = await recommendShareApi(id, page, pageSize);
    const newData = response.data;
    shareStore.shareList = [...shareStore.shareList, ...newData];
    currentPage++;
  } finally {
    isLoading = false;
  }
}
// 关注页调用




const emit = defineEmits(["card-click"]);
function handleCardClick(item) {
  emit("card-click", item);
}
</script>

<style lang="scss" scoped>
.shareContainer{
  width: 100%;
  overflow: scroll;
  height: 100% !important;
  position: fixed;
  .share{
    transition: none !important;
    width: 23%;
  }
}
</style>
