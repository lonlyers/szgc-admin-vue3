import { createRouter, createWebHashHistory } from 'vue-router'
import defaultRoutes from './default'
import eventEmitter from '@/EventEmitter'
import { filterRouter } from '@/utils/getAuth'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
            hidden: true
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '登录'
            },
            component: () => import('@/views/Login/index.vue'),
            hidden: true
        },
        {
            path: '/notMenu',
            name: 'NotMenu',
            meta: {
                title: '无权限'
            },
            component: () => import('@/views/NotMenu/index.vue'),
            hidden: true
        },
        {
            path: '/notAuth',
            name: 'NotAuth',
            meta: {
                title: '权限过期'
            },
            component: () => import('@/views/NotAuth/index.vue'),
            hidden: true
        },
        { path: '/:pathMatch(.*)', component: () => import('@/views/NotFound/index.vue') }
    ] // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('userInfo') && to.path !== '/login') {
        next({
            path: '/login'
        })
        return
    }

    next()
})

export let authRoutes = [...defaultRoutes]
eventEmitter.on('MENU:PERMISSIONS', (permissions) => {
    const permissionsList = permissions.split(',')
    authRoutes = filterRouter(defaultRoutes, permissionsList)
    if (authRoutes.length) {
        router.addRoute(...authRoutes)
    }
})
eventEmitter.on('LOGIN:SUCCESS', () => {
    if (authRoutes.length) {
        router.push('/')
    } else {
        router.push('/notMenu')
    }
})

eventEmitter.on('API:UN_AUTH', () => {
    router.push('/notAuth')
})

export default router
