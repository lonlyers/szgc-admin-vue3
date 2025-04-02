<template>
    <div class="login-container">
        <a-spin size="large" />
        <p>正在登录...</p>
    </div>
</template>

<script setup>
import singleSign from '@/utils/singleSign'

import { getAuth } from '@/utils/getAuth'
import eventEmitter from '@/EventEmitter'
// 免登录逻辑

singleSign(15036373894).then((val) => {
    getAuth()
    eventEmitter.emit('LOGIN:SUCCESS')
})
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
