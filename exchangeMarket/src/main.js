import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';  // 引入路由配置

const app = createApp(App);

app.use(router);  // 将路由挂载到 Vue 应用
app.mount('#app');  //app挂在mian.js中的id='app'