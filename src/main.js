import { createApp } from 'vue'
import { DatePicker } from 'ant-design-vue';
import './style.css'
import router from './router'
import App from './App.vue'

const app=createApp(App)

// 应用antui库
app.use(DatePicker);
app.use(router)
app.mount('#app')

