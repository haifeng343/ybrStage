import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import '../src/assets/styles/iconfont.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import '../src/assets/css/main.css'
import 'babel-polyfill';
import store from './store/store.js'
import $ from 'jquery'


Vue.directive('has', {
    inserted: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el)
        }
    }
})
// 权限检查方法（且把该方法添加到vue原型中）
Vue.prototype.$_has = function (value) {
    let isExist = false
    // 从浏览器缓存中获取权限数组（该数组在登入成功后拉取用户的权限信息时保存在浏览器的缓存中）
    let list = JSON.parse(localStorage.getItem('menu'));
        let menuActive = localStorage.getItem('menuActive');
    let arr = [];
    for (let item of list) {
        if (item.subs.length > 0) {
            item.subs.filter(item1 => {
                if (item1.url == menuActive) {
                    if (item1.btns.length > 0) {
                        item1.btns.filter(item2 => {
                           return item2
                        }).map(item2=>{
                            arr.push(item2.value)
                        })
                    }
                }
            })
        }
    }

    var buttonpermsStr = arr;

    if (buttonpermsStr === undefined || buttonpermsStr == null) {
        return false
    }
    if (buttonpermsStr.indexOf(value) >= 0) {
        // 若在按钮中定义的权限字段能在后端返回的权限数组中能找到，则该按钮可显示
        isExist = true
    }
    return isExist
}


Vue.config.productionTip = false;
Vue.use(VueI18n);

Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// 指定请求地址
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.responseType = 'json';
axios.defaults.baseURL = 'https://api.mfetv.top';
// 拦截器,保证拥有获取数据的权限
axios.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
})
// 封装全局axios
Vue.prototype.$http = axios;


// http response 拦截器
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    if (error.response.status) {
        switch (error.response.status) {
            case 403:
                router.replace({
                    path: '/403',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;
            case 404:
                router.replace({
                    path: '/404',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;
        }
    }
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
