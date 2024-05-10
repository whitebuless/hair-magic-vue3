<template>
  <div class="uploadBox">
    <div class="uploadForm">
      <h1><b>填写分享</b></h1><br>
      <a-form :model="formState" 
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
      style="width: 100%;"
      >
      <a-form-item label="分享标题" required>
        <a-input 
        v-model:value="formState.title"
        placeholder="输入分享标题"
        @change="handleTitleChangeWrapper"
         />
      </a-form-item>
      <a-form-item label="发型" required>
        <a-select
          v-model:value="formState.hairType"
          show-search
          placeholder="选择发型"
          :options="options"
        ></a-select>
      </a-form-item>
      <a-upload
        v-model:file-list="fileList"
        action="https://www.imgtp.com/api/upload"
        list-type="picture-card"
        :customRequest="uploadImage"
        :before-upload="beforeUpload"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <div style="margin-top: 8px">点击上传</div>
        </div>
      </a-upload>
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>

      <a-form-item label="标签">
        <a-checkbox-group v-model:value="formState.searchInfo">
          <a-checkbox :value="item" name="type" v-for="item in cutWords">{{item}}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- <a-form-item label="类别">
        <a-radio-group v-model:value="formState.type">
          <a-radio value="1">评价类</a-radio>
          <a-radio value="2">生活类</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item label="说点什么吧~"         >
        <a-textarea v-model:value="formState.description" @change="handleTitleChangeWrapper"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">分享</a-button>
        <!-- <a-button style="margin-left: 10px">保存并退出</a-button> -->
      </a-form-item>
      </a-form>
    </div>
    <div class="previewContrainer">
      <h1><b>预览图</b></h1>
        <ShareCardModelVue
          :shareBody="formState"
          style="transition: all .3s;width:300px;"
          @click="console.log(1)"
        >
        </ShareCardModelVue>
      </div>
  </div>
</template>
<script setup>
import { reactive, toRaw, ref, onMounted } from 'vue';
import axios from 'axios';
import { useShareStore } from '../../stores/share';
import { useUserStore } from '../../stores/user';
import ShareCardModelVue from "@/views/Share/components/shareCardModel.vue";
import { cutwordApi } from '../../apis/IKcutwordApi';
import { message } from 'ant-design-vue';
const shareStore=useShareStore()
const userStore=useUserStore()

// 切分结果
const cutWords=ref([])

onMounted(()=>{
  // 获取全部种类
  axios.get('http://localhost:8080/hairtype/alltype')
  .then(response => {
    options.value = response.data.data.map(item => ({
      value: item.typeName,
      label: item.typeName,
    }));
  })
  .catch(error => {
    console.error('Error fetching hair types:', error);
  });
  formState.userName=userStore.userInfo.username

})



let debounceTimer;

function debounce(func, delay) {
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
// 在标题改变后执行的函数
async function handleTitleChange() {
    // 处理标题
    await cutwordApi(formState.title).then(res => {
        const data = res.data.data.filter(word => word.length >= 2); // 过滤长度至少为两个字符的词语
        if (data.length > 0) {
            cutWords.value =data;
        }
    });
    // 处理描述
    await cutwordApi(formState.description).then(res => {
        const data = res.data.data.filter(word => word.length >= 2); // 过滤长度至少为两个字符的词语
        if (data.length > 0) {
            cutWords.value = [...cutWords.value, ...data];
        }
    });
        // 去重操作
    cutWords.value = Array.from(new Set(cutWords.value));
}
// 创建防抖函数
const handleTitleChangeDebounced = debounce(handleTitleChange, 1000);
// 当标题改变时触发的函数
function handleTitleChangeWrapper() {
    handleTitleChangeDebounced();
}
const formState = reactive({
  // 标题
  title: '',
  hairType: '',
  imgs:'',
  searchInfo:[],
  type: '分享类',
  description: '',
});
// 发型列表相关
const options = ref([]);
// 提交逻辑
const onSubmit = () => {
  if(!formState.title){
    message.warning("给作品起个名字吧~")
    return
  }
  if(!formState.hairType){
    message.warning("给大家介绍一下这是什么发型吧！")
    return
  }
  if(formState.searchInfo.length==0){
    message.warning("选择关键字，让大家更容易找到你~")
    return
  }
  if(!formState.description){
    message.warning("说点什么吧~")
    return
  }
  formState.imgs=''
  fileList.value.forEach(item=>{
    formState.imgs+=item.url+' '
  })
  formState.userId=userStore.userInfo.id
  formState.userName=userStore.userInfo.username
  formState.shopName='暖风发廊'
  formState.shopId=1
  formState.location='山东'
  formState.searchInfo=formState.searchInfo.join(',')
  formState.gender='男'
  shareStore.uploadShare(formState)
};
// 表单相关
const labelCol = {
  style: {
    width: '20%',
  },
};
const wrapperCol = {
  span: 14,
};
// 图片上传
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function beforeUpload(file){
  const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传jpg/png格式的图片")
  }
}
function uploadImage(file){
  const formData = new FormData();
  formData.append('image', file.file);
  axios.post('https://www.imgtp.com/api/upload', formData)
  .then(response => {
    fileList.value.pop()
    fileList.value.push({
      uid:response.data.data.id,
      name:response.data.data.name,
      url:response.data.data.url,
    })
    formState.imgs+=response.data.data.url+' '
    console.log(fileList.value)
  })
  .catch(error => {
    console.error('Error uploading image:', error);
    // Handle upload error
  });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([
]);
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

</script>

<style lang="scss" scoped>
.uploadBox {
  display: flex;
  justify-content: space-around;
  padding:0 2rem;
  height: 88vh;
  overflow: hidden;
  .uploadForm{
    width: 60%;
    padding: 20px;
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.2);
    z-index: 99;
    height: 100%;
    border-left:15px solid rgb(100,0,0) ;
  }
  .previewContrainer{
    border-right:15px solid rgb(100,0,0) ;
      width: 40%;
      height: 100%;
      padding:  20px 40px;
      background-color: rgb(128, 0, 0);
      h1{
        color: rgb(255, 255, 255);
      }
    }
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #d26262;
}
</style>
