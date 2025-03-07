<template>
    <button @click="logout">退出登录</button>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router=useRouter();
const logout=()=>{
    localStorage.removeItem('user');
    router.push(`/`);
}

</script>

<style scoped>
button{
    background-color: green;
    color:white;
}
</style>