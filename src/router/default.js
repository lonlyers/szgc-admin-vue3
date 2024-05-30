import MainLayout from '@/layout/index.vue'
import ChildLayout from '@/layout/child.vue'
// 父级路由名字大写跟文件夹的名字保持一致
const route = {
    path: '/home',
    name: 'Home',
    meta: {
        title: '首页',
        icon: 'iconfont icon-telescope'
    },
    component: MainLayout,
    redirect: '/home/index1',
    children: [
        {
            path: 'index1',
            name: '',
            meta: {
                title: '首页1',
                icon: 'iconfont icon-intelligent'
            },
            component: () => import('@/views/Home/index1.vue')
        },
        {
            path: 'index2',
            name: '',
            meta: {
                title: '首页2',
                icon: 'iconfont icon-intelligent'
            },
            component: () => import('@/views/Home/index2.vue')
        },
        {
            path: 'child',
            name: '',
            redirect: '/home/child/index',
            meta: {
                title: '二级菜单',
                icon: 'iconfont icon-intelligent'
            },
            component: ChildLayout,
            children: [
                {
                    path: 'index',
                    name: '',
                    meta: {
                        title: '三级菜单',
                        icon: 'iconfont icon-intelligent'
                    },
                    component: () => import('@/views/Home/HomeChild/child.vue')
                }
            ]
        }
    ]
}

export default route
