<template>
    <a-layout-header class="header">
        <div class="logo" />
        <a-menu
            theme="dark"
            mode="horizontal"
            v-model:selectedKeys="bindParKey"
            :style="{ lineHeight: '64px' }">
            <a-menu-item
                v-for="headInfo in headerMenu"
                :key="headInfo.path">
                {{ headInfo.meta.title }}
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    selectedParKey: {
        type: Array,
        default: () => []
    },
    headerMenu: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits(['update:selectedParKey'])
const bindParKey = computed({
    get() {
        return props.selectedParKey
    },
    set(v) {
        emits('update:selectedParKey', v)
    }
})
</script>

<style lang="scss" scoped></style>
