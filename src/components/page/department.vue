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
                        <el-button slot="append" type="primary" icon="el-icon-search" @click="getData(1)"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="add">新建部门</el-button>
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
            title="新建部门"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
             <el-form-item label="上级部门" prop="prev">
                    <el-select v-model="addForm.prev"></el-select>
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
            tableData: [],
            addDialogVisible:false,
            addForm:{
              name:'',//部门名称
              prev:'',//上级部门
            },
            addFormRules:{
              name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }],
            },
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
          console.log(item)
          this.addForm.name = item.name;
          },
        // 数据
        getData(pageIndex) {
            this.$http
                .post('/api/organization/getorganizationlist', {
                    search: this.keyword,
                    pageIndex:pageIndex,
                    pageSize:this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.pageIndex = res.data.result.pageIndex;
                    this.pageSize = res.data.result.pageSize;
                    this.tableData = res.data.result.pageData;
                    this.totalCount = res.data.result.totalItemCount;
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
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
    },
    created(){
        this.getData(1);
    }
};
</script>
<style scoped>
</style>