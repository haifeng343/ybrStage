<template>
    <div class="container1">
        <!-- 头部 -->
        <div class="header1">
            <div class="header-left">
                <div
                    :class="[showNavId==item.id?'navActive':'','item']"
                    v-for="item in nav"
                    :key="item.id"
                    @click="setShowNav(item.id)"
                >
                    {{item.name}}
                    <span class="temperature">{{item.temperature}}</span>
                </div>
            </div>
            <div class="header-right">
                <p>可存放：</p>
                <div class="status">
                    <img src="../../../assets/img/sampleIcon.png" class="sampleIcon" alt />
                    <span>冻存盒</span>
                </div>
                <div class="headerBtn gray" v-if="!canSend">保存</div>
                <div class="headerBtn" v-else @click="addBox">保存</div>
            </div>
        </div>

        <div class="content">
            <div class="form">
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="液氮罐名称" prop="name">
                                <el-input type="text" v-model="addForm.name" placeholder="请输入液氮罐名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="液氮罐品牌" prop="brand" :status-icon="true">
                                <el-input
                                    type="text"
                                    v-model="addForm.brand"
                                    placeholder="请输入液氮罐品牌"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="液氮罐型号" prop="model" :status-icon="true">
                                <el-input
                                    type="text"
                                    v-model="addForm.model"
                                    placeholder="请输入液氮罐型号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="液氮罐温度" prop="temperatureid">
                                <el-select v-model="addForm.temperature">
                                    <el-option
                                        v-for="item in showTemList"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="保管员" prop="keeperuserid">
                                <el-select
                                    v-model="addForm.keeperuserid"
                                    filterable
                                    placeholder="请选择保管员"
                                >
                                    <el-option
                                        v-for="item in userList"
                                        :key="item.userid"
                                        :label="item.username"
                                        :value="item.userid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="房间" prop="roomid">
                                <el-select v-model="addForm.roomid" filterable placeholder="请选择房间">
                                    <el-option
                                        v-for="item in roomList1"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <!-- 液氮罐主体 -->
            <div class="containerB">
                <div>
                    <el-form
                        :model="addForm"
                        :rules="addFormRules"
                        ref="addFormRef"
                        label-width="90px"
                    >
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <div class="toips">
                                    <p>
                                        架子数*单个架子冻存盒数：
                                        <span>4*10</span>
                                    </p>
                                </div>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="样本盒规格">
                                    <el-select v-model="addForm.samplebox">
                                        <el-option :value="1" label="9*9"></el-option>
                                        <el-option :value="2" label="10*10"></el-option>
                                        <el-option :value="3" label="11*11"></el-option>
                                        <el-option :value="4" label="12*12"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="bx">
                    <div>
                        <img src="../../../assets/img/box4.png" class="bximg" alt />
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
            value1: '',
            canSend: false, //是否可提交
            showNavId: 1, //液氮罐
            showTemperature: '-196℃', //对应温度
            showTemList: ['-196℃'], //温度列表
            nav: [
                //导航栏
                {
                    id: 1,
                    name: '液氮罐',
                    temperature: '-196℃'
                }
            ],
            stateValue: 2, //
            stateList: [
                {
                    id: 2,
                    name: '冻存盒'
                },
                {
                    id: 3,
                    name: '试剂'
                }
            ],
            number: null, //选择的盒子数
            boxShowId: 1, //选中层级
            boxList: [], //盒子个数
            roomList1: [], //房间列表
            userList: [], //用户列表
            addForm: {
                roomid: '', //房间id
                no: '', //液氮罐编号
                name: '', //液氮罐名称
                brand: '', //液氮罐品牌
                model: '', //液氮罐型号
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
                temperature: '-196℃' //温度str
            },
            addFormRules: {
                // roomid: [{ required: true, trigger: 'change', message: '请选择房间' }],
                // keeperuserid: [{ required: true, trigger: 'change', message: '请选择容器保管员' }],
                // no: [{ required: true, trigger: 'blur', message: '请输入液氮罐编号' }],
                // name: [{ required: true, trigger: 'blur', message: '请输入液氮罐名称' }],
                // brand: [{ required: true, trigger: 'blur', message: '请输入液氮罐品牌' }],
                // model: [{ required: true, trigger: 'blur', message: '请输入液氮罐型号' }],
                // levelc_x: [{ required: true, trigger: 'blur', message: '请输入平面布局长' }],
                // levelc_y: [{ required: true, trigger: 'blur', message: '请输入平面布局宽' }],
                // levela: [{ required: true, trigger: 'blur', message: '请输入大层层数' }],
                // levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                // levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                // remark: [{ required: true, trigger: 'blur', message: '请输入容器描述' }]
            },
            kp: ''
        };
    },
    methods: {
        //保存
        sureVal() {},
        // 设置nav选中头部
        setShowNav(e) {},
        // 液氮罐头部
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
        // 新建液氮罐/////////
        addBox() {
            this.$http
                .post('/api/container/savebyliquid_nitrogen', {
                    roomid: this.addForm.roomid,
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
    background: #fff;
    width: 100%;
    height: auto;
    .header1 {
        width: 100%;
        height: 60px;
        display: flex;
        border-bottom: 1px solid #e1e5ef;
        justify-content: space-between;
        box-sizing: border-box;
        align-items: center;
        font-size: 18px;
        padding: 0 24px;
        flex-direction: row;
        margin-bottom: 40px;
        .header-left {
            display: flex;
            height: 100%;
            justify-content: flex-start;
            .item {
                width: 80px;
                height: 100%;
                font-size: 16px;
                color: #161e33;
                margin-right: 56px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
                .temperature {
                    padding: 0 6px;
                    left: 80px;
                    top: 5px;
                    background: #568bfc;
                    border-radius: 8px 8px 8px 0px;
                    position: absolute;
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
                }
            }
            .item:nth-child(5n + 2) {
                .temperature {
                    left: 65px;
                }
            }
            .item:nth-child(5n + 3) {
                .temperature {
                    left: 65px;
                }
            }
            .navActive {
                border-bottom: 4px solid #fa483a;
            }
        }
        .header-right {
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
            font-size: 14px;
            color: #636572;
            align-items: center;
            .status {
                width: 100px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                .sampleIcon {
                    margin-right: 8px;
                }
            }
            .select {
                width: 158px;
                margin: 0 14px;
            }
            .headerBtn {
                width: 86px;
                height: 32px;
                background: #fa483a;
                color: #fff;
                font-size: 14px;
                color: #ffffff;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .gray {
                background: gray;
                color: #fff;
                opacity: 0.5;
            }
        }
    }
    .content {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        background: #fff;
        .containerB {
            width: 820px;
            max-height: 650px;
            padding-bottom: 79px;
            display: flex;
            align-items: center;
            flex-direction: column;
            .bx {
                height: 564px;
                width: 330px;
                position: relative;
                top: 30px;
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
                .bxName {
                    width: 150px;
                    height: 25px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: absolute;
                    box-sizing: border-box;
                    padding-left: 22px;
                    left: 22px;
                    top: 6px;
                    font-size: 14px;
                    color: #ffffff;
                }
                .bxName1 {
                    top: 10px;
                }
                .brand {
                    width: 170px;
                    height: 25px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: absolute;
                    box-sizing: border-box;
                    padding-left: 22px;
                    left: 22px;
                    bottom: 22px;
                    font-size: 16px;
                    color: #ffffff;
                }
                .brand {
                    bottom: 37px;
                }
                .bximg {
                    height: 562px;
                    width: 330px;
                }
                .box1 {
                    position: absolute;
                    top: 50px;
                    left: 25px;
                    height: 424px;
                    width: 276px;
                    overflow-y: scroll;
                    .boxItem {
                        width: 256px;
                        height: 102px;
                        margin: 0 auto 4px;
                        background: #dce6f8;
                        border-radius: 10px;
                        position: relative;
                        cursor: pointer;
                        .boxItemImg {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 0;
                        }
                    }
                    .boxShow {
                        width: 256px;
                        height: 102px;
                        background: #dce6f8;
                        border-radius: 10px;
                        margin: 0 auto 4px;
                        overflow: hidden;
                        position: relative;
                        z-index: 3;
                        .list1 {
                            width: 100%;
                            height: 100%;
                            max-height: 102px;
                            box-sizing: border-box;
                            padding: 5px 10px;
                            display: flex;
                            flex-direction: column;
                            .item {
                                width: 16px;
                                height: 12px;
                                background: #ffffff;
                                border-radius: 2px;
                                margin-bottom: 4px;
                            }
                        }
                    }
                }
                .box2 {
                    position: absolute;
                    top: 47px;
                    left: 45px;
                    width: 257px;
                    height: 435px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    flex: 1;
                    .item {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        background: linear-gradient(0deg, rgba(255, 255, 255, 0.33) 68%, rgba(255, 255, 255, 0) 100%);
                    }
                    .item::after {
                        content: '';
                        width: 100%;
                        height: 12px;
                        opacity: 0.2;
                        position: absolute;
                        background: linear-gradient(0deg, #7c7cb6 0%, #ccd2ee 100%);
                        bottom: 0;
                        left: 0;
                    }
                }
            }
            .bximg1 {
                width: 587px;
                height: 402px;
                margin-top: 100px;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .bxCont {
                    width: 456px;
                    height: 238px;
                    background: #000;
                    box-sizing: border-box;
                    padding: 36px 17px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    position: absolute;
                    bottom: 9px;
                    left: 50%;
                    transform: translateX(-50%);
                    .item {
                        width: 66px;
                        height: 66px;
                        position: relative;
                        margin-right: 5px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        .input2 {
                            width: 56px;
                            height: 20px;
                            border: 1px solid #fa483a;
                            position: absolute;
                            overflow: hidden;
                            top: 5px;
                            left: 50%;
                            transform: translateX(-50%);
                            font-size: 12px;
                        }
                    }
                    .item:nth-child(6n) {
                        margin-right: 0;
                    }
                    .item:nth-child(6n-1) {
                        margin-bottom: 31px;
                    }
                    .item1 {
                        width: 46px;
                        height: 46px;
                        position: relative;
                        margin: 0 7px 15px 0;
                        .input2 {
                            width: 40px;
                            height: 16px;
                            border: 1px solid #fa483a;
                            position: absolute;
                            overflow: hidden;
                            top: 5px;
                            left: 50%;
                            transform: translateX(-50%);
                            font-size: 12px;
                        }
                    }
                    .item1:nth-child(8n) {
                        margin-right: 0;
                    }
                }
                .tips {
                    font-size: 14px;
                    color: #fa483a;
                    text-align: center;
                    margin-top: 24px;
                }
            }
            .toips {
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                color: #646672;
                span {
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>