<template>
  <div class="uploadBox">
    <div class="uploadForm">
      <a-form :model="formState" 
      :label-col="labelCol" 
      style="width: 800px;"
      :wrapper-col="wrapperCol">
      <a-form-item label="分享标题" required>
        <a-input 
        v-model:value="formState.title"
        placeholder="输入分享标题"
         />
      </a-form-item>
      <a-form-item label="发型" required>
        <a-select
          v-model:value="formState.hairType"
          show-search
          placeholder="选择发型标签"
          style="width: 100%"
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
          <a-checkbox value="1" name="type">Online</a-checkbox>
          <a-checkbox value="2" name="type">Promotion</a-checkbox>
          <a-checkbox value="3" name="type">Offline</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="类别">
        <a-radio-group v-model:value="formState.type">
          <a-radio value="1">推荐类</a-radio>
          <a-radio value="2">生活类</a-radio>
          <a-radio value="3">其他</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="说点什么吧~">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">分享</a-button>
        <a-button style="margin-left: 10px">保存并退出</a-button>
      </a-form-item>
    </a-form>
    </div>
    <div class="foresee">
      <img src="https://img2.imgtp.com/2024/04/22/jZ19exPb.jpg" 
      alt=""
      style='height: 90%;'>
    </div>
  </div>
</template>
<script setup>
import { reactive, toRaw, ref, onMounted } from 'vue';
import axios from 'axios';
import { useShareStore } from '../../stores/share';
import { useUserStore } from '../../stores/user';
const shareStore=useShareStore()
const userStore=useUserStore()

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

})


const formState = reactive({
  // 标题
  title: '',
  hairType: '',
  imgs:'',
  searchInfo:[],
  type: '',
  description: '',
});
// 发型列表相关
const options = ref([]);
// 提交逻辑
const onSubmit = () => {
  formState.userId=userStore.userInfo.id
  formState.userName=userStore.userInfo.userName
  formState.shopName='暖风发廊'
  formState.shopId=1
  formState.location='山东'
  formState.searchInfo=formState.searchInfo.join(' ')
  formState.gender='男'
  console.log('submit!', toRaw(formState));
  shareStore.uploadShare(formState)
};
// 表单相关
const labelCol = {
  style: {
    width: '150px',
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
    alert("只能上传jpg/png格式的图片")
  }
}
function uploadImage(file){
  const formData = new FormData();
  formData.append('image', file.file);
  axios.post('https://www.imgtp.com/api/upload', formData)
  .then(response => {
    console.log('Upload response:', response.data);
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
.uploadBox{
  display: flex;
  padding: 1rem 2rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  height: auto;
  .uploadBox{
    flex: 3;
    position: absolute;
    width: 60%;
  }
  .foresee{
    position: absolute;
    top: 0;
    background-color: rgb(89, 0, 0);
    width: 40%;
    height: 600px;
    right: 40px;
  }
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #d26262;
}
</style>