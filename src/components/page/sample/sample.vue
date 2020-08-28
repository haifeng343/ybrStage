<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">样本管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">样本列表</div>
        </div>
        <el-card>
            <!-- 头部搜索条件 -->
            <div class="btnContent">
                <div class="btnContentTop">
                    <div class="start">
                        <div class="searchForm">
                            <el-input
                                class="searchFormInput"
                                placeholder="输入搜索条件"
                                v-model="keyword"
                                clearable
                                @clear="getData(1)"
                                @keydown.native.enter="getData(1)"
                            ></el-input>
                            <div class="searchFormBtn" @click="getData(1)">搜索</div>
                        </div>
                        <!-- <div class="content_btn">
                            <img src="../../assets/img/loading.png" alt />
                            <p>重置</p>
                        </div>-->
                    </div>
                    <div class="btnContentRight">
                        <div class="content_btn success" v-has="'add'" @click="add">
                            <img src="../../../assets/img/add1.png" alt />
                            <p>新增样本</p>
                        </div>
                        <div class="content_btn error" v-has="'delete'" @click="deleteAll">
                            <img src="../../../assets/img/delete1.png" alt />
                            <p>删除</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 数据表格 -->
            <el-table
                :data="tableData"
                border
                class="table"
                height="700"
                :header-cell-style="{background:'#fff',color:'#606266'}"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="no" label="样本编号" width="200" align="center"></el-table-column>
                <el-table-column prop="organizationid" label="所属组织" width="200" align="center"></el-table-column>
                <el-table-column prop="projectid" label="所属项目" width="200" align="center"></el-table-column>
                <el-table-column prop="containerid" label="所属容器" width="200" align="center"></el-table-column>
                <el-table-column prop="latticeid" label="样本盒" width="200" align="center"></el-table-column>
                <el-table-column prop="name" label="样本名称" width="200" align="center"></el-table-column>
                <el-table-column prop="patientname" label="病人姓名" width="200" align="center"></el-table-column>
                <el-table-column prop="type" label="样本类型" width="200" align="center"></el-table-column>
                <el-table-column prop="grass" label="种属" width="200" align="center"></el-table-column>
                <el-table-column prop="tissuestype" label="组织类型" width="200" align="center"></el-table-column>
                <el-table-column prop="diseasetype" label="疾病类型" width="200" align="center"></el-table-column>
                <el-table-column prop="storagecondition" label="储存条件" width="200" align="center"></el-table-column>
                <el-table-column prop="size" label="样本大小" width="200" align="center"></el-table-column>
                <el-table-column prop="collectiontime" label="样本收集时间" width="200" align="center"></el-table-column>
                <el-table-column prop="collectionuser" label="样本收集人" width="200" align="center"></el-table-column>
                <el-table-column prop="storagetime" label="样本入库时间" width="200" align="center"></el-table-column>
                <el-table-column prop="storageuser" label="样本入库人" width="200" align="center"></el-table-column>
                <!-- <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
                <el-table-column label="锁定" width="180" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.islocked"
                            @change="changelocker(scope.row)"
                            active-text="是"
                            inactive-text="否"
                        ></el-switch>
                    </template>
                </el-table-column>-->
                <el-table-column label="操作" width="280" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            v-has="'edit'"
                            @click="handleEdit(scope.$index, scope.row)"
                        ></el-button>
                        <el-tooltip content="修改密码" :enterable="false" placement="top">
                            <el-button
                                size="mini"
                                type="warning"
                                icon="el-icon-edit-outline"
                                v-has="'editPwd'"
                                @click="changePwd(scope.$index, scope.row)"
                            ></el-button>
                        </el-tooltip>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            v-has="'delete'"
                            @click="handleDelete(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

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

            <!-- 添加样本 -->
            <el-dialog
                :title="addForm.id?'编辑样本':'新增样本'"
                :visible.sync="addDialogVisible"
                width="40%"
                @close="addDialogClosed"
            >
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                    <el-form-item label="样本编号" prop="no">
                        <el-input v-model="addForm.no"></el-input>
                    </el-form-item>
                    <el-form-item label="样本名称" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="样本大小" prop="size">
                        <el-input v-model="addForm.size"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组织">
                        <el-select v-model="addForm.organizationid" placeholder="请选择组织">
                            <el-option
                                v-for="item in dropList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属项目">
                        <el-select v-model="addForm.projectid" placeholder="请选择项目">
                            <el-option
                                v-for="item in proJectList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属容器">
                        <el-select v-model="addForm.containerid" placeholder="请选择容器">
                            <el-option
                                v-for="item in containerList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属样本盒">
                        <el-select v-model="addForm.latticeid" placeholder="请选择样本盒">
                            <el-option
                                v-for="item in latticeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属病人">
                        <el-select v-model="addForm.patientid" placeholder="请选择样病人">
                            <el-option
                                v-for="item in patientList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="样本类型">
                        <el-select v-model="addForm.typeid" placeholder="请选择样本类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="种属">
                        <el-select v-model="addForm.grassid" placeholder="请选择种属">
                            <el-option
                                v-for="item in grassList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组织类型">
                        <el-select v-model="addForm.tissuestypeid" placeholder="请选择组织类型">
                            <el-option
                                v-for="item in tissuestypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="疾病类型">
                        <el-select v-model="addForm.diseasetypeid" placeholder="请选择疾病类型">
                            <el-option
                                v-for="item in diseasetypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="存储条件">
                        <el-select v-model="addForm.storageconditionid" placeholder="请选择存储条件">
                            <el-option
                                v-for="item in storageconditionList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="样本收集人">
                        <el-select v-model="addForm.collectionuserid" placeholder="请选择样本收集人">
                            <el-option
                                v-for="item in collectionuserList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="样本入库人">
                        <el-select v-model="addForm.storageuserid" placeholder="请选择样本入库人">
                            <el-option
                                v-for="item in storageuserList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="样本收集时间">
                        <el-date-picker v-model="addForm.collectiontime" value-format="yyyy-MM-dd" type="date" placeholder="请选择样本收集时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="样本入库时间">
                        <el-date-picker v-model="addForm.storagetime" value-format="yyyy-MM-dd" type="date" placeholder="请选择样本入库时间"></el-date-picker>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogClosed">取 消</el-button>
                    <el-button @click="addSubmitForm('addForm')">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        // 校验手机号
        var checkMobile = (rule, value, cb) => {
            const regMbole = /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/;
            if (regMbole.test(value)) {
                return cb();
            }
            cb(new Error('请输入正确的手机号'));
        };
        return {
            loading: true,
            name: '2',
            keyword: '',
            addForm: {
                id: '',
                username: '', //样本
                account: '', //账号
                phone: '', //手机号
                organizationid: '', //组织
                pazzword: '', //密码
                roleids: [], //权限
                rolenames: [] //权限名称
            },
            addFormRules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入样本名称' },
                    { min: 3, max: 10, message: '样本名称长度在3到10个字符之间' }
                ],
                pazzword: [{ required: true, trigger: 'blur', message: '请输入密码' }],
                account: [{ required: true, trigger: 'blur', message: '请输入账号昵称' }],
                phone: [
                    { required: true, trigger: 'blur', message: '请输入手机号' },
                    { validator: checkMobile, trigger: 'blur' }
                ]
            },
            addDialogVisible: true, //添加对话框的显示隐藏
            pageIndex: 1, //页码数
            pageSize: 10, //条数
            totalCount: 0, //总条数
            tableData: [], //表格数据
            roleList: [], //角色列表
            dropList: [], //组织列表
            deleteList: [] //批量删除
        };
    },
    created() {
        this.getData(1);
        this.getRoleList(); //获取角色列表
        this.getDropList(); //获取组织列表
    },
    methods: {
        // 批量勾选
        handleSelectionChange(e) {
            let arr = [];
            if (e.length > 0) {
                e.filter((item) => {
                    return item;
                }).map((item) => {
                    arr.push(item.userid);
                });
            }
            this.deleteList = arr;
        },
        handleDrag(item) {
            // 参数会在头部拼接
            this.$router.push({
                query: {
                    id: 1,
                    name: 'zhangsan'
                },
                path: '/markdown'
            });
            // 参数不会在头部显示
            // this.$router.push({
            //   name:'markdown',
            //   params:{
            //     name:'zhangsan',
            //     id:'1'
            //   }
            // })
        },
        // 获取部门列表
        getDropList() {
            this.$http.post('/api/user/getdropdownorg').then((res) => {
                this.dropList = res.data.result;
            });
        },
        tableRowClassName({ row }) {
            if (row.state === '失败') {
                return 'warning-row';
            } else if (row.state === '成功') {
                return 'success-row';
            }
            return '';
        },
        // 当前样本角色
        roleChange(e) {
            console.log(e);
            let tempArr = this.roleList;
            let arr = [];
            tempArr.forEach((item) => {
                e.forEach((item1) => {
                    if (item.roleid == item1) {
                        arr.push(item.rolename);
                    }
                });
            });
            this.addForm.rolenames = arr;
            console.log(arr);
        },
        // 角色列表
        getRoleList() {
            this.$http
                .post('/api/role/getrolelist', {
                    organizationid: 0,
                    pageIndex: this.pageIndex,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.roleList = res.data.result.pageData;
                });
        },
        // 锁定/不锁定
        changelocker(item) {
            if (item.islocked) {
                //不锁定
                this.$http.post('/api/user/lockuser', { id: item.userid }).then((res) => {
                    this.getData(this.pageIndex);
                });
            } else {
                //锁定
                this.$http.post('/api/user/unlockuser', { id: item.userid }).then((res) => {
                    this.getData(this.pageIndex);
                });
            }
        },
        // 关闭弹窗
        clearForm() {
            this.$refs.formRef.resetFields();
            this.dialogFormVisible = false;
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
        // 搜索
        search() {
            this.getData(1);
        },
        // 添加
        add() {
            this.addDialogVisible = true;
            this.addForm = {
                id: '',
                username: '', //样本
                account: '', //账号
                phone: '', //手机号
                organizationid: '', //组织
                pazzword: '', //密码
                roleids: [], //权限
                rolenames: [] //权限名称
            };
            // console.log(this.$refs.childRef.getData)//调用子组件的属性和方法
        },
        // 编辑
        handleEdit(index, item) {
            console.log(item);
            // 格式转化
            let role = [];
            if (item.roleids) {
                role = item.roleids.split(',');
                for (let i = 0; i < role.length; i++) {
                    role[i] = Number(role[i]);
                }
            }
            let tempArr = this.roleList;
            let arr = [];
            tempArr.forEach((item) => {
                role.forEach((item1) => {
                    if (item.roleid == item1) {
                        arr.push(item.rolename);
                    }
                });
            });
            this.addForm.rolenames = arr;
            this.addForm = {
                id: item.userid,
                username: item.username,
                organizationid: item.organizationid,
                phone: item.phone,
                account: item.account,
                pazzword: item.pazzword,
                roleids: role ? role : [],
                rolenames: arr ? arr : []
            };
            this.addDialogVisible = true;
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该样本, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/user/deleteuser', { id: item.userid }).then((res) => {
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
        // 批量删除
        deleteAll() {
            this.$confirm('此操作将永久删除勾选的样本数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/user/deleteusers', { id: this.deleteList }).then((res) => {
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
        // 当前状态改变的时候
        swichChange(item) {},
        // 获取数据
        getData(pageIndex) {
            this.$http
                .post('/api/sample/getsamplelist', {
                    search: this.keyword,
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
                    if (this.addForm.id) {
                        this.$http
                            .post('/api/user/saveuserinfo', {
                                userid: this.addForm.id,
                                username: this.addForm.username,
                                account: this.addForm.account,
                                pazzword: this.addForm.pazzword,
                                organizationid: this.addForm.organizationid,
                                phone: this.addForm.phone,
                                roleids: this.addForm.roleids ? this.addForm.roleids : [],
                                rolenames: this.addForm.rolenames ? this.addForm.rolenames : []
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
                            .post('/api/user/saveuserinfo', {
                                username: this.addForm.username,
                                account: this.addForm.account,
                                pazzword: this.addForm.pazzword,
                                organizationid: this.addForm.organizationid,
                                phone: this.addForm.phone,
                                roleids: this.addForm.roleids ? this.addForm.roleids : [],
                                rolenames: this.addForm.rolenames ? this.addForm.rolenames : []
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
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    }
};
</script>
<style scoped>
</style>