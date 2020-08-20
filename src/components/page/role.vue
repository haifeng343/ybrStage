<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">系统管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">角色管理</div>
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
                            <img src="../../assets/img/add1.png" alt />
                            <p>新增角色</p>
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
                <el-table-column prop="rolename" label="角色名称" width="400"></el-table-column>
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
                        :show-checkbox="true"
                        ref="tree"
                        node-key="num"
                        @check-change="changeTree"
                        :getCheckedKeys="currentList"
                        :default-expand-all="true"
                        :default-checked-keys="addForm.checkmenus"
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
            data: [],
            currentList: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            defaultList: [], //默认选中的数组
            defaultProps: {
                //树形格式
                children: 'subs',
                label: 'title'
            },
            //表格数据
            tableData: [],
            addDialogVisible: false,
            addForm: {
                id: '', //Id
                name: '', //部门名称
                prev: '', //上级部门
                checkmenus: [] //已选菜单数组
            },
            deleteList:[],//批量删除
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }]
            }
        };
    },
    mounted() {
        this.getData(1);
    },
    methods: {
        // 批量勾选
        handleSelectionChange(e) {
            let arr = [];
            if (e.length > 0) {
                e.filter((item) => {
                    return item;
                }).map((item) => {
                    arr.push(item.roleid);
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
            // this.getCheckRole(item.roleid, item.organizationid);
            this.getMenuList(); //权限列表
            this.addDialogVisible = true;

            let role;
            if (item.menuids) {
                role = item.menuids.split(',');
                for (let i = 0; i < role.length; i++) {
                    role[i] = Number(role[i]);
                }
            }
            console.log(role)

            this.addForm.checkmenus = role;
            this.addForm.id = item.roleid;
            this.addForm.name = item.rolename;
        },
        // 获取用户权限
        // getCheckRole(roleid, organizationid) {
        //     this.$http
        //         .post('/api/role/getcheckrole', {
        //             roleid: roleid,
        //             organizationid: organizationid
        //         })
        //         .then((res) => {
        //             let tempArr = res.data.result.menus;
        //             let arr = [];
        //             tempArr.forEach((item) => {
        //                 arr.push(item.num);
        //             });
        //             this.addForm.checkmenus = arr;
        //         });
        // },
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
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(() => {
                    this.$http.post('/api/role/deleterole', { id: item.roleid }).then((res) => {
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
            this.$confirm('此操作将永久删除勾选的角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/role/deleteroles', { id: this.deleteList }).then((res) => {
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
                            .post('/api/role/savecheckrole', {
                                roleid: this.addForm.id,
                                rolename: this.addForm.name,
                                checkmenus: this.addForm.checkmenus,
                                issystem: true,
                                organizationid: 0
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    } else {
                        this.$http
                            .post('/api/role/savecheckrole', {
                                rolename: this.addForm.name,
                                checkmenus: this.addForm.checkmenus,
                                issystem: true,
                                organizationid: 0
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    this.addDialogVisible = false;
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
                .post('/api/role/getrolelist', {
                    organizationid: 0,
                    rolename:this.keyword,
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
                name: '', //部门名称
                prev: '', //上级部门
                checkmenus: [] //已选菜单数组
            };
            this.addDialogVisible = true;
            this.getMenuList(); //权限列表
        },
        //  this.$http.post('/api/organization/getdropdowntype',{}).then(res=>{
        //     console.log('typeList'+res)
        //   })
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        },
        // 权限列表
        getMenuList() {
            this.$http
                .post('/api/menu/getmenulist', {
                    name: '',
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.data = res.data.result;
                });
        }
    },
};
</script>
<style scoped>
</style>