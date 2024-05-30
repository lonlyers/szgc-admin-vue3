import MainLayout from '@/layout/index.vue'

// 父级路由名字大写跟文件夹的名字保持一致
const route = {
    path: '/componentDemo',
    name: 'ComponentDemo',
    meta: {
        title: '组件演示',
        icon: 'iconfont icon-telescope'
    },
    component: MainLayout,
    redirect: '/componentDemo/index',
    children: [
        {
            path: 'index',
            name: '',
            meta: {
                title: '组件演示1',
                icon: 'iconfont icon-intelligent'
            },
            component: () => import('@/views/ComponentDemo/index.vue'),
            hidden: true
        }
    ]
}

export default route
