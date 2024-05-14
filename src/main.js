import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from '@/router'
import '@/assets/css/index.css'
import '@/assets/icon/iconfont.css'
import { getAuth } from '@/utils/getAuth'
import MyComponent from '@/components/index'
const app = createApp(App)
app.config.productionTip = false
getAuth()
app.use(Antd)
app.use(router)
app.use(MyComponent)
app.mount('#app')
