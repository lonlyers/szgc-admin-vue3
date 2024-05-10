import { createRouter, createWebHashHistory } from 'vue-router'
import defaultRoutes from './default'
import eventEmitter from '@/EventEmitter'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
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
        ...defaultRoutes
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
eventEmitter.on('API:UN_AUTH', () => {
    router.push('/login')
    sessionStorage.clear()
})

export default router
