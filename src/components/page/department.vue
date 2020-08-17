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
                        @clear="getData"
                        @keydown.native.enter="getData(1)"
                        class="input-with-select"
                    >
                        <el-button
                            slot="append"
                            type="primary"
                            icon="el-icon-search"
                            @click="getData(1)"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button v-has="'add'" @click="add">新建部门</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                class="table"
                height="700"
                :header-cell-style="{background:'#fff',color:'#606266'}"
                :row-class-name="tableRowClassName"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                <el-table-column prop="name" label="部门名称" width="400"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            v-has="'edit'"
                            @click="handleEdit( scope.row)"
                        ></el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加 -->
        <el-dialog
            :title="addForm.id?'编辑组织':'新建组织'"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="组织名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="组织类型" prop="type">
                    <el-radio-group v-model="addForm.type">
                        <el-radio
                            v-for="(item,index) in typeList"
                            :key="index"
                            :label="item.id"
                            :value="item.id"
                        >{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级组织" prop="prev">
                    <el-select v-model="addForm.prev">
                        <el-option
                            v-for="item in dropList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button @click="addSubmitForm('addForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: '', //关键字
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            tableData: [],
            addDialogVisible: false,
            addForm: {
                id: '',
                name: '', //部门名称
                prev: '', //上级部门
                type: '' //类型
            },
            dropList: [], //组织列表
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }],
                type: [{ required: true, trigger: 'blur', message: '请选择类型' }]
            },
            typeList: [
                {
                    id: 1,
                    label: '内部组织'
                },
                {
                    id: 2,
                    label: '医院'
                },
                {
                    id: 3,
                    label: '课题组'
                }
            ]
        };
    },
    methods: {
        tableRowClassName({ row }) {
            if (row.state === '失败') {
                return 'warning-row';
            } else if (row.state === '成功') {
                return 'success-row';
            }
            return '';
        },
        // 编辑
        handleEdit(item) {
            console.log(item);
            this.addDialogVisible = true;
            this.addForm.name = item.name;
            this.addForm.id = item.id;
            this.addForm.type = item.type;
            this.addForm.prev = item.parentid;
        },
        typeChange(e) {
            console.log(e);
        },
        // 数据
        getData(pageIndex) {
            this.$http
                .post('/api/organization/getorganizationlist', {
                    search: this.keyword,
                    pageIndex: pageIndex,
                    pageSize: this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.tableData = res.data.result.pageData;
                    this.pageIndex = res.data.result.pageIndex;
                    this.pageSize = res.data.result.pageSize;
                    this.totalCount = res.data.result.totalItemCount;
                });
        },
        // 新增
        add() {
            this.addForm = {
                name: '', //部门名称
                prev: '', //上级部门
                type: '' //1内部组织 2医院 3课题组   课题组可选医院可不选
            };
            this.addDialogVisible = true;
        },
        // 提交
        addSubmitForm() {
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    if (this.addForm.id) {
                        //编辑
                        this.$http
                            .post('/api/organization/saveorganization', {
                                id: this.addForm.id,
                                parentid: this.addForm.prev ? this.addForm.prev : 0,
                                name: this.addForm.name,
                                type: this.addForm.type
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch((error) => {
                                this.$message.fail(error.message);
                            });
                    } else {
                        this.$http
                            .post('/api/organization/saveorganization', {
                                parentid: this.addForm.prev ? this.addForm.prev : 0,
                                name: this.addForm.name,
                                type: this.addForm.type
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch((error) => {
                                this.$message.fail(error.message);
                            });
                    }
                }
            });
        },
        //  this.$http.post('/api/organization/getdropdowntype',{}).then(res=>{
        //     console.log('typeList'+res)
        //   })
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http.post('/api/organization/deleteorganization', { id: item.id }).then((res) => {
                        this.getData(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
                .catch(() => {});
        },
        // 获取部门列表
        getDropList() {
            this.$http.post('/api/user/getdropdownorg').then((res) => {
                this.dropList = res.data.result;
            });
        },
        // 存储按钮权限
        getPermission() {
            // 模拟接口 获取 权限数据集合
            // 模拟获取的数据 有以下几个权限
            let perms = ['search', 'view', 'edit', 'delete'];
            // 用于把权限集合提交到 actions 中的 SET_PERMISSION 函数
            // 第一个为函数名，后面的参数为 我们需要提交的参数，可以是多个
            this.$store.dispatch('SET_PERMISSION', perms);
        }
    },
    created() {
        this.getData(1); //获取数据
        this.getDropList(); //获取组织列表
        this.getPermission();
    }
};
</script>
<style scoped>
</style>