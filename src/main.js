import { createApp } from 'vue'
// import { DatePicker } from 'ant-design-vue';
import Antd from 'ant-design-vue';
// import './style.css'
import 'ant-design-vue/dist/reset.css';
import '@/assets/css/style.scss';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app=createApp(App)

// 应用antui库
// app.use(DatePicker);
app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')

