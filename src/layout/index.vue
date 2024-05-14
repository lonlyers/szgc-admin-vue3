<template>
    <a-layout class="layout-container">
        <HeadMenu
            v-model:selectedParKey="selectedParKey"
            :headerMenu="headerMenu" />
        <a-layout>
            <SiderMenu
                v-model:selectedCldKey="selectedCldKey"
                v-model:openKeys="openKeys"
                :sildbarMenu="sildbarMenu" />
            <div class="component-box">
                <router-view v-slot="{ Component, route }">
                    <transition
                        name="fade"
                        mode="out-in"
                        v-if="!route.meta.keepAlive">
                        <component
                            :is="Component"
                            :key="route.name" />
                    </transition>
                    <transition
                        name="fade"
                        mode="out-in"
                        v-if="route.meta.keepAlive">
                        <keep-alive>
                            <component
                                :is="Component"
                                :key="route.name" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref, watch } from 'vue'

import HeadMenu from './components/HeadMenu.vue'
import SiderMenu from './components/SiderMenu.vue'
import { authRoutes } from '@/router/index'
import { cloneDeep } from 'lodash'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const deepWithPath = (routes, parentPath) => {
    return routes.map((el) => {
        if (el.children) {
            el.children = deepWithPath(el.children, parentPath + '/' + el.path)
        }
        return {
            path: parentPath + '/' + el.path,
            meta: el.meta,
            redirect: el.redirect,
            children: el.children
        }
    })
}
const useMenu = (routes) => {
    const cloneRoutes = cloneDeep(routes)
    const selectedParKey = ref()
    const selectedCldKey = ref()
    const openKeys = ref([])
    const headerMenu = cloneRoutes.map((el) => {
        return {
            path: el.path,
            meta: el.meta,
            redirect: el.redirect
        }
    })
    selectedParKey.value = [headerMenu[0].path]
    const sildbarMenu = ref()
    watch(
        selectedParKey,
        (val) => {
            const curRouter = cloneRoutes.find((el) => {
                return el.path === val[0]
            })
            if (curRouter.children) {
                const filterMenu = curRouter.children.filter((el) => !el.hidden)
                sildbarMenu.value = deepWithPath(filterMenu, val[0])
            }
        },
        {
            immediate: true
        }
    )
    selectedCldKey.value = [route.path]
    watch(
        selectedCldKey,
        (val) => {
            router.push(val[0])
        },
        {
            immediate: true
        }
    )

    return {
        headerMenu,
        selectedParKey,
        sildbarMenu,
        selectedCldKey
    }
}
const { headerMenu, selectedParKey, sildbarMenu, selectedCldKey, openKeys } = useMenu(authRoutes)
</script>
<style lang="less" scoped>
.layout-container {
    height: 100%;
}
.component-box {
    width: 100%;
    height: 100%;
    padding: 24px;
    overflow: hidden;
    position: relative;
}

/* 路由切换动画 */
/* fade-transform */
.fade-leave-active,
.fade-enter-active {
    transition: all 0.5s;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.site-layout-background {
    background: #fff;
}
</style>
