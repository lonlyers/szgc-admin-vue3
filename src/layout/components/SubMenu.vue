<template>
    <a-sub-menu :key="menuInfo.path">
        <template #icon> <span :class="menuInfo.meta.icon"></span></template>
        <template #title>{{ menuInfo.meta.title }}</template>
        <template
            v-for="item in menuInfo.children"
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
    </a-sub-menu>
</template>

<script setup>
const props = defineProps({
    menuInfo: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped></style>
