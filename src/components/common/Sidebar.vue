<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu ybr-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.url" :key="item.num" class="ybr-submenu">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.url" :key="subItem.num">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.url"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.num"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.num">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

        <!-- <div class="sidebar">
            <ul class="ybr-menu">
                <li class="ybr-menu-item active">
                    <div class="ybr-menu-tab">
                        <i class="el-icon-lollipop ybr-menu-icon1"></i>
                        <p>首页</p>
                        <i class="el-icon-arrow-down ybr-menu-down"></i>
                    </div>
                </li>
                <li class="ybr-menu-item">
                    <div class="ybr-menu-tab">
                        <i class="el-icon-lollipop ybr-menu-icon1"></i>
                        <p>首页</p>
                        <i class="el-icon-arrow-down ybr-menu-down"></i>
                    </div>
                </li>
                <li class="ybr-menu-item">
                    <div class="ybr-menu-tab">
                        <i class="el-icon-lollipop ybr-menu-icon1"></i>
                        <p>首页</p>
                        <i class="el-icon-arrow-down ybr-menu-down"></i>
                    </div>
                </li>
            </ul>
        </div>-->
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'iconfont iconshouye',
                    url: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'iconfont iconxitongshezhi',
                    url: '8',
                    title: '系统管理',
                    subs: [
                        {
                            url: 'userInfo',
                            title: '用户管理'
                        },
                        {
                            url: 'role',
                            title: '角色管理'
                        },
                        {
                            url: 'department',
                            title: '组织管理'
                        },
                        {
                            url: 'power',
                            title: '权限管理'
                        }
                    ]
                },
                {
                    icon: 'iconfont iconguanli',
                    url: '9',
                    title: '病人管理',
                    subs: [
                        {
                            url: 'patient',
                            title: '病人列表'
                        }
                    ]
                },
                {
                    icon: 'iconfont iconshituxianshiquanbujiedian',
                    url: '10',
                    title: '仓库管理',
                    subs: [
                        {
                            url: 'patient',
                            title: '材料视图'
                        }
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods: {
        getMenu() {
            this.$http
                .post('/api/menu/getmenulist', {
                    name: '',
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        let tempArr = res.data.result;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    },
    created() {
        // this.getMenu();
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style lang="less" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    overflow-x: hidden;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}

.sidebar {
    width: 200px;
    min-height: calc(100vh - 70px);
    background-color: #323a62;
    color: #a3a6c7;
    border-right: none;
    z-index: 1;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .ybr-menu {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .ybr-menu-item {
            width: 100%;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            font-size: 14px;
            position: relative;
            .ybr-menu-tab {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: row;
                .ybr-menu-icon1 {
                    margin-left: 24px;
                    margin-right: 12px;
                }
                .ybr-menu-down {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
        .ybr-menu-item.active {
            background: #fa493d;
            color: #fff;
        }
        .ybr-menu-item:first-child {
            margin-top: 24px;
        }
    }
}
</style>
