<template>
  <div class="userInfoBox">
    <div class="avatar">
      <a-avatar :size="160" src="https://th.bing.com/th/id/R.0f7e0f8f147bb9dfafc5e4c3bece59f2?rik=auXMf%2b3yZ3xMLQ&riu=http%3a%2f%2fimg.qqtouxiangzq.com%2f6%2f1182%2f32.jpg&ehk=kLA%2fNQgc8j3Poiz5Hva1NiVpJlwbSQosepCOeN5wde4%3d&risl=&pid=ImgRaw&r=0">
    </a-avatar>
    </div>
    <div class="baseInfo">
      <p>
        {{ lookingUser.username }}
        <span 
        v-if="lookingUser.gender=='男'" 
        class="iconfont icon-nan"
        style="color: blue;"></span>
        <span 
        v-else-if="lookingUser.gender=='女'"
        class="iconfont icon-nv"
        ></span>
      </p>
      <p>{{ lookingUser.explain }}</p>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { findUserById } from '../../apis/userApi';
import { useRoute } from 'vue-router';

const lookingUser=ref({})

onMounted(()=>{
  const route = useRoute();
  const id = route.params.id;
  findUserById(id).then(res=>{
    lookingUser.value=res.data.data
  })
})
</script>
<style lang="scss" scoped>
.userInfoBox{
  display: flex;
  .baseInfo{
    padding: 20px;
  }

}
</style>