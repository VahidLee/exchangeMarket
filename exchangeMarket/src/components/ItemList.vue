<template>
    <div class="item-list">
        <h1>二手物品列表</h1>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="items.length === 0" class="no-items">没有找到商品</div>

        <div class="item-contain">
            <div v-for="item in items" :key="item.item_id" @click="goToDetail(item)" class="item">
                <img v-if="item.picture_url" :src="`http://localhost:3011/${item.picture_url}`" alt="Item Image"
                    class="item-image" />
                <div class="item-details">
                    <!-- <h2>{{ item.title }}</h2> -->
                    <p class="label" style="flex-grow:4;">描述</p>
                    <p class="label" style="flex-grow:2;">价格</p>
                    <p class="label" style="flex-grow:2;">地址</p>
                    <p class="label" style="flex-grow:2;">状态</p>
                    <p class="description">{{ item.description }}</p>
                    <p class="price">¥{{ item.price }}</p>
                    <p class="address">{{ item.address }}</p>
                    <p class="status" :class="item.status">{{ item.status === 'available' ? '待售' : '已售' }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useRouter} from 'vue-router'
import axios from 'axios';
import { config } from "../config/default"

// 定义响应式数据
const items = ref([]);
const loading = ref(true);
const error = ref('');
const router=useRouter();//获得路由实例

// 获取商品列表
const fetchItems = async () => {
    try {
        const response = await axios.get(`http://localhost:${config.PORT}/api/items`);
        items.value = response.data.items; // 假设响应数据的结构是 { items: [...] }
    } catch (err) {
        error.value = '加载商品失败！';
    } finally {
        loading.value = false;
    }
};

const goToDetail = (item) => {
    router.push({
        path: `/detail`,
        query: {
            id: item.item_id,
            description: item.description,
            price: item.price,
            address: item.address,
            status: item.status,
            picture_url: item.picture_url,
        }
    });
}

// 在组件挂载后加载数据
onMounted(() => {
    fetchItems();
});
</script>


<style scoped>
.item-list {
    width: 100%;
    margin: 0 auto;
}

.item-contain {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item {
    display: flex;

    width: 45%;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 10px;
    margin: 10px;
    background-color: #f9f9f9;
}

.item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 10px;
    border-radius: 4px;
}

.item-details {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    flex-grow: 1;
}

.item-details h2 {
    flex-basis: 100%;
    margin: 0 0 10px;
}

.item-details p {
    margin: 0;
    /* flex:flex-grow flex-shrink flex-basis 使第三个弹性项目不可增长（0），不可收缩（0），并且初始长度为 200 像素：*/
    flex: 1 1 calc(25% - 15px);
}

.item-details>.label {
    font-size: 13px;
    font-weight: 700;
    color: rgb(138, 138, 151)
}

.item-details .description,
.item-details .address {
    font-size: 14px;
}

.status.available {
    color: green;
}

.status.sold {
    color: red;
}
</style>