<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">项目管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">项目类型</div>
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
                            <p>新增类型</p>
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
            >
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="no" label="类型编号" width="200"></el-table-column>
                <el-table-column prop="name" label="类型名称" width="300"></el-table-column>
                <el-table-column prop="remark" label="类型描述"></el-table-column>
                <el-table-column label="操作" width="200">
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
        </el-card>
        <!-- 添加 -->
        <el-dialog
            :title="addForm.id?'编辑类型':'新建类型'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="类型编号" prop="no">
                    <el-input v-model="addForm.no" placeholder="请输入类型编号"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入类型名称"></el-input>
                </el-form-item>
                <el-form-item label="类型简介" prop="remark">
                    <el-input v-model="addForm.remark" type="textarea" placeholder="请输入类型简介" rows="4"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button type="primary" @click="addSubmitForm('addForm')">确 定</el-button>
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
            //表格数据
            tableData: [],
            addDialogVisible: false,
            addForm: {
                id: '', //Id
                name: '', //名称
                no: '', //编号
                remark: '' //简介
            },
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入类型名称' }],
                no: [{ required: true, trigger: 'blur', message: '请输入类型编号' }]
            }
        };
    },
    mounted() {
        this.getData(1);
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
        // 节点发生变化
        changeTree() {
            let res = this.$refs.tree.getCheckedNodes();
            let arr = [];
            res.forEach((item) => {
                arr.push(item.num);
            });
            console.log(arr);
            this.addForm.checkmenus = arr;
        },
        // 编辑
        handleEdit(item) {
            this.addForm = {
                id: item.id,
                no: item.no,
                name: item.name,
                remark: item.remark
            };
            this.addDialogVisible = true;
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
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/project/deletetype', { id: item.id }).then((res) => {
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
        // 提交
        addSubmitForm() {
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    if (this.addForm.id) {
                        this.$http
                            .post('/api/project/savetype', {
                                id: this.addForm.id,
                                no: this.addForm.no,
                                name: this.addForm.name,
                                remark: this.addForm.remark
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    } else {
                        this.$http
                            .post('/api/project/savetype', {
                                no: this.addForm.no,
                                name: this.addForm.name,
                                remark: this.addForm.remark
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    }
                    setTimeout(() => {
                        this.getData(this.pageIndex);
                    }, 1000);
                    this.addDialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 数据
        getData(pageIndex) {
            this.$http
                .post('/api/project/gettypelist', {
                    no: '',
                    name: this.keyword,
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
        // 新增
        add() {
            this.addForm = {
                id: '', //Id
                name: '', //名称
                no: '', //编号
                remark: '' //简介
            };
            this.addDialogVisible = true;
        },
        // 关闭弹窗
        addDialogClosed() {
            this.addForm = {
                id: '', //Id
                name: '', //名称
                no: '', //编号
                remark: '' //简介
            };
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    }
};
</script>
<style scoped>
</style>