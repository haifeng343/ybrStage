<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">容器管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">石蜡柜管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">石蜡柜详情</div>
        </div>

        <div class="container1">
            <!-- 头部 -->
            <div class="header">
                <el-row :gutter="24">
                    <el-col :span="14">
                        <div class="header-left">
                            <div class="avator">-160o</div>
                            <div class="txtContent">
                                <p class="name">
                                    张三
                                    <span>301</span>
                                </p>
                                <p>石蜡柜编号：YBR001</p>
                                <p>石蜡柜品牌：海尔</p>
                            </div>
                            <div class="txtContent">
                                <p>石蜡柜型号：BX-001</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="header-right">
                            <div class="item">
                                <p class="t1">6</p>
                                <p class="t2">层数</p>
                            </div>
                            <div class="item">
                                <p class="t1">12</p>
                                <p class="t2">列数</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="content">
                <!-- 石蜡柜主体 -->
                <div class="containerB">
                    <div class="bx">
                        <div class="bximg">
                            <img src="../../../assets/img/box3.png" class="img1" alt />
                            <div class="boxCont">
                                <div class="item" v-for="(item, index) in 6" :key="index">
                                    <div v-if="index == 0" class="first">
                                        <div
                                            class="item1"
                                            v-for="(item1, index1) in 12"
                                            :key="index1"
                                            :style="{ width: 341 / 12 + 'px' }"
                                        ></div>
                                    </div>
                                    <img src="../../../assets/img/gui1.png" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 表格数据 -->
                <div class="table">
                    <div class="table-header">
                        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <div class="table-header-left">
                                        <el-col :span="12">
                                            <el-form-item label="层数选择">
                                                <el-select v-model="addForm.levela">
                                                    <el-option
                                                        v-for="(item, index) in 6"
                                                        :key="index"
                                                        :label="item"
                                                        :value="item"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="列数选择">
                                                <el-select v-model="addForm.levelb" @change="changeXiaoceng">
                                                    <el-option
                                                        v-for="(item, index) in 12"
                                                        :key="index"
                                                        :label="item"
                                                        :value="item"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <div class="btn1">重置</div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="table-header-right">
                                        <el-col :span="16">
                                            <el-input v-model="keyword" clearable placeholder="请输入内容"></el-input>
                                        </el-col>
                                        <div class="btn1">搜索</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="table-content">
                        <el-table :data="tableData">
                            <el-table-column :resizable="false" prop="date" label="位置"></el-table-column>
                            <el-table-column :resizable="false" prop="name" label="名称"></el-table-column>
                            <el-table-column :resizable="false" prop="name" label="编号"></el-table-column>
                            <el-table-column :resizable="false" prop="name" label="样本类型"></el-table-column>
                            <el-table-column :resizable="false" prop="name" label="组织类型"></el-table-column>
                            <el-table-column :resizable="false" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="detail(scope.row)">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="table-footer">
                        <div>
                            共计
                            <span>113</span>条记录，当前显示第<span>1/6</span>页
                        </div>
                        <!-- 分页 -->
                        <el-pagination layout="prev, pager, next, jumper" :total="totalCount"> </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            totalCount: 100,
            pageSize: 10,
            pageIndex: 1,

            keyword: '',
            canSend: false, //是否可提交
            showNavId: 1, //液氮罐
            showTemperature: '室温', //对应温度
            showTemList: ['室温'], //温度列表
            nav: [
                //导航栏
                {
                    id: 1,
                    name: '石蜡柜',
                    temperature: '室温'
                }
            ],
            number: null, //选择的盒子数
            boxShowId: 1, //选中层级
            boxList: [], //盒子个数
            roomList1: [], //房间列表
            userList: [], //用户列表
            addForm: {
                roomid: '', //房间id
                no: '', //石蜡柜编号
                name: '', //石蜡柜名称
                brand: '', //石蜡柜品牌
                model: '', //石蜡柜型号
                levelc_x: null, //小层抽屉数
                levelc_y: null, //抽屉深度
                levela: '', //大层层数
                levelb: '', //小层层数
                dongcunhe: '', //冻存盒
                samplebox: 1, //样本盒规格 1.9x9   2.10x10  3.11x11     4.12x12
                keeperuserid: '', //容器保管员id
                keeperuser: '', //容器保管员str
                remark: '', //容器描述
                dataids: [], //可放入材料id
                datas: '', //可放入材料str
                temperatureid: 1, //温度id
                temperature: '室温' //温度str
            },
            addFormRules: {
                // roomid: [{ required: true, trigger: 'change', message: '请选择房间' }],
                // keeperuserid: [{ required: true, trigger: 'change', message: '请选择容器保管员' }],
                // no: [{ required: true, trigger: 'blur', message: '请输入石蜡柜编号' }],
                // name: [{ required: true, trigger: 'blur', message: '请输入石蜡柜名称' }],
                // brand: [{ required: true, trigger: 'blur', message: '请输入石蜡柜品牌' }],
                // model: [{ required: true, trigger: 'blur', message: '请输入石蜡柜型号' }],
                // levelc_x: [{ required: true, trigger: 'blur', message: '请输入平面布局长' }],
                // levelc_y: [{ required: true, trigger: 'blur', message: '请输入平面布局宽' }],
                // levela: [{ required: true, trigger: 'blur', message: '请输入大层层数' }],
                // levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                // levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                // remark: [{ required: true, trigger: 'blur', message: '请输入容器描述' }]
            },
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
        };
    },
    methods: {
        // 监听 pagesize 改变事件
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData(this.pageIndex);
        },
        // 监听页码值改变的事件
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getData(val);
        },
        //保存
        sureVal() {},
        // 设置nav选中头部
        setShowNav(e) {},
        // 石蜡柜头部
        setHeard(e) {
            this.showHeadId = e;
        },
        // 获取房间列表
        getRoomList() {
            this.$http
                .post('/api/container/getlistbyroom', {
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    let tempArr = [];
                    tempArr.push({
                        id: 0,
                        name: '全部'
                    });
                    this.roomList = tempArr.concat(res.data.result.pageData);
                    this.roomList1 = res.data.result.pageData;
                });
        },
        // 获取用户列表
        getUserList() {
            this.$http
                .post('/api/user/getuserinfo', {
                    search: '',
                    pageIndex: 1,
                    pageSize: 10000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.userList = res.data.result.pageData;
                });
        },
        // 切换小层
        changeXiaoceng(e) {
            this.boxShowId = 1;
            this.boxList = e * this.addForm.levelc_x;
        },
        // 新建石蜡柜
        addBox() {
            this.$http
                .post('/api/container/savebyfridge', {
                    roomid: this.addForm.roomid,
                    no: '',
                    name: this.addForm.name,
                    brand: this.addForm.brand,
                    model: this.addForm.model,
                    levelc_x: parseInt(this.addForm.levelc_x),
                    levelc_y: parseInt(this.addForm.levelc_y),
                    levela: parseInt(this.addForm.levela),
                    levelb: parseInt(this.addForm.levelb),
                    samplebox: this.addForm.samplebox,
                    keeperuserid: this.addForm.keeperuserid,
                    keeperuser: this.addForm.keeperuser,
                    remark: this.addForm.remark,
                    dataids: this.addForm.dataids ? this.addForm.dataids : null,
                    datas: this.addForm.datas,
                    temperatureid: this.addForm.temperatureid ? this.addForm.temperatureid : 0,
                    temperature: this.addForm.temperature
                })
                .then((res) => {
                    if (res.data.success) {
                        this.addDialogVisible = false;
                        this.getData(this.pageIndex);
                        this.$message.success(res.data.message);
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    },
    mounted() {
        this.getRoomList();
        this.getUserList();
    }
};
</script>
<style scoped lang="less">
.container1 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    .header {
        width: 100%;
        height: 160px;
        background: #ffffff;
        box-sizing: border-box;
        padding: 45px;
        .header-left {
            height: 112px;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            .avator {
                width: 68px;
                height: 68px;
                margin-top: -20px;
                background: #568cfc;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                color: #ffffff;
                margin-right: 28px;
            }
            .txtContent {
                height: 82%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                font-size: 16px;
                color: #646672;
                margin-right: 210px;
                .name {
                    font-size: 24px;
                    color: #161f34;
                    display: flex;
                    align-items: center;
                    span {
                        padding: 1px 10px;
                        background: #fa483a;
                        border-radius: 4px;
                        font-size: 16px;
                        margin-left: 16px;
                        color: #ffffff;
                    }
                }
                p {
                    margin-top: 16px;
                }
            }
        }
        .header-right {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            .item {
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: 16px;
                color: #646672;
                margin-left: 118px;
                .t1 {
                    font-size: 36px;
                    font-weight: bold;
                    color: #568cfc;
                    margin-bottom: 16px;
                }
            }
            .item:last-child {
                margin-right: 83px;
            }
        }
    }
    .content {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        background: #f3f4f8;
        .containerB {
            width: 562px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-right: 20px;
            background: #fff;
            .bx {
                position: relative;
                margin-top: 30px;
                .showTemperature {
                    width: 62px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    color: #16277a;
                    position: absolute;
                    right: 41px;
                    top: 9px;
                }
                .showTemperature1 {
                    width: 56px;
                    top: 13px;
                    right: 28px;
                    color: #fff;
                }
                .bximg {
                    width: 424px;
                    height: 620px;
                    position: relative;
                    .img1 {
                        width: 100%;
                        height: 100%;
                    }
                    .boxCont {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        padding: 25px 23px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        .item {
                            width: 377px;
                            height: 89px;
                            margin-bottom: 8px;
                            box-sizing: border-box;
                            padding: 10px 12px;
                            position: relative;
                            img {
                                width: 353px;
                                height: 68px;
                            }
                            .first {
                                position: absolute;
                                width: 353px;
                                height: 68px;
                                background: #fff;
                                top: 10px;
                                left: 12px;
                                box-sizing: border-box;
                                padding: 3px 6px;
                                display: flex;
                                align-items: center;
                                flex-direction: row;
                                .item1 {
                                    width: 22px;
                                    height: 54px;
                                    background: #ffffff;
                                    border: 1px solid #d9d9d9;
                                    border-radius: 4px;
                                    margin-right: 4px;
                                }
                                .item1:last-child {
                                    margin-right: 0;
                                }
                            }
                        }
                        .item:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
        .table {
            width: 1048px;
            height: 694px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 40px 24px;
            position: relative;
            .table-header {
                .table-header-left {
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: row;
                }
                .table-header-right {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    .btn1 {
                        margin-left: -15px;
                    }
                }
                .btn1 {
                    width: 68px;
                    height: 32px;
                    background: #f94739;
                    border-radius: 4px;
                    font-size: 15px;
                    color: #ffffff;
                    line-height: 32px;
                    text-align: center;
                    z-index: 1;
                }
            }
            .table-footer {
                width: 1000px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
                position: absolute;
                bottom: 40px;
                left: 24px;
                font-size: 15px;
                span{
                    color: #568BFC;
                }
            }
        }
    }
}
</style>
<style>
.container1 .header {
    margin-bottom: 20px;
}
</style>