<template>
    <div>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索添加区域 -->
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-input
                        placeholder="请输入内容"
                        v-model="keyword"
                        clearable
                        ref="mark"
                        @clear="getData(1)"
                        @keydown.native.enter="search"
                        class="input-with-select"
                    >
                        <el-button
                            slot="append"
                            type="primary"
                            icon="el-icon-search"
                            @click="search"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="add">添加用户</el-button>
                </el-col>
            </el-row>

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
                <el-table-column prop="userid" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="account" label="账号名称" align="center"></el-table-column>
                <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
                <!-- <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>-->
                <el-table-column label="锁定" width="180" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.islocked"
                            @change="changelocker(scope.row)"
                            active-text="是"
                            inactive-text="否"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        ></el-button>
                        <el-tooltip content="修改密码" :enterable="false" placement="top">
                            <el-button
                                size="mini"
                                type="warning"
                                icon="el-icon-edit-outline"
                                @click="changePwd(scope.$index, scope.row)"
                            ></el-button>
                        </el-tooltip>
                        <!-- <el-tooltip content="跳转详情" :enterable="false" placement="top">
                            <el-button
                                size="mini"
                                type="warning"
                                icon="el-icon-price-tag"
                                @click="handleDrag(scope.$index, scope.row)"
                            ></el-button>
                        </el-tooltip>-->
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
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

            <!-- 添加用户 -->
            <el-dialog
                :title="addForm.id?'编辑用户':'新增用户'"
                :visible.sync="addDialogVisible"
                width="40%"
                @close="addDialogClosed"
            >
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="addForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pazzword">
                        <el-input type="password" v-model="addForm.pazzword"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="邮箱" prop="email" :status-icon="true">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>-->
                    <el-form-item label="手机号" prop="phone" :status-icon="true">
                        <el-input type="number" v-model="addForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组织">
                        <el-select v-model="addForm.organizationid" placeholder="请选择组织"></el-select>
                    </el-form-item>
                    <el-form-item label="拥有角色">
                        <el-select
                            v-model="addForm.roleids"
                            multiple
                            placeholder="请选择角色"
                            @change="roleChange"
                        >
                            <el-option
                                v-for="item in roleList"
                                :key="item.roleid"
                                :label="item.rolename"
                                :value="item.roleid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogClosed">取 消</el-button>
                    <el-button type="primary" @click="addSubmitForm('addForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改密码 -->
            <el-dialog
                title="修改密码"
                width="40%"
                @close="clearForm"
                :visible.sync="dialogFormVisible"
            >
                <el-form :model="form" :rules="formRules" ref="formRef">
                    <el-form-item label="密码" prop="pazzword" label-width="60px">
                        <el-input v-model="form.pazzword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="clearForm">取 消</el-button>
                    <el-button type="primary" @click="editPwdForm('form')">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        // 校验邮箱
        var checkEmail = (rule, value, cb) => {
            const regEmail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
            if (regEmail.test(value)) {
                return cb();
            }
            cb(new Error('请输入合法的邮箱'));
        };
        // 校验手机号
        var checkMobile = (rule, value, cb) => {
            const regMbole = /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/;
            if (regMbole.test(value)) {
                return cb();
            }
            cb(new Error('请输入正确的手机号'));
        };
        return {
            dialogFormVisible: false, //密码修改弹出窗
            formRules: {
                pazzword: [{ required: true, trigger: 'blur', message: '请输入密码' }]
            },
            form: {
                id: '',
                pazzword: ''
            },
            loading: true,
            name: '2',
            keyword: '',
            addForm: {
                username: '', //用户
                account: '', //账号
                phone: '', //手机号
                organizationid: '', //组织
                pazzword: '', //密码
                roleids: [], //权限
                rolenames: [] //权限名称
            },
            addFormRules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' },
                    { min: 3, max: 10, message: '用户名长度在3到10个字符之间' }
                ],
                account: [{ required: true, trigger: 'blur', message: '请输入账号昵称' }],
                pazzword: [{ required: true, trigger: 'blur', message: '请输入密码' }],
                phone: [
                    { required: true, trigger: 'blur', message: '请输入手机号' },
                    { validator: checkMobile, trigger: 'blur' }
                ]
            },
            addDialogVisible: false, //添加对话框的显示隐藏
            pageIndex: 1, //页码数
            pageSize: 10, //条数
            totalCount: 0, //总条数
            tableData: [], //表格数据
            roleList: [] //角色列表
        };
    },
    created() {
        this.getData(1);
        this.getRoleList();
    },
    methods: {
        handleSelectionChange(e) {
            console.log(e);
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
        tableRowClassName({ row }) {
            if (row.state === '失败') {
                return 'warning-row';
            } else if (row.state === '成功') {
                return 'success-row';
            }
            return '';
        },
        // 当前用户角色
        roleChange(e) {
            console.log(e);
            let tempArr = this.roleList;
            let arr = [];
            tempArr.forEach(item=>{
                e.forEach(item1=>{
                    if(item.roleid == item1){
                        arr.push(item.rolename)
                    }
                })
            })
            this.addForm.rolenames = arr;
            console.log(arr)
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
                this.$http.post('/api/user/unlockuser', { id: item.userid }).then((res) => {
                    this.getData(this.pageIndex);
                });
            } else {
                //锁定
                this.$http.post('/api/user/lockuser', { id: item.userid }).then((res) => {
                    this.getData(this.pageIndex);
                });
            }
        },
        // 关闭弹窗
        clearForm() {
            this.$refs.formRef.resetFields();
            this.dialogFormVisible = false;
        },
        // 密码提交
        editPwdForm() {
            this.$refs.formRef.validate((valid) => {
                if (valid) {
                    this.$http.post('/api/user/resetpazzword', { id: this.form.id }).then((res) => {
                        this.$message.success('密码修改成功!');
                        this.dialogFormVisible = false;
                        this.getData(this.pageIndex);
                    }).catch(error=>{
                        this.$message.fail(error.message)
                    });
                }
            });
        },
        // 修改密码
        changePwd(index, item) {
            this.form.pazzword = item.pazzword;
            this.form.id = item.userid;
            this.dialogFormVisible = true;
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
            this.addForm = {};
            // console.log(this.$refs.childRef.getData)//调用子组件的属性和方法
        },
        // 编辑
        handleEdit(index, item) {
            console.log(item);
            this.addForm = {
                id: item.userid,
                username: item.username,
                organizationid: item.organizationid,
                phone: item.phone,
                account: item.account,
                pageData: item.pazzword,
            };
            this.addDialogVisible = true;
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http.post('/api/user/deleteuser', { id: item.userid }).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData(this.pageIndex);
                    });
                })
                .catch(() => {});
        },
        // 当前状态改变的时候
        swichChange(item) {},
        // 获取数据
        getData(pageIndex) {
            this.$http
                .post('/api/user/getuserinfo', {
                    search: this.keyword,
                    pageIndex: pageIndex,
                    pageSize: this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.tableData = res.data.result.pageData;
                    this.totalCount = res.data.result.totalItemCount;
                    this.pageIndex = res.data.result.pageIndex;
                    this.pageSize = res.data.result.pageSize;
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
                                if(res.data.success==true){
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                    this.$message.success('新增成功!');
                                }else{
                                    this.$message.error(res.data.message);
                                }
                            })
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
                                if(res.data.success==true){
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                    this.$message.success('新增成功!');
                                }else{
                                    this.$message.error(res.data.message);
                                }
                            })
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