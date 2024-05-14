<template>
    <div class="errpage-container">
        <div class="text">该用户暂未配置菜单权限，请联系管理员配置！</div>
    </div>
</template>

<script></script>

<style scoped>
.errpage-container {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/404-d.png');
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
