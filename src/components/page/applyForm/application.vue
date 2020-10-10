<template>
    <div>
        <!-- <div class="headerTop">
            <div class="headerTop_title">审核管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">转移申请</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">{{ showName }}</div>
        </div> -->
        <!-- 头部nav菜单 -->
        <div class="navList">
            <div :class="[showId == item.id ? 'active' : '', 'navItem']" v-for="item in navList" :key="item.id" @click="setShowId(item)">
                {{ item.name }}
            </div>
        </div>

        <box-1 :showId="showId" v-if="showId==1 || showId==2" />
        <box-2 :showId="showId" v-if="showId==3" />
        <!-- 转移弹窗 -->
        <!-- <el-dialog :close-on-click-modal="false" :title="showName" :visible.sync="addDialogVisible" width="800px" @close="addDialogClosed">
            <div class="dialog">
                <div class="item1">
                    <div class="title">样本盒转移前位置</div>
                    <div class="cont">
                        <div class="m1">
                            <div class="label lms">房间</div>
                            ：
                            <div>301</div>
                        </div>
                        <div class="m1">
                            <div class="label lms">容器</div>
                            ：
                            <div>立式大冰箱</div>
                        </div>
                        <div class="m1">
                            <div class="label lml">设备编号</div>
                            ：
                            <div>BX-004</div>
                        </div>
                        <div class="m1">
                            <div class="label lms">大层</div>
                            ：
                            <div>4</div>
                        </div>
                        <div class="m1">
                            <div class="label lms">小层</div>
                            ：
                            <div>4</div>
                        </div>
                        <div class="m1">
                            <div class="label lml">架子编号</div>
                            ：
                            <div>4</div>
                        </div>
                        <div class="m1">
                            <div class="label">样本盒编号</div>
                            ：
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div class="item1">
                    <div class="title">样本盒转移后位置</div>
                    <div class="cont">
                        <div class="m1">
                            <div class="label lms">房间</div>
                            ：
                            <div>301</div>
                        </div>
                        <div class="m1">
                            <div class="label lms">容器</div>
                            ：
                            <div>立式大冰箱</div>
                        </div>
                        <div class="m1">
                            <div class="label lml">设备编号</div>
                            ：
                            <div>BX-004</div>
                        </div>
                        <div class="m1">
                            <div class="label lms">大层</div>
                            ：
                            <div>4</div>
                        </div>
                        <div class="m1">
                            <div class="label lms">小层</div>
                            ：
                            <div>4</div>
                        </div>
                        <div class="m1">
                            <div class="label lml">架子编号</div>
                            ：
                            <div>4</div>
                        </div>
                        <div class="m1">
                            <div class="label">样本盒编号</div>
                            ：
                            <div>4</div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addSubmitForm('addForm')">确 定</el-button>
                <el-button @click="addDialogClosed">取 消</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>
<script>
import box1 from '../applyForm/box1.vue';
import box2 from '../applyForm/box2.vue';
export default {
    components: {
        box1,
        box2
    },
    data() {
        return {
            showName: '',
            addDialogVisible: false,
            showId: 3, //选择大类 1样本盒转移 2架子转移 3样本转移
             navList: [
                //什么转移
                {
                    id: 1,
                    name: '样本盒转移'
                },
                {
                    id: 2,
                    name: '架子转移'
                },
                {
                    id: 3,
                    name: '样本转移'
                }
            ],
        };
    },
    methods: {
        addDialogClosed() {
            THIS.addDialogVisible = false;
        },
        // 选择了nav菜单
        setShowId(item) {
            this.showId = item.id;
            this.showName = item.name;
        }
    }
};
</script>
<style lang="less" scoped>
 .navList {
        width: 402px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        .navItem {
            font-size: 16px;
            background: #eeeef2;
            border-radius: 8px 8px 0px 0px;
            width: 130px;
            color: #161e33;
            height: 60px;
            text-align: center;
            line-height: 60px;
            position: relative;
            cursor: pointer;
        }
        .active {
            border-radius: 8px 8px 0px 0px;
            position: relative;
            background: #fff;
        }
        .active::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 130px;
            height: 6px;
            background: #fa483a;
            border-radius: 8px 8px 0px 0px;
        }
    }
    .dialog {
    width: 720px;
    height: 268px;
    display: flex;
    justify-content: space-between;
    .item1 {
        width: 300px;
        height: 268px;
        background: #fff8f7;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .title {
            text-align: center;
            line-height: 40px;
            color: #fff;
            height: 40px;
            background: #fa483a;
        }
        .cont {
            box-sizing: border-box;
            padding: 24px 0 0 24px;
            .m1 {
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                line-height: 25px;
                .label {
                    width: 73px;
                }
                .lms {
                    letter-spacing: 12px;
                }
            }
        }
    }
    .item1:nth-child(2) {
        background: #f5fffc;
        .title {
            background: #1ec084;
        }
    }
}
</style>