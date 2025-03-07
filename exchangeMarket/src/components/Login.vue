<template>
    <div class="login-container">
        <h2>用户 登录</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" required />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" required autocomplete="current-password" />
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { config } from '../config/default';
import router from '../router/index';

const user = ref({
    username: '',
    password: '',
});

const handleLogin = async () => {
    // 判断输入是否合理
    if (!user.value.username || !user.value.password) {
        alert('Please fill in all fields');
        return;
    }

    // 提交表单数据
    try {
        const response = await axios.post( `http://localhost:${config.PORT}/api/login`,user.value);
        console.log("服务器响应的数据:",response.data.user); // 打印
        if (response.data.code === 200) {
            localStorage.setItem('user',JSON.stringify(response.data.user));
            router.push('/');
        } else {
            alert('Login failed: ' + response.data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed!');
    }
};
</script>

<style scoped>
.login-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>