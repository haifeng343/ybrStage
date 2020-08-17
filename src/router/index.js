import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    name: 'table',
                    component: () => import('../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    name: 'editor',
                    component: () => import('../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    name: 'markdown',
                    component: () => import('../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    name: 'upload',
                    component: () => import('../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    name: 'charts',
                    component: () => import('../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    name: 'drag',
                    component: () => import('../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    name: 'dialog',
                    component: () => import('../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    name: 'permission',
                    component: () => import('../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    // 用户管理页面
                    path: '/userInfo',
                    name: 'userInfo',
                    component: () => import('../components/page/userInfo.vue'),
                    meta: { title: '用户管理', permission: false }
                },
                {
                    // 角色管理页面
                    path: '/role',
                    name: 'role',
                    component: () => import('../components/page/role.vue'),
                    meta: { title: '角色管理', permission: false }
                },
                {
                    // 部门管理页面
                    path: '/department',
                    name: 'department',
                    component: () => import('../components/page/department.vue'),
                    meta: { title: '组织管理', permission: false }
                },
                {
                    // 权限管理页面
                    path: '/power',
                    name: 'power',
                    component: () => import('../components/page/power.vue'),
                    meta: { title: '权限管理', permission: false }
                },
                {
                    // 病人列表页面
                    path: '/patient',
                    name: 'patient',
                    component: () => import('../components/page/patient.vue'),
                    meta: { title: '病人管理', permission: false }
                },
                {
                    // 冰箱管理页面
                    path: '/containerList',
                    name: 'containerList',
                    component: () => import('../components/page/containerList.vue'),
                    meta: { title: '冰箱管理', permission: false }
                },
                {
                    path: '/404',
                    name: '404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    name: '403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                },

            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/forget',
            name: 'forget',
            component: () => import('../components/page/forget.vue'),
            meta: { title: '忘记密码' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

// 挂载路由守卫
router.beforeEach((to, from, next) => {
    //to将要访问的页面
    //form从哪个页面过来
    //next是一个函数 表示放行 next('/login) 强制跳转
    if (to.path == '/login') return next();
    // const token = window.sessionStorage.getItem('token');
    // if (!token) return next('/login')
    NProgress.start()
    next();
})
router.afterEach(() => {
    NProgress.done()
})

export default router;