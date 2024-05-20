<template>
    <a-layout-header class="header">
        <div class="logo">数字工程模板系统</div>
        <div class="right-menu">
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
            <a-dropdown>
                <div
                    class="ant-dropdown-link"
                    @click.prevent>
                    <a-avatar
                        :size="40"
                        style="background-color: #fff; color: #f56a00"
                        >USER</a-avatar
                    >
                    <div class="user-name">用户名</div>
                    <DownOutlined style="color: #fff" />
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <div @click="toAuth">权限系统</div>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">退出登录</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { getToken } from '@/utils/tokenInfo'
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
const toAuth = () => {
    let url = 'http://192.168.2.172:48373'

    if (process.env.NODE_ENV === 'production') {
        url = window.location.origin
    }
    window.open(`${url}/drsp-permissions-web/?token=${getToken()}`)
}
</script>

<style lang="less" scoped>
.header {
    background-color: #1c5ee5;
    padding-inline: 33px;
    display: flex;
    justify-content: space-between;
    .logo {
        font-size: 32px;

        color: #ffffff;
    }
    .ant-menu-dark {
        background-color: #1c5ee5;
    }
    .right-menu {
        display: flex;
        align-items: center;
    }
    .ant-dropdown-link {
        display: flex;
        align-items: center;
        margin-left: 22px;
        cursor: pointer;
        .user-name {
            margin-left: 10px;
            margin-right: 10px;
            color: #fff;
        }
    }
}
</style>
