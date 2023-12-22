<template>
    <a-layout-sider
        width="200"
        style="background: #fff">
        <a-menu
            mode="inline"
            v-model:selectedKeys="bindCldKey"
            v-model:openKeys="bindOpenKeys"
            :style="{ height: '100%', borderRight: 0 }">
            <template
                v-for="item in sildbarMenu"
                :key="item.path">
                <template v-if="!item.children">
                    <a-menu-item :key="item.path">
                        <template #icon>
                            <span :class="item.meta.icon"></span>
                        </template>
                        {{ item.meta.title }}
                    </a-menu-item>
                </template>
                <template v-else>
                    <sub-menu
                        :menu-info="item"
                        :key="item.path" />
                </template>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script setup>
import SubMenu from './SubMenu.vue'
import { computed } from 'vue'
const props = defineProps({
    selectedCldKey: {
        type: Array,
        default: () => []
    },
    openKeys: {
        type: Array,
        default: () => []
    },
    sildbarMenu: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits(['update:selectedCldKey', 'update:openKeys'])
const bindCldKey = computed({
    get() {
        return props.selectedCldKey
    },
    set(v) {
        emits('update:selectedCldKey', v)
    }
})
const bindOpenKeys = computed({
    get() {
        return props.openKeys
    },
    set(v) {
        emits('update:openKeys', v)
    }
})
</script>

<style lang="less" scoped></style>
