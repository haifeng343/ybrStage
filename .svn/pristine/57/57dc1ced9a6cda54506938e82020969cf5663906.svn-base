<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">容器管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">液氮罐管理</div>
        </div>
        <!-- 头部搜索条件 -->
        <div class="btnContent">
            <div class="btnContentTop">
                <div class="btnContentLeft">
                    <span>90%及以上</span>
                    <span>60%及以上</span>
                    <span>40%及以上</span>
                    <span>20%及以上</span>
                    <span>10%及以上</span>
                </div>
                <div class="btnContentRight">
                    <!-- <div class="content_btn">
                        <img src="../../assets/img/loading.png" alt />
                        <p>重置</p>
                    </div>-->
                    <div class="content_btn success" @click="add">
                        <img src="../../../assets/img/add1.png" alt />
                        <p>新增液氮罐</p>
                    </div>
                    <!-- <div class="content_btn error">
                        <img src="../../assets/img/delete1.png" alt />
                        <p>删除</p>
                    </div>
                    <div class="content_btn">
                        <img src="../../assets/img/edit.png" alt />
                        <p>修改</p>
                    </div>-->
                </div>
            </div>
            <div class="btnContentBottom">
                <div class="btnSelect">
                    <span>选择房间:</span>
                    <el-select v-model="value" @change="changeRoom" placeholder="请选择">
                        <el-option
                            v-for="item in roomList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
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
                        <img src="../../../assets/img/tank.png" alt />
                    </div>
                    <div class="itemBot">
                        <p>{{item.name}}</p>
                    </div>
                </div>
                <div class="item2 kk">
                    <div class="itemTop2">
                        <div class="start">
                            <img src="../../../assets/img/tag.png" class="img1" alt />
                            <div class="txt">
                                液氮罐编号：
                                <p>{{item.no}}</p>
                            </div>
                        </div>
                        <div class="txt">
                            液氮罐名称：
                            <p>{{item.name}}</p>
                        </div>
                        <div class="txt">
                            液氮罐型号：
                            <p>{{item.model}}</p>
                        </div>
                        <div class="start">
                            <img src="../../../assets/img/use.png" class="img1" alt />
                            <div class="txt">{{item.keeperuser}}</div>
                        </div>
                        <div class="dic">
                            <div class="title">-30℃</div>
                            <div class="txt1">海尔</div>
                        </div>
                    </div>
                    <div class="itemBot2">
                        <div class="title2">液氮罐可放入材料：</div>
                        <!-- <div class="txt2">液氮罐可放入材料液氮罐可放入材料液氮罐可放入材料液氮罐可放入材料液氮罐可放入材料液氮罐可放入材料</div> -->
                    </div>
                    <div class="more" @click="toDetail">查看详情</div>
                </div>
                <div class="item3">
                    <div class="item3Item" @click="handleEdit(item)">
                        <img src="../../../assets/img/edit.png" alt />
                        <p>编辑</p>
                    </div>
                    <div class="item3Item" @click="handleDelete(item)">
                        <img src="../../../assets/img/delete.png" alt />
                        <p>删除</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加液氮罐 -->
        <el-dialog
            :title="addForm.id?'编辑液氮罐':'新增液氮罐'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="选择房间" prop="roomid">
                    <el-select v-model="addForm.roomid" placeholder="请选择">
                        <el-option
                            v-for="item in roomList1"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="容器保管员" prop="keeperuserid">
                    <el-select v-model="addForm.keeperuserid" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.userid"
                            :label="item.username"
                            :value="item.userid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="液氮罐编号" prop="no">
                    <el-input type="text" v-model="addForm.no"></el-input>
                </el-form-item>
                <el-form-item label="液氮罐名称" prop="name" :status-icon="true">
                    <el-input type="text" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="液氮罐品牌" prop="brand" :status-icon="true">
                    <el-input type="text" v-model="addForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="液氮罐型号" prop="model" :status-icon="true">
                    <el-input type="text" v-model="addForm.model"></el-input>
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button @click="addSubmitForm('addForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40,50]"
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
            addForm: {
                id: '',
                roomid: '', //房间id
                no: '', //液氮罐编号
                name: '', //液氮罐名称
                brand: '', //液氮罐品牌
                model: '', //液氮罐型号
                levela: '', //大层层数
                levelb: '', //小层层数
                samplebox: '', //样本盒规格 1.9x9   2.12x12
                keeperuserid: '', //容器保管员id
                keeperuser: '', //容器保管员str
                remark: '', //容器描述
            },
            addFormRules: {
                roomid: [{ required: true, trigger: 'change', message: '请选择房间' }],
                keeperuserid: [{ required: true, trigger: 'change', message: '请选择容器保管员' }],
                no: [{ required: true, trigger: 'blur', message: '请输入液氮罐编号' }],
                name: [{ required: true, trigger: 'blur', message: '请输入液氮罐名称' }],
                brand: [{ required: true, trigger: 'blur', message: '请输入液氮罐品牌' }],
                model: [{ required: true, trigger: 'blur', message: '请输入液氮罐型号' }],
                levela: [{ required: true, trigger: 'blur', message: '请输入大层层数' }],
                levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                remark: [{ required: true, trigger: 'blur', message: '请输入容器描述' }]
            },
            roomList: [], //房间列表
            roomList1: [], //房间列表不包含全部
            userList: [], //用户列表
            addDialogVisible: false //添加对话框的显示隐藏
        };
    },
    mounted() {
        this.getData(1);
        this.getRoomList(); //获取房间列表
        this.getUserList(); //获取用户列表
    },
    methods: {
        // 切换房间
        changeRoom(e) {
            this.value = e;
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
        // 编辑液氮罐
        handleEdit(item) {
            console.log(item);
            this.addForm = {
                id: item.containerid,
                roomid: item.roomid, //房间id
                no: item.no, //液氮罐编号
                name: item.name, //液氮罐名称
                brand: item.brand, //液氮罐品牌
                model: item.model, //液氮罐型号
                levela: item.levela, //大层层数
                levelb: item.levelb, //小层层数
                samplebox: item.samplebox, //样本盒规格 1.9x9   2.12x12
                keeperuserid: item.keeperuserid, //容器保管员id
                keeperuser: item.keeperuser, //容器保管员str
                remark: item.remark, //容器描述
            };
            this.addDialogVisible = true;
        },
        // 跳转液氮罐详情
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
                .post('/api/container/getlistbyliquid_nitrogen', {
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
                            .post('/api/container/savebyliquid_nitrogen', {
                                containerid: this.addForm.id,
                                roomid: this.addForm.roomid,
                                no: this.addForm.no,
                                name: this.addForm.name,
                                brand: this.addForm.brand,
                                model: this.addForm.model,
                                levela: parseInt(this.addForm.levela),
                                levelb: parseInt(this.addForm.levelb),
                                samplebox: this.addForm.samplebox,
                                keeperuserid: this.addForm.keeperuserid,
                                keeperuser: this.addForm.keeperuser,
                                remark: this.addForm.remark,
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
                            .post('/api/container/savebyliquid_nitrogen', {
                                roomid: this.addForm.roomid,
                                no: this.addForm.no,
                                name: this.addForm.name,
                                brand: this.addForm.brand,
                                model: this.addForm.model,
                                levela: parseInt(this.addForm.levela),
                                levelb: parseInt(this.addForm.levelb),
                                samplebox: this.addForm.samplebox,
                                keeperuserid: this.addForm.keeperuserid,
                                keeperuser: this.addForm.keeperuser,
                                remark: this.addForm.remark,
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
            this.$confirm('此操作将永久删除该液氮罐, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/container/deletebyliquid_nitrogen', { containerid: item.containerid }).then((res) => {
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
        // 添加液氮罐
        add() {
            this.addForm = {
                id: '',
                roomid: '', //房间id
                no: '', //液氮罐编号
                name: '', //液氮罐名称
                brand: '', //液氮罐品牌
                model: '', //液氮罐型号
                levela: '', //大层层数
                levelb: '', //小层层数
                samplebox: 1, //样本盒规格 1.9x9   2.12x12
                keeperuserid: '', //容器保管员id
                keeperuser: '', //容器保管员str
                remark: '', //容器描述
            }
            this.addDialogVisible = true;
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
</style>