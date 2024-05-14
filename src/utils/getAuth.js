import eventEmitter from '@/EventEmitter'

export const getAuth = () => {
    // 获取用户信息
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // 判断用户是否登录
    if (userInfo) {
        const { permissions } = userInfo

        eventEmitter.emit('MENU:PERMISSIONS', permissions)
    }

    // 触发用户登录过期事件
}

export const filterRouter = (routes, permissions) => {
    const filterRoutes = routes.filter((route) => {
        if (route.children) {
            route.children = filterRouter(route.children, permissions)
        }
        if (route.meta && route.meta.key) {
            return permissions.includes(route.meta.key)
        } else {
            return true
        }
    })

    return filterRoutes
}
