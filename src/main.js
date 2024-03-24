import { createApp } from 'vue'
// import { DatePicker } from 'ant-design-vue';
import Antd from 'ant-design-vue';
import './style.css'
import 'ant-design-vue/dist/reset.css';

import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'


const pinia = createPinia()
const app=createApp(App)

// 应用antui库
// app.use(DatePicker);
app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')

