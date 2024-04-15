<template>
  <div class="uploadBox">
    <div class="uploadForm">
      <a-form :model="formState" 
      :label-col="labelCol" 
      :wrapper-col="wrapperCol">
      <a-form-item label="分享标题" required>
        <a-input v-model:value="formState.name" />
      </a-form-item>
      
      <a-upload
        v-model:file-list="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined />
          <div style="margin-top: 5px">点击上传</div>
        </div>
      </a-upload>
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>

      <a-form-item label="标签">
        <a-checkbox-group v-model:value="formState.type">
          <a-checkbox value="1" name="type">Online</a-checkbox>
          <a-checkbox value="2" name="type">Promotion</a-checkbox>
          <a-checkbox value="3" name="type">Offline</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="类别">
        <a-radio-group v-model:value="formState.resource">
          <a-radio value="1">推荐类</a-radio>
          <a-radio value="2">生活类</a-radio>
          <a-radio value="3">其他</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="说点什么吧~">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">分享</a-button>
        <a-button style="margin-left: 10px">保存并退出</a-button>
      </a-form-item>
    </a-form>
    </div>
    <div class="foresee">

    </div>
  </div>
</template>
<script setup>
import { reactive, toRaw } from 'vue';
import { ref } from 'vue';
const formState = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};
const labelCol = {
  style: {
    width: '150px',
  },
};
const wrapperCol = {
  span: 14,
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-xxx',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error',
  },
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
  .uploadBox{
    flex: 3;
    position: absolute;
    width: 60%;
  }
  .foresee{
    position: absolute;
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