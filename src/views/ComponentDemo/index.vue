<template>
    <div class="demo-view">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane
                key="1"
                tab="分页表格组件"
                >Content of Tab Pane 1</a-tab-pane
            >
            <a-tab-pane
                key="2"
                tab="Tab 2"
                force-render
                >Content of Tab Pane 2</a-tab-pane
            >
            <a-tab-pane
                key="3"
                tab="Tab 3"
                >Content of Tab Pane 3</a-tab-pane
            >
        </a-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const activeKey = ref('1')
</script>

<style lang="less" scoped>
.demo-view {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
</style>
