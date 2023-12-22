<template>
    <div class="child-container">
        <router-view v-slot="{ Component }">
            <transition
                name="child-fade"
                mode="out-in">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup></script>

<style lang="less" scoped>
.child-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
/* 路由切换动画 */
/* fade-transform */
.child-fade-leave-active,
.child-fade-enter-active {
    transition: all 0.5s;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.child-fade-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}
.child-fade-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.child-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
