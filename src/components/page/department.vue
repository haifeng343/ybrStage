<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">系统管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">组织管理</div>
        </div>
        <el-card>
            <!-- 搜索添加区域 -->
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
                            <img src="../../assets/img/add1.png" alt />
                            <p>新增组织</p>
                        </div>
                        <div class="content_btn error" v-has="'delete'" @click="deleteAll">
                            <img src="../../assets/img/delete1.png" alt />
                            <p>删除</p>
                        </div>
                    </div>
                </div>
            </div>
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
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="组织名称" width="400"></el-table-column>
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
            ],
            deleteList:[],//批量删除
        };
    },
    methods: {
        // 批量勾选
        handleSelectionChange(e) {
            let arr = [];
            if (e.length > 0) {
                e.filter((item) => {
                    return item;
                }).map((item) => {
                    arr.push(item.num);
                });
            }
            this.deleteList = arr;
        },
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
            this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
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
        // 批量删除
        deleteAll() {
            this.$confirm('此操作将永久删除勾选的菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/menu/deletemenus', { id: this.deleteList }).then((res) => {
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
        // 获取部门列表
        getDropList() {
            this.$http.post('/api/user/getdropdownorg').then((res) => {
                this.dropList = res.data.result;
            });
        },
    },
    created() {
        this.getData(1); //获取数据
        this.getDropList(); //获取组织列表
    }
};
</script>
<style scoped>
</style>