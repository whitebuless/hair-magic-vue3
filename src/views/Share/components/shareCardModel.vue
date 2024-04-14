<template>
  <div class="shareCardBox">
    <img src="https://img2.imgtp.com/2024/04/13/IjkjcvVF.jpg" alt="">
    <div class="content">
      <div class="title">
        <b>        {{ shareBody.title }}</b>
        <span style="font-size: 0.8rem;
                    color: #888888;
                    float: right;">{{ shareBody.hairType }}</span>
      </div>
      <div class="description">
        {{ shareBody.description }}
      </div>
      <div class="infos">
        <span class="iconfont icon-dianzan">122</span>
        <span class="iconfont icon-pinglun">222</span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  shareBody:Object
})
</script>
<style lang="scss" scoped>
.shareCardBox{
  margin: 0.5rem;
  height: 300px;
  width: 250px;
  background-color: rgb(252, 252, 252);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover{
    background-color: #dcdcdc;
  }
  img{
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .content{
    padding: 2px 2px 5px;
    .title{
      padding: 2px;
      margin-bottom: 0.6rem;
    }
    .description{
      font-family: 'Courier New', Courier, monospace;
    }
    .infos{
      float: right;
      margin-top: 1rem;
      color: rgb(153, 153, 153);
      span{
        margin: 0.3rem;
        font-size: 1rem;
        color: rgb(153, 153, 153);
        &:hover{
          &::before{
            color: rgb(112, 0, 0);
          }
        }
      }
    }
    
  }

}

</style>