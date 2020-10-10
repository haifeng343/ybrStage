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
                    <span>样本</span>
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
                            <el-form-item label="石蜡柜名称" prop="name">
                                <el-input type="text" v-model="addForm.name" placeholder="请输入石蜡柜名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="石蜡柜品牌" prop="brand" :status-icon="true">
                                <el-input
                                    type="text"
                                    v-model="addForm.brand"
                                    placeholder="请输入石蜡柜品牌"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="石蜡柜型号" prop="model" :status-icon="true">
                                <el-input
                                    type="text"
                                    v-model="addForm.model"
                                    placeholder="请输入石蜡柜型号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="石蜡柜温度" prop="temperatureid">
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
            <!-- 冰箱主体 -->
            <div class="containerB">
                <div>
                    <el-form
                        :model="addForm"
                        :rules="addFormRules"
                        ref="addFormRef"
                        label-width="90px"
                    >
                        <el-row :gutter="24">
                            <el-col :span="11">
                                <el-form-item label="大 层 数">
                                    <el-select v-model="addForm.levela">
                                        <el-option
                                            v-for="(item,index) in 6"
                                            :key="index"
                                            :label="item"
                                            :value="item"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="2">
                                <el-form-item label="列   数">
                                    <el-select
                                        v-model="addForm.levelb"
                                        :disabled="!addForm.levela"
                                        @change="changeXiaoceng"
                                    >
                                        <el-option
                                            v-for="(item,index) in 12"
                                            :key="index"
                                            :label="item"
                                            :value="item"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="bx">
                    <div class="bximg">
                        <img src="../../../assets/img/box3.png" class="img1" alt />
                        <div class="boxCont">
                            <div class="item" v-for="(item,index) in addForm.levela" :key="index">
                                <div v-if="index==0 && addForm.levelb" class="first">
                                  <div class="item1" v-for="(item1,index1) in addForm.levelb" :key="index1" :style="{width:(341/addForm.levelb)+'px'}"></div>
                                </div>
                                <img src="../../../assets/img/gui1.png" alt />
                            </div>
                        </div>
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
                no: '', //冰箱编号
                name: '', //冰箱名称
                brand: '', //冰箱品牌
                model: '', //冰箱型号
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
                // no: [{ required: true, trigger: 'blur', message: '请输入冰箱编号' }],
                // name: [{ required: true, trigger: 'blur', message: '请输入冰箱名称' }],
                // brand: [{ required: true, trigger: 'blur', message: '请输入冰箱品牌' }],
                // model: [{ required: true, trigger: 'blur', message: '请输入冰箱型号' }],
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
        // 冰箱头部
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
        // 新建冰箱
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
                    width: 32px;
                    border-radius: 8px 8px 8px 0px;
                    position: absolute;
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
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
                padding-bottom: 200px;
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
                                .item1:last-child{
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
    }
}
</style>