import { createRouter, createWebHistory } from 'vue-router';

import {config} from '../config/default';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue'; // 假设有一个 Login 页面
import About from '../components/About.vue'; // 假设有一个 Login 页面
import Register from '../components/Register.vue'; // 假设有一个 Register 页面
import ItemForm from '../components/ItemForm.vue';
import ItemList from '../components/ItemList.vue';
import Detail from '../components/detail.vue';
import ManageUser from '../components/manageuser.vue';
// import Logout from '../components/Logout.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/itemform', component: ItemForm },
    { path: '/itemlist', component: ItemList },
    { path: '/about', component: About },
    { path: '/detail', component: Detail },//动态路由
    { path: '/manageuser', component: ManageUser },

    // { path: '/logout', redirect: '/' }, // 注销后重定向到登录页面
];

const router = createRouter({
  history: createWebHistory(config.base),
  routes,
});

export default router;//默认导出，不用{}