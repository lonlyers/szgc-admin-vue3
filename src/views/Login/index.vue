<template>
    <div class="login-container">
        <a-spin size="large" />
        <p>正在登录...</p>
    </div>
</template>

<script setup>
import singleSign from '@/utils/singleSign'
import { useRouter } from 'vue-router'
const router = useRouter()
// 免登录逻辑
if (process.env.NODE_ENV === 'development') {
    singleSign(15036373894).then((val) => {
        router.push({
            path: '/Home'
        })
    })
}
</script>

<style lang="less" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    padding-top: 100px;
    text-align: center;
}
</style>
