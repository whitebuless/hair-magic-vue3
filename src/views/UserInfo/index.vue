<template>
  <div class="userInfoBox">
    <div class="avatar">
      <a-avatar :size="160" src="https://th.bing.com/th/id/R.0f7e0f8f147bb9dfafc5e4c3bece59f2?rik=auXMf%2b3yZ3xMLQ&riu=http%3a%2f%2fimg.qqtouxiangzq.com%2f6%2f1182%2f32.jpg&ehk=kLA%2fNQgc8j3Poiz5Hva1NiVpJlwbSQosepCOeN5wde4%3d&risl=&pid=ImgRaw&r=0">
      </a-avatar>
    </div>
    <div class="baseInfo">
      <p style="color: #999999;" disabled>
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
      <a-button type="primary" block v-if="status=='other'">+关注</a-button>
      <a-button block v-else-if="status=='myself'">编辑资料</a-button>


    </div>
  </div>
  <a-skeleton active />
  <a-skeleton active />
  <a-skeleton active />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { findUserById } from '../../apis/userApi';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/user';
const userStore=useUserStore()

const lookingUser=ref({})
const status=ref('other')
onMounted(()=>{
  const route = useRoute();
  const id = route.params.id;
  findUserById(id).then(res=>{
    lookingUser.value=res.data.data
    if(res.data.data.id==userStore.userInfo.id){
      status.value="myself"
    }
  })
  
})
</script>
<style lang="scss" scoped>
.userInfoBox{
  display: flex;
  margin-bottom: 30px;
  .baseInfo{
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>