import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from "@/router/index.js";

const app = createApp(App)

// 引入 element plus icon 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 添加路由组件
app.use(router)

app.mount('#app')
