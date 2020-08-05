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
                    <el-submenu :index="item.index" :key="item.index" class="ybr-submenu">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
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
        </div> -->
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
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格'
                },
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        // {
                        //     index: 'form',
                        //     title: '基本表单'
                        // },
                        // {
                        //     index: '3-2',
                        //     title: '三级菜单',
                        //     subs: [
                        //         {
                        //             index: 'editor',
                        //             title: '富文本编辑器'
                        //         },
                        //         {
                        //             index: 'markdown',
                        //             title: 'markdown编辑器'
                        //         }
                        //     ]
                        // },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
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
            .ybr-menu-tab{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: row;
                .ybr-menu-icon1{
                    margin-left: 24px;
                    margin-right: 12px;
                }
                .ybr-menu-down{
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
        .ybr-menu-item.active{
            background: #fa493d;
            color: #fff;
        }
        .ybr-menu-item:first-child{
            margin-top: 24px;
        }
    }
}
</style>
