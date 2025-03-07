<template>
    <div class="register-container">
        <h2>用户 注册</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" required />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required  />
            </div>

            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" v-model="user.phone" />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <!-- new-password：告诉浏览器这是一个新的密码输入框，并且应该避免填充旧的密码记录。它通常用于用户注册或修改密码的表单。 -->                
                <input type="password" id="password" v-model="user.password" required autocomplete="new-password"/>
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" v-model="user.confirmPassword" required autocomplete="new-password"/>
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';

import {config} from '../config/default'
import router from '../router/index'
const user = ref({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
});

const handleSubmit = async () => {
    //判断输入是否合理
    if(!user.value.username || !user.value.email || !user.value.password){
        alert('Please fill in all fields');
        return;
    }
    if (user.value.password !== user.value.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try{
        const response=await axios.post(`http://localhost:${config.PORT}/api/register`,user.value);
        router.push("/");
    }catch(error){
        // console.error('Error during registration:', error);
        alert('registration failed!');
    }
    console.log('Form submitted with:', user.value);
};

</script>


<style scoped>
.register-container {
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