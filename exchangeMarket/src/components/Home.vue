<template>
    <div class="home-container">

        <nav class="navbar">
        <ul>
          <!-- <li><router-link to="/">Home</router-link></li> -->
          <li>
            <template v-if="user">
                <router-link to="/manageuser">{{user.username}}</router-link>
            </template>
            <template v-else>
                <router-link to="/login">登录</router-link>
            </template>
          </li>
          <li><router-link to="/register">注册</router-link></li>
          <li><router-link to="/itemform">上传商品</router-link></li>
          <li><router-link to="/register" @click.prevent="handleLogout">登出</router-link></li>
        </ul>
      </nav>

      <div class="main-content wrap">
      <item-list></item-list>
      </div>

      <footer>
            <p>© 2024 My Vue App</p>
        </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import ItemList from './ItemList.vue';
  
  const user = ref(JSON.parse(localStorage.getItem('user'))); //有无user

  //登出操作
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    router.push('/'); 
  };
</script>
  
<style scoped>
.home-container {
    width: 100%;
    margin: 0 auto;
}


.navbar {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    background-color: #4CAF50;
}

.navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navbar li {
    margin-right: 20px;
}

.navbar a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

.navbar a:hover {
    text-decoration: underline;
}

.main-content {
    margin-top: 20px;
    text-align: center;
}

.wrap{
    width:70%;
    margin:0 auto;
}

h1 {
    font-size: 2rem;
    color: #333;
}

p {
    font-size: 1rem;
    color: #666;
}


/* //页脚 */
#app_vue {
    min-height: 100vh;
    /* 确保内容区域高度至少是视窗高度 */
    display: flex;
    flex-direction: column;
}

.content {
    flex-grow: 1;
    /* 让内容区域填充剩余的空间 */
}

footer {
    position: flex;
    /* 固定在页面底部 */
    bottom: 0;
    width: 100%;
    /* 宽度占满整个屏幕 */
    text-align: center;
    /* 文本居中 */
    background-color: #42b983;
    /* 背景色 */
    padding: 10px;
    color: white;
}
</style>