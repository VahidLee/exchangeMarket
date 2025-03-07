<template>
    <div class="item-form-container">
        <h2>发布二手物品</h2>

        <!-- 二手物品表单 -->
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">物品标题：</label>
                <input type="text" id="title" v-model="item.title" required />
            </div>

            <table class="item-details-table">
                <tbody>
                    <tr>
                        <td>
                            <label for="description">物品描述：</label>
                        </td>
                        <td>
                            <textarea id="description" v-model="item.description" required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="address">商品地址：</label>
                        </td>
                        <td>
                            <textarea id="address" v-model="item.address" required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="price">价格：</label>
                        </td>
                        <td>
                            <input type="number" id="price" v-model="item.price" required min="0" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="category">物品类别：</label>
                        </td>
                        <td>
                            <select v-model="item.category_id" required>
                                <option value="">请选择类别</option>
                                <option value="1">电子产品</option>
                                <option value="2">家具</option>
                                <option value="3">服装</option>
                                <option value="4">书籍</option>
                                <option value="5">其他</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="form-group">
                <label for="image">上传图片：</label>
                <input type="file" id="image" @change="handleImageUpload" name="image" />
                <p v-if="imagePreview">预览图：<img :src="imagePreview" alt="Image Preview" width="100" /></p>
            </div>

            <button type="submit">发布物品</button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { config } from '../config/default';


// 物品数据  //user_id, title,picture_url,description,address,price,category_id
const item = ref({
    title: '',
    description: '',
    price: 0,
    category_id: '',
    address:'',
    image: null,
});

// 物品图片预览
const imagePreview = ref(null);

// 处理图片上传
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        item.value.image = file;
        const reader = new FileReader();
        reader.onload = () => {
            imagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

// 提交表单
const handleSubmit = async () => {
    try {
        // 创建表单数据对象
        const formData = new FormData();

        let user=JSON.parse(localStorage.getItem('user'));
        if(user&&user.user_id){
            formData.append('user_id',user.user_id);
        }else{
            console.error('用户未登录！');
        }

        formData.append('title', item.value.title);
        formData.append('description', item.value.description);
        formData.append('address', item.value.address);
        formData.append('price', item.value.price);
        formData.append('category_id', item.value.category_id);

        if (item.value.image) {
            formData.append('image', item.value.image);
        }

        //输出formData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        // 发送 POST 请求到后台
        const response = await axios.post(`http://localhost:${config.PORT}/api/items`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // 显示成功提示
        alert('物品发布成功！');
        console.log(response.data);
    } catch (error) {
        console.error('发布物品时出错:', error);
        alert('发布失败，请稍后再试。');
    }
};
</script>

<style scoped>
.item-form-container {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
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

input,
select,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    resize: vertical;
}

.item-details-table {
    width: 100%;
    margin-bottom: 15px;
    border-collapse: collapse;
}

.item-details-table td {
    padding: 10px;
    vertical-align: top;
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

img {
    margin-top: 10px;
    border-radius: 4px;
}
</style>