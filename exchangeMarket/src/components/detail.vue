<template>
    <div class="detail-container">
      <h1>商品详情</h1>
      
      <div v-if="item">
        <img 
          v-if="item.picture_url" 
          :src="`http://localhost:${config.PORT}/${item.picture_url}`" 
          alt="Item Image" 
          class="item-image"
        />
        <div class="item-info">
          <p><strong>描述：</strong>{{ item.description }}</p>
          <p><strong>价格：</strong>¥{{ item.price }}</p>
          <p><strong>地址：</strong>{{ item.address }}</p>
          <p>
            <strong>状态：</strong>
            <span :class="item.status">{{ item.status === 'available' ? '待售' : '已售' }}</span>
          </p>
        </div>
      </div>
  
      <div v-else class="error-message">无法加载商品详情。</div>
      
      <button @click="goBack">返回列表</button>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { config } from '../config/default'
  
  const route = useRoute();//useRoute 替代 this.$route，用于访问当前路由信息。
  const router = useRouter();//useRouter 替代 this.$router，用于执行导航操作。
  
  // 从 query 中获取数据
  const item = computed(() => {
    const { id, description, price, address, status, picture_url } = route.query;
    return id
      ? { id, description, price, address, status, picture_url }
      : null;
  });
  
  // 返回上一页
  const goBack = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .detail-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .item-image {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }
  .item-info {
    margin-top: 20px;
  }
  .item-info p {
    margin: 10px 0;
  }
  .error-message {
    color: red;
    font-weight: bold;
    text-align: center;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>