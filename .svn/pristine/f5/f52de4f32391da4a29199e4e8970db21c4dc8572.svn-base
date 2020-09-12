<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu ybr-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            :unique-opened="true"
            router
        >
            <template v-for="(item,index) in items">
                <template v-if="item.subs && item.subs.length > 0">
                    <el-submenu :index="item.url || index+''" :key="item.num" class="ybr-submenu">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs && subItem.subs.length > 0"
                                :index="subItem.url"
                                :key="subItem.num"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.url"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <!-- 这里的不等于于1隐藏菜单栏 -->
                            <el-menu-item
                                v-else-if="subItem.ishide !==1"
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
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: []
        };
    },
    computed: {
        onRoutes() {
            localStorage.setItem('menuActive', this.$route.path.replace('/', ''));
            return this.$route.path.replace('/', '');
        }
    },
    methods: {},
    mounted() {
        setTimeout(() => {
            this.items = JSON.parse(localStorage.getItem('menu'));
        }, 500);
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
