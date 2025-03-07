<template>
    <div id="app_vue">
        <!-- 导航栏 -->
        <!-- <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav> -->

        <!-- 渲染页面内容 -->
        <router-view></router-view>

    </div>
</template>

<script setup>
// 这个文件不再需要 export default 和 name 属性，
// 因为 `<script setup>` 会自动处理这些

</script>

<style scoped>

</style>