<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">容器管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">冰箱管理</div>
        </div>
        <div class="middle">
            <!-- <div class="content_btn success" @click="add">
                <img src="../../../assets/img/add1.png" alt />
                <p>新增冰箱</p>
            </div> -->
            <div class="roomList">
                <div
                    :class="['roomItem', item.id == roomId ? 'active' : '']"
                    v-for="item in roomList"
                    :key="item.id"
                    @click="changeRoom(item.id)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
        <!-- 头部搜索条件 -->
        <div class="btnContent">
            <div class="btnContentBottom">
                <div class="btnSelect">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in allList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
                <div class="searchForm">
                    <el-input
                        class="searchFormInput"
                        placeholder="输入搜索条件"
                        v-model="keyword"
                        clearable
                        @keydown.native.enter="getData(1)"
                    ></el-input>
                    <div class="searchFormBtn" @click="getData(1)">搜索</div>
                </div>
            </div>
        </div>

        <!-- 主体内容 -->
        <div class="container1">
            <div class="item" v-for="item in tableData" :key="item.containerid">
                <div class="item1 kk">
                    <div class="itemTop">
                        <img src="../../../assets/img/icebox.png" alt />
                    </div>
                    <div class="itemBot1">
                        <p>{{ item.name }}</p>
                        <div class="right">
                            <p>使用量：96%</p>
                            <div class="progress">
                                <div class="number"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item2 kk">
                    <div class="itemTop2">
                        <div class="start">
                            <img src="../../../assets/img/tag.png" class="img1" alt />
                            <div class="txt">
                                冰箱编号：
                                <p>{{ item.no }}</p>
                            </div>
                        </div>
                        <div class="txt">
                            冰箱名称：
                            <p>{{ item.name }}</p>
                        </div>
                        <div class="txt">
                            冰箱型号：
                            <p>{{ item.model }}</p>
                        </div>
                        <div class="start">
                            <img src="../../../assets/img/use.png" class="img1" alt />
                            <div class="txt">{{ item.keeperuser }}</div>
                        </div>
                        <div class="dic">
                            <div class="title">-30℃</div>
                            <div class="txt1">海尔</div>
                        </div>
                    </div>
                    <div class="itemBot2">
                        <div class="title2">冰箱可放入材料：</div>
                        <div class="txt2">冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料</div>
                    </div>
                    <div class="more">
                        <span @click="handleEdit(item)">修改</span>
                        <span @click="toDetail">查看详情</span>
                        <span @click="handleDelete(item)">删除</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加冰箱 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="addForm.id ? '编辑冰箱' : '新增冰箱'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="选择房间" prop="roomid">
                    <el-select v-model="addForm.roomid" filterable placeholder="请选择">
                        <el-option v-for="item in roomList1" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="容器保管员" prop="keeperuserid">
                    <el-select v-model="addForm.keeperuserid" filterable placeholder="请选择">
                        <el-option v-for="item in userList" :key="item.userid" :label="item.username" :value="item.userid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="冰箱编号" prop="no">
                    <el-input type="text" v-model="addForm.no"></el-input>
                </el-form-item>
                <el-form-item label="冰箱名称" prop="name" :status-icon="true">
                    <el-input type="text" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="冰箱品牌" prop="brand" :status-icon="true">
                    <el-input type="text" v-model="addForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="冰箱型号" prop="model" :status-icon="true">
                    <el-input type="text" v-model="addForm.model"></el-input>
                </el-form-item>
                <el-form-item label="平面布局长" prop="levelc_x" :status-icon="true">
                    <el-input type="text" v-model="addForm.levelc_x"></el-input>
                </el-form-item>
                <el-form-item label="平面布局宽" prop="levelc_y" :status-icon="true">
                    <el-input type="text" v-model="addForm.levelc_y"></el-input>
                </el-form-item>
                <el-form-item label="大层层数" prop="levela" :status-icon="true">
                    <el-input type="text" v-model="addForm.levela"></el-input>
                </el-form-item>
                <el-form-item label="小层层数" prop="levelb" :status-icon="true">
                    <el-input type="text" v-model="addForm.levelb"></el-input>
                </el-form-item>
                <el-form-item label="样本盒规格" prop="samplebox" :status-icon="true">
                    <el-radio-group v-model="addForm.samplebox" @change="changeSamplebox">
                        <el-radio :label="1">9x9</el-radio>
                        <el-radio :label="2">12x12</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="容器描述" prop="remark" :status-icon="true">
                    <el-input type="textarea" rows="4" v-model="addForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="可放入材料" prop="dataids" :status-icon="true">
                    <el-select v-model="addForm.dataids"></el-select>
                </el-form-item>
                <el-form-item label="温度" prop="temperatureid" :status-icon="true">
                    <el-select v-model="addForm.temperatureid"></el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button @click="addSubmitForm('addForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分页 -->
        <el-pagination
            v-if="pageSize > 10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
        ></el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: '',
            value: 0,
            pageIndex: 1, //页码数
            pageSize: 10, //条数
            totalCount: 0, //总条数
            tableData: [], //表格数据
            roomId: 0, //默认选择全部房间
            addForm: {
                id: '',
                roomid: '', //房间id
                no: '', //冰箱编号
                name: '', //冰箱名称
                brand: '', //冰箱品牌
                model: '', //冰箱型号
                levelc_x: '', //平面布局长
                levelc_y: '', //平面布局宽
                levela: '', //大层层数
                levelb: '', //小层层数
                samplebox: '', //样本盒规格 1.9x9   2.12x12
                keeperuserid: '', //容器保管员id
                keeperuser: '', //容器保管员str
                remark: '', //容器描述
                dataids: [], //可放入材料id
                datas: '', //可放入材料str
                temperatureid: '', //温度id
                temperature: '' //温度str
            },
            addFormRules: {
                roomid: [{ required: true, trigger: 'change', message: '请选择房间' }],
                keeperuserid: [{ required: true, trigger: 'change', message: '请选择容器保管员' }],
                no: [{ required: true, trigger: 'blur', message: '请输入冰箱编号' }],
                name: [{ required: true, trigger: 'blur', message: '请输入冰箱名称' }],
                brand: [{ required: true, trigger: 'blur', message: '请输入冰箱品牌' }],
                model: [{ required: true, trigger: 'blur', message: '请输入冰箱型号' }],
                levelc_x: [{ required: true, trigger: 'blur', message: '请输入平面布局长' }],
                levelc_y: [{ required: true, trigger: 'blur', message: '请输入平面布局宽' }],
                levela: [{ required: true, trigger: 'blur', message: '请输入大层层数' }],
                levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                remark: [{ required: true, trigger: 'blur', message: '请输入容器描述' }]
            },
            roomList: [], //房间列表
            roomList1: [], //房间列表不包含全部
            userList: [], //用户列表
            addDialogVisible: false, //添加对话框的显示隐藏
            allList: [
                {
                    id: 0,
                    name: '全部'
                },
                {
                    id: 1,
                    name: '90%及以上'
                },
                {
                    id: 2,
                    name: '60%及以上'
                },
                {
                    id: 3,
                    name: '40%及以上'
                },
                {
                    id: 4,
                    name: '20%及以上'
                },
                {
                    id: 5,
                    name: '10%及以上'
                }
            ]
        };
    },
    mounted() {
        this.roomId = parseInt(this.$route.query.id) ? parseInt(this.$route.query.id) : 0;
        this.getData(1);
        this.getRoomList(); //获取房间列表
        this.getUserList(); //获取用户列表
    },
    methods: {
        // 切换房间
        changeRoom(e) {
            this.roomId = e;
            this.getData(1);
        },
        // 切换样本盒规格
        changeSamplebox(e) {
            this.addForm.samplebox = e;
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
        // 编辑冰箱
        handleEdit(item) {
            console.log(item);
            this.addForm = {
                id: item.containerid,
                roomid: item.roomid, //房间id
                no: item.no, //冰箱编号
                name: item.name, //冰箱名称
                brand: item.brand, //冰箱品牌
                model: item.model, //冰箱型号
                levelc_x: item.levelc_x, //平面布局长
                levelc_y: item.levelc_y, //平面布局宽
                levela: item.levela, //大层层数
                levelb: item.levelb, //小层层数
                samplebox: item.samplebox, //样本盒规格 1.9x9   2.12x12
                keeperuserid: item.keeperuserid, //容器保管员id
                keeperuser: item.keeperuser, //容器保管员str
                remark: item.remark, //容器描述
                dataids: item.dataids, //可放入材料id
                datas: item.datas, //可放入材料str
                temperatureid: item.temperatureid == 0 ? null : item.temperatureid, //温度id
                temperature: item.temperature //温度str
            };
            this.addDialogVisible = true;
        },
        // 跳转冰箱详情
        toDetail() {
            this.$router.push('/iceboxDetail');
        },
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
        // 表格数据
        getData(pageIndex) {
            this.$http
                .post('/api/container/getlistbyfridge', {
                    name: this.keyword,
                    roomid: this.value,
                    pageIndex: pageIndex,
                    pageSize: this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.tableData = res.data.result.pageData;
                        this.totalCount = res.data.result.totalItemCount;
                        this.pageIndex = res.data.result.pageIndex;
                        this.pageSize = res.data.result.pageSize;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        // 提交校验
        addSubmitForm(formName) {
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    // 筛选userid对应的user
                    let tempArr = this.userList;
                    tempArr.forEach((item) => {
                        if (item.userid == this.addForm.keeperuserid) {
                            this.addForm.keeperuser = item.username;
                        }
                    });

                    if (this.addForm.id) {
                        this.$http
                            .post('/api/container/savebyfridge', {
                                containerid: this.addForm.id,
                                roomid: this.addForm.roomid,
                                no: this.addForm.no,
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
                    } else {
                        this.$http
                            .post('/api/container/savebyfridge', {
                                roomid: this.addForm.roomid,
                                no: this.addForm.no,
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
                }
            });
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该冰箱, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/container/deletebyfridge', { containerid: item.containerid }).then((res) => {
                        if (res.data.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData(this.pageIndex);
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                })
                .catch(() => {});
        },
        // 添加冰箱
        add() {
            // this.addForm = {
            //     id: '',
            //     roomid: '', //房间id
            //     no: '', //冰箱编号
            //     name: '', //冰箱名称
            //     brand: '', //冰箱品牌
            //     model: '', //冰箱型号
            //     levelc_x: '', //平面布局长
            //     levelc_y: '', //平面布局宽
            //     levela: '', //大层层数
            //     levelb: '', //小层层数
            //     samplebox: 1, //样本盒规格 1.9x9   2.12x12
            //     keeperuserid: '', //容器保管员id
            //     keeperuser: '', //容器保管员str
            //     remark: '', //容器描述
            //     dataids: [], //可放入材料id
            //     datas: '', //可放入材料str
            //     temperatureid: '', //温度id
            //     temperature: '' //温度str
            // }
            // this.addDialogVisible = true;
            this.$router.push('/addContainer');
        },
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/container.less');
.item3 {
    z-index: 999;
}
</style>