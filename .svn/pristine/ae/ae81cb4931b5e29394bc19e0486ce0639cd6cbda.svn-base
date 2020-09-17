<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">项目管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">项目项目</div>
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
                            <p>新增项目</p>
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
                <el-table-column prop="no" label="项目编号" width="160"></el-table-column>
                <el-table-column prop="name" label="项目名称" width="400"></el-table-column>
                <el-table-column prop="type" label="项目类型" width="200"></el-table-column>
                <el-table-column prop="user" label="所属人" width="200"></el-table-column>
                <el-table-column prop="remark" label="项目描述"></el-table-column>
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
            :title="addForm.id?'编辑项目':'新建项目'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="项目编号" prop="no">
                    <el-input v-model="addForm.no" placeholder="请输入项目编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="typeid">
                    <el-select v-model="addForm.typeid" placeholder="请选择项目类型">
                        <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属人" prop="userid">
                    <el-select v-model="addForm.userid" placeholder="请选择所属人">
                        <el-option
                            v-for="item in userList"
                            :key="item.userid"
                            :label="item.username"
                            :value="item.userid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目简介" prop="remark">
                    <el-input v-model="addForm.remark" type="textarea" placeholder="请输入项目简介" rows="4"></el-input>
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
            userList: [], //用户列表
            typeList: [], //项目类型列表
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
                remark: '', //简介
                typeid:'',//项目类型
                type:'',//项目类型名称
                typeno:'',//项目类型编号
                userid:'',//所属人
                user:'',//所属人名称
            },
            deleteList: [], //批量删除
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入项目名称' }],
                no: [{ required: true, trigger: 'blur', message: '请输入项目编号' }],
                typeid: [{ required: true, trigger: 'blur', message: '请输入项目类型' }],
                userid: [{ required: true, trigger: 'blur', message: '请输入所属人' }],
            }
        };
    },
    mounted() {
        this.getData(1);
        this.getUserList();
        this.getTypeList();
    },
    methods: {
        // 获取项目类型列表
        getTypeList() {
            this.$http
                .post('/api/project/gettypelist', {
                    no: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.typeList = res.data.result.pageData;
                });
        },
        // 获取用户列表
        getUserList() {
            this.$http
                .post('/api/user/getuserinfo', {
                    search: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.userList = res.data.result.pageData;
                    } else {
                        this.$message.error(res.data.message);
                    }
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
          console.log(item)
            this.addForm = {
                id: item.id, //Id
                name: item.name, //名称
                no: item.no, //编号
                remark: item.remark, //简介
                typeid:item.typeid,//项目类型
                type:item.type,//项目类型名称
                userid:item.userid,//所属人
                user:item.user,//所属人名称
            },
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
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/project/delete', { id: item.id }).then((res) => {
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
                  let tempArr = this.typeList;
                  let tempArr1 = this.userList;
                  tempArr.forEach(item=>{
                    if(item.id == this.addForm.typeid){
                      this.addForm.type=item.name;
                      this.addForm.typeno=item.no;
                    }
                  })
                  tempArr1.forEach(item=>{
                    if(item.userid == this.addForm.userid){
                      this.addForm.user=item.username;
                    }
                  })
                    if (this.addForm.id) {
                        this.$http
                            .post('/api/project/save', {
                                id: this.addForm.id,
                                no: this.addForm.no,
                                name: this.addForm.name,
                                typeid:this.addForm.typeid,
                                type:this.addForm.type,
                                typeno:this.addForm.typeno,
                                userid:this.addForm.userid,
                                user:this.addForm.user,
                                remark: this.addForm.remark
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                        this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    } else {
                        this.$http
                            .post('/api/project/save', {
                                no: this.addForm.no,
                                name: this.addForm.name,
                                typeid:this.addForm.typeid,
                                type:this.addForm.type,
                                typeno:this.addForm.typeno,
                                userid:this.addForm.userid,
                                user:this.addForm.user,
                                remark: this.addForm.remark
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                        this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    }
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
                .post('/api/project/getlist', {
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
                remark: '', //简介
                typeid:'',//项目类型
                type:'',//项目类型名称
                typeno:'',//项目类型编号
                userid:'',//所属人
                user:'',//所属人名称
            },
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