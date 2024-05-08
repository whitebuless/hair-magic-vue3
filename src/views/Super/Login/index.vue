<template>
  <div class="login-container">
    <a-divider class="login-divider">欢迎登录</a-divider>
    <a-form :form="form" @submit="handleSubmit" class="login-form">
      <a-form-item
        name="username"
      >
        <a-input
          v-model:value="username"
          placeholder="用户名"
          prefix-icon="UserOutlined"
        />
      </a-form-item>
      <a-form-item
        name="password"
      >
        <a-input
          v-model:value="password"
          type="password"
          placeholder="密码"
          prefix-icon="LockOutlined"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Input, Button, Divider } from 'ant-design-vue';

const form = ref(null);
const username = ref('');
const password = ref('');

const handleSubmit = () => {
  form.value.validateFields((err, values) => {
    if (!err) {
      // 在这里处理登录逻辑，提交用户名和密码到后端
      console.log('提交的用户名和密码：', values);
    }
  });
};
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-divider {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  width: 300px;
}
</style>
