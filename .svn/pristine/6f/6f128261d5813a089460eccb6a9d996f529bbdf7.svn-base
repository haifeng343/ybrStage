<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">代办管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">我的代办</div>
        </div>

        <el-card>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="我发起的" name="first">我发起的</el-tab-pane>
            <el-tab-pane label="待处理的" name="second">待处理的</el-tab-pane>
            <el-tab-pane label="已处理的" name="third">已处理的</el-tab-pane>
            <el-tab-pane label="抄送我的" name="fourth">抄送我的</el-tab-pane>
        </el-tabs>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit( scope.row)">实验取出申请</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit( scope.row)">归还申请</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit( scope.row)">延期申请</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit( scope.row)">挂失申请</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit( scope.row)">转移申请</el-button>
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit( scope.row)">过期销毁申请</el-button>
 
            <!-- 头部搜索条件 -->
            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border class="table" height="700" 
            :header-cell-style="{background:'#fff',color:'#606266'}" :row-class-name="tableRowClassName">
                <el-table-column prop="apply_id" label="ID" width="50"></el-table-column>
                <el-table-column prop="apply_no" label="审核单号" width="200"></el-table-column>
                <el-table-column prop="apply_type" label="申请单类型" width="300"></el-table-column>
                <el-table-column prop="apply_user" label="申请人" width="300"></el-table-column>
                <el-table-column prop="apply_date" label="申请日期" width="300"></el-table-column>
                <el-table-column prop="state" label="状态" width="200"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleshenheEdit(scope.$index, scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
        </el-card>
        <!-- 添加 -->
        <el-dialog :title="'审核'" :visible.sync="addshenheDialog" width="30%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
              <el-form-item label="审核" prop="type">
                <el-radio v-model="addForm.radio1" label="1" border>通过</el-radio>
                <el-radio v-model="addForm.radio1" label="2" border>不通过</el-radio>
              </el-form-item>
                <el-form-item label="原因" prop="remark">
                    <el-input type="textarea" v-model="addForm.remark" :rows="5"></el-input>
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
            //表格数据
            tableData: [],
            activeName: 'first',//默认标签
            addshenheDialog:false,//申请审核弹出层
            addForm: {
                apply_id:'',
                name: '', //部门名称
                radio1: '1',
            },
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入原因' }],
            },

           
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
        handleClick(tab, event) {//切换选中的标签
        console.log(tab, event);
      },
      handleshenheEdit(index,row) {             
                const item = this.tableData[index];
                console.log(item);
                this.addForm.apply_id=item.apply_id;
          this.addshenheDialog=true;
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
            addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addshenheDialog = false;
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
        addSubmitForm(addForm) {
            console.log(this.addForm.radio1);
            console.log(this.addForm.apply_id);

            console.log(this.addForm.remark);
            // this.$refs.addFormRef.validate((valid) => {
            //     if (valid) {
            //         this.$http.post('/api/apply/applyaudit', {
            //             apply_id: this.form.apply_id,
            //             apply_audit: this.form.apply_audit,
            //             remark: this.form.remark
            //         }).then((res) => {
            //             if (res.data.success) {
            //                 this.$message.success(res.data.message);
            //                 this.getData(this.pageIndex);
            //             } else {
            //                 this.$message.error(res.data.message);
            //             }
            //         });
            //         this.addDialogVisible = false;
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        // 数据
        getData(pageIndex) {
               this.$http
                .post('/api/apply/getapplyprocessed', {
                    type: 1,
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
            // this.$http
            //     .post('/api/project/gettypelist', {
            //         no: '',
            //         name: this.keyword,
            //         pageIndex: pageIndex,
            //         pageSize: this.pageSize,
            //         fldSort: '',
            //         fldName: ''
            //     })
            //     .then((res) => {
            //         this.tableData = res.data.result.pageData;
            //         this.totalCount = res.data.result.totalItemCount;
            //         this.pageIndex = res.data.result.pageIndex;
            //         this.pageSize = res.data.result.pageSize;
            //     });
        },
    }
};
</script>
<style scoped>
</style>