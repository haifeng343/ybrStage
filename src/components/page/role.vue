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
                        class="input-with-select"
                    >
                        <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="add">新建角色</el-button>
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
                <el-table-column prop="rolename" label="角色名称" width="400"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
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
            :title="addForm.id?'编辑角色':'新建角色'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="prev">
                    <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-expand-all="true"
                        :default-checked-keys="defaultList"
                        :props="defaultProps"
                    ></el-tree>
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
            //树形数据
            data: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        },
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1'
                        },
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }
            ],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            defaultList: [2, 3], //默认选中的数组
            defaultProps: {
                //树形格式
                children: 'children',
                label: 'label'
            },
            //表格数据
            tableData: [],
            addDialogVisible: false,
            addForm: {
                id: '', //Id
                name: '', //部门名称
                prev: '' //上级部门
            },
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }]
            }
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
            this.addDialogVisible = true;
            console.log(item);
            this.addForm.id = item.roleid;
            this.addForm.name = item.rolename;
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
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http.post('/api/role/deleterole', { id: item.roleid }).then((res) => {
                        this.getData(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
                .catch(() => {});
        },
        // 数据
        getData() {
            this.$http
                .post('/api/role/getrolelist', {
                    organizationid: 0,
                    pageIndex: this.pageIndex,
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
            this.addDialogVisible = true;
        },
        //  this.$http.post('/api/organization/getdropdowntype',{}).then(res=>{
        //     console.log('typeList'+res)
        //   })
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style scoped>
</style>