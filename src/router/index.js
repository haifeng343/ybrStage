import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'

const originalPush = Router.prototype.push
Router.prototype.replace = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)


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
                    path: '/scanding',
                    name: 'scanding',
                    component: () => import('../components/page/scanding.vue'),
                    meta: { title: '钉钉扫码' }
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
                    component: () => import('../components/page/systemManage/userInfo.vue'),
                    meta: { title: '用户管理', permission: false }
                },
                {
                    // 角色管理页面
                    path: '/role',
                    name: 'role',
                    component: () => import('../components/page/systemManage/role.vue'),
                    meta: { title: '角色管理', permission: false }
                },
                {
                    // 部门管理页面
                    path: '/department',
                    name: 'department',
                    component: () => import('../components/page/systemManage/department.vue'),
                    meta: { title: '组织管理', permission: false }
                },
                {
                    // 权限管理页面
                    path: '/power',
                    name: 'power',
                    component: () => import('../components/page/systemManage/power.vue'),
                    meta: { title: '权限管理', permission: false }
                },
                {
                    // 数据字典页面
                    path: '/dictionary',
                    name: 'dictionary',
                    component: () => import('../components/page/systemManage/dictionary.vue'),
                    meta: { title: '数据字典', permission: false }
                },
                {
                    // 配置流程节点页面
                    path: '/configuration',
                    name: 'configuration',
                    component: () => import('../components/page/systemManage/configuration.vue'),
                    meta: { title: '配置流程节点', permission: false }
                },
                {
                    //流程管理页面
                    path: '/flow',
                    name: 'flow',
                    component: () => import('../components/page/systemManage/flow.vue'),
                    meta: { title: '流程管理', permission: false }
                },
                {
                    // 病人列表页面
                    path: '/patient',
                    name: 'patient',
                    component: () => import('../components/page/sampleSource/patient.vue'),
                    meta: { title: '病人管理', permission: false }
                },
                {
                    // 冰箱管理页面
                    path: '/containerList',
                    name: 'containerList',
                    component: () => import('../components/page/container/containerList.vue'),
                    meta: { title: '冰箱管理', permission: false }
                },
                {
                    // 液氮罐管理页面
                    path: '/tank',
                    name: 'tank',
                    component: () => import('../components/page/container/tank.vue'),
                    meta: { title: '液氮罐管理', permission: false }
                },
                {
                    // 石蜡块柜管理页面
                    path: '/pareffinBlock',
                    name: 'pareffinBlock',
                    component: () => import('../components/page/container/pareffinBlock.vue'),
                    meta: { title: '石蜡块柜管理', permission: false }
                },
                {
                    // 房间管理页面
                    path: '/room',
                    name: 'room',
                    component: () => import('../components/page/container/room.vue'),
                    meta: { title: '房间管理', permission: false }
                },
                {
                    // 冰箱详情页面
                    path: '/iceboxDetail',
                    name: 'iceboxDetail',
                    component: () => import('../components/page/iceboxDetail.vue'),
                    meta: { title: '冰箱详情', permission: false }
                },
                {
                    // 样本列表页面
                    path: '/sample',
                    name: 'sample',
                    component: () => import('../components/page/sample/sample.vue'),
                    meta: { title: '样本列表', permission: false }
                },
                {
                    path: '/sampleDetail',
                    name: '样本位置详情',
                    component: () => import('../components/page/sample/sampleDetail.vue'),
                    meta: { title: '样本位置详情' }
                },
                {
                    path: '/roomDetail',
                    name: '房间详情',
                    component: () => import('../components/page/container/roomDetail.vue'),
                    meta: { title: '房间详情' }
                },
                {
                    // 动物管理页面
                    path: '/animal',
                    name: 'animal',
                    component: () => import('../components/page/sampleSource/animal.vue'),
                    meta: { title: '动物管理', permission: false }
                },
                {
                    // 项目列表页面
                    path: '/projectList',
                    name: 'projectList',
                    component: () => import('../components/page/project/projectList.vue'),
                    meta: { title: '项目列表', permission: false }
                },
                {
                    // 项目类型页面
                    path: '/projectType',
                    name: 'projectType',
                    component: () => import('../components/page/project/projectType.vue'),
                    meta: { title: '项目类型', permission: false }
                },
                {
                    // 病人病理配置
                    path: '/pathology',
                    name: 'pathology',
                    component: () => import('../components/page/systemManage/pathology.vue'),
                    meta: { title: '病人病理配置', permission: false }
                },
                {
                    // 玻片列表页面
                    path: '/slide',
                    name: 'slide',
                    component: () => import('../components/page/sample/slide.vue'),
                    meta: { title: '玻片列表', permission: false }
                },
                {
                    // 石蜡块列表页面
                    path: '/paraffin',
                    name: 'paraffin',
                    component: () => import('../components/page/sample/paraffin.vue'),
                    meta: { title: '石蜡块列表', permission: false }
                },
                {
                    // 样本类型页面
                    path: '/sampleType',
                    name: 'sampleType',
                    component: () => import('../components/page/sample/sampleType.vue'),
                    meta: { title: '样本类型', permission: false }
                },
                {
                    // 回访记录页面
                    path: '/visitedLog',
                    name: 'visitedLog',
                    component: () => import('../components/page/visitedLog.vue'),
                    meta: { title: '回访记录',father:'patient', permission: false }
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
                {
                    path: '/demo',
                    name: 'demo',
                    component: () => import('../components/page/demo.vue'),
                    meta: { title: 'demo' }
                },
                {
                    path: '/addContainer',
                    name: '新建冰箱',
                    component: () => import('../components/page/container/addContainer.vue'),
                    meta: { title: '新建冰箱' }
                },
                {
                    path: '/takeout',
                    name: '实验取出申请',
                    component: () => import('../components/page/takeout.vue'),
                    meta: { title: '实验取出申请' }
                },
                {
                    path: '/returnsample',
                    name: '归还申请',
                    component: () => import('../components/page/returnsample.vue'),
                    meta: { title: '归还申请' }
                },{
                    path: '/delayreturnsample',
                    name: '延期申请',
                    component: () => import('../components/page/delayreturnsample.vue'),
                    meta: { title: '延期申请' }
                },{
                    path: '/overtime',
                    name: '过期销毁',
                    component: () => import('../components/page/overtime.vue'),
                    meta: { title: '过期销毁' }
                },
                {
                    path: '/addTank',
                    name: '新建液氮罐',
                    component: () => import('../components/page/container/addTank.vue'),
                    meta: { title: '新建液氮罐' }
                },
                {
                    path: '/tankDetail',
                    name: '液氮罐详情',
                    component: () => import('../components/page/container/tankDetail.vue'),
                    meta: { title: '液氮罐详情' }
                },
                {
                    path: '/addPare',
                    name: '新建石蜡柜',
                    component: () => import('../components/page/container/addPare.vue'),
                    meta: { title: '新建石蜡柜' }
                },
                {
                    path: '/pareDetail',
                    name: '石蜡柜详情',
                    component: () => import('../components/page/container/pareDetail.vue'),
                    meta: { title: '石蜡柜详情' }
                },
                {
                    path: '/application',
                    name: '转移申请',
                    component: () => import('../components/page/applyForm/application.vue'),
                    meta: { title: '转移申请' }
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
