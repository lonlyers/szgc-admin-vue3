<template>
    <div class="errpage-container">
        <div class="text">
            登录信息已过期，请重新登录！
            <div>将在{{ count }}s后跳转到浙江省水平台</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// 倒计时
let count = ref(10)
let timer = setInterval(() => {
    count.value--
    if (count.value === 0) {
        clearInterval(timer)
        // 跳转到登录页
        sessionStorage.clear()
        window.location.href = 'https://sgpt.zjwater.com/'
    }
}, 1000)
</script>

<style scoped>
.errpage-container {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/401-d.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1104px 715px;
    position: relative;
    .text {
        color: #1285e3;
        font-size: 30px;
        font-weight: bold;
        position: absolute;
        text-align: center;
        width: 100%;
        bottom: 140px;
    }
}
</style>
