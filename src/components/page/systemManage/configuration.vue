<template>
    <div>
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
                            <p>新增流程节点</p>
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
                height="560"
                :header-cell-style="{background:'#fff',color:'#606266'}"
                :row-class-name="tableRowClassName"
            >
                <el-table-column :resizable="false" prop="id" label="ID" width="50"></el-table-column>
                <el-table-column :resizable="false" label="节点类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.nodetype==0">节点开始</span>
                        <span v-if="scope.row.nodetype==1">节点流转</span>
                        <span v-if="scope.row.nodetype==2">任务结束</span>
                    </template>
                </el-table-column>
                <el-table-column :resizable="false" prop="node_name" label="操作名称" width="200"></el-table-column>
                <el-table-column :resizable="false" prop="fun" label="执行业务方法" width="200"></el-table-column>
                <el-table-column :resizable="false" prop="audit_user" label="审核人" width="200"></el-table-column>
                <el-table-column :resizable="false" prop="audit_role" label="审核角色" width="200"></el-table-column>
                <el-table-column :resizable="false" prop="audit_csuser" label="抄送人" width="200"></el-table-column>
                <el-table-column :resizable="false" prop="audit_csrole" label="抄送角色" width="200"></el-table-column>
                <el-table-column :resizable="false" prop="createtime" label="创建时间" width="200"></el-table-column>
                <el-table-column :resizable="false" label="操作" fixed="right" width="200">
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
        <el-dialog :close-on-click-modal="false"
            :title="addForm.id?'编辑流程节点':'新建流程节点'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="节点名称" prop="node_name">
                    <el-input v-model="addForm.node_name" placeholder="请输入节点名称"></el-input>
                </el-form-item>
                <el-form-item label="节点类型" prop="nodetype">
                    <el-select v-model="addForm.nodetype" placeholder="请选择节点类型">
                        <el-option
                            v-for="(item,index) in nodeList"
                            :key="index"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行业务" prop="fun">
                    <el-select v-model="addForm.fun" clearable placeholder="请选择执行业务">
                        <el-option
                            v-for="(item,index) in nodeNameList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上步操作" prop="parentid">
                    <el-select v-model="addForm.parentid" clearable placeholder="请选择上步操作">
                        <el-option
                            v-for="(item,index) in tableData"
                            :key="index"
                            :value="item.id"
                            :label="item.node_name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人" prop="audit_userid">
                    <el-select v-model="addForm.audit_userid" multiple placeholder="请选择审核人">
                        <el-option
                            v-for="(item,index) in userList"
                            :key="index"
                            :value="item.userid"
                            :label="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核角色" prop="audit_roleid">
                    <el-select v-model="addForm.audit_roleid" multiple placeholder="请选择审核角色">
                        <el-option
                            v-for="(item,index) in roleList"
                            :key="index"
                            :value="item.roleid"
                            :label="item.rolename"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="抄送人" prop="audit_csuserid">
                    <el-select v-model="addForm.audit_csuserid" multiple placeholder="请选择抄送人">
                        <el-option
                            v-for="(item,index) in userList"
                            :key="index"
                            :value="item.userid"
                            :label="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="抄送角色" prop="audit_csroleid">
                    <el-select v-model="addForm.audit_csroleid" multiple placeholder="请选择抄送角色">
                        <el-option
                            v-for="(item,index) in roleList"
                            :key="index"
                            :value="item.roleid"
                            :label="item.rolename"
                        ></el-option>
                    </el-select>
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
import moment from 'moment';
export default {
    data() {
        return {
            keyword: '', //关键字
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            flowdefid: parseInt(this.$route.query.flowdefid),
            //表格数据
            tableData: [],
            addDialogVisible: false,
            addForm: {
                id: '', //当前id
                parentid: '', //父节点
                nodetype: '', //节点类型
                node_name: '', //节点名称
                fun: '', //执行业务
                audit_csuserid: '', //抄送人
                audit_csuser: '', //抄送人
                audit_csroleid: 0, //抄送角色
                audit_csrole: '', //抄送角色
                audit_userid: '', //审核人
                audit_user: '', //审核人
                audit_roleid: 0, //审核角色
                audit_role: '' //审核角色
            },
            nodeList: [
                //节点类型
                {
                    id: 0,
                    name: '节点开始'
                },
                {
                    id: 1,
                    name: '节点流转'
                },
                {
                    id: 2,
                    name: '任务结束'
                }
            ],
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入流程节点名称' }],
                no: [{ required: true, trigger: 'blur', message: '请输入流程节点编号' }],
                cardno: [{ required: true, trigger: 'blur', message: '请输入身份证号' }],
                visittimestr: [{ required: true, trigger: 'blur', message: '请选择回访时间' }],
                visitdesc: [{ required: true, trigger: 'blur', message: '请输入回访流程节点' }]
            },
            userList: [], //用户列表
            roleList: [], //角色列表
            nodeNameList: [] //操作列表
        };
    },
    mounted() {
        this.flowdefid = parseInt(this.$route.query.flowdefid);
        this.getData(1);
        this.getUser();
        this.getRole();
        this.getNode();
    },
    methods: {
        // 操作列表
        getNode() {
            this.$http.post('/api/flow/getselectflownodename', {}).then((res) => {
                if (res.data.success) {
                    let tempArr = res.data.result;
                    tempArr.shift(0, 1);
                    this.nodeNameList = tempArr;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取用户列表
        getUser() {
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
                        let tempArr1 = [];
                        let tempArr = res.data.result.pageData;
                        tempArr.forEach((item) => {
                            if (item.nickname) {
                                tempArr1.push(item);
                            }
                        });
                        this.userList = tempArr1;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        // 权限列表
        getRole() {
            this.$http
                .post('/api/role/getrolelist', {
                    organizationid: 0,
                    rolename: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.roleList = res.data.result.pageData;
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
        // 新增
        add() {
            this.addForm = {
                id: '',
                parentid: null, //
                nodetype: '', //节点类型
                node_name: '', //节点名称
                fun: '', //执行业务
                audit_csuserid: '', //抄送人
                audit_csuser: '', //抄送人
                audit_csroleid: 0, //抄送角色
                audit_csrole: '', //抄送角色
                audit_userid: '', //审核人
                audit_user: '', //审核人
                audit_roleid: 0, //审核角色
                audit_role: '' //审核角色
            };
            this.addDialogVisible = true;
        },
        // 编辑
        handleEdit(item) {
            console.log(item);
            // 格式转化
            let role = [],
                role1 = [],
                user = [],
                user1 = [];
            if (item.audit_roleid) {
                role = item.audit_roleid.split(',');
                for (let i = 0; i < role.length; i++) {
                    role[i] = Number(role[i]);
                }
            }
            if (item.audit_csroleid) {
                role1 = item.audit_csroleid.split(',');
                for (let i = 0; i < role1.length; i++) {
                    role1[i] = Number(role1[i]);
                }
            }
            if (item.audit_csuserid) {
                user = item.audit_csuserid.split(',');
                for (let i = 0; i < user.length; i++) {
                    user[i] = Number(user[i]);
                }
            }
            if (item.audit_userid) {
                user1 = item.audit_userid.split(',');
                for (let i = 0; i < user1.length; i++) {
                    user1[i] = Number(user1[i]);
                }
            }

            this.addForm = {
                id: item.id,
                parentid: item.parentid, //
                nodetype: item.nodetype, //节点类型
                node_name: item.node_name, //节点名称
                fun: item.fun, //执行业务
                audit_csuserid: user, //抄送人
                audit_csuser: item.audit_csuser, //抄送人
                audit_csroleid: role1, //抄送角色
                audit_csrole: item.audit_csrole, //抄送角色
                audit_userid: user1, //审核人
                audit_user: item.audit_user, //审核人
                audit_roleid: role, //审核角色
                audit_role: item.audit_role //审核角色
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
            this.$confirm('此操作将永久删除该流程节点, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/flow/deleteconfig', { id: item.id }).then((res) => {
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
            let that = this;
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    let userArr = this.userList;
                    let roleList1 = this.roleList;
                    let arr1 = [],
                        arr2 = [],
                        arr3 = [],
                        arr4 = [];
                    userArr.forEach((item) => {
                        if (this.addForm.audit_userid) {
                            this.addForm.audit_userid.forEach((item1) => {
                                if (item1 == item.userid) {
                                    arr1.push(item.nickname);
                                }
                            });
                        }
                        if (this.addForm.audit_csuserid) {
                            this.addForm.audit_csuserid.forEach((item2) => {
                                if (item2 == item.userid) {
                                    arr2.push(item.nickname);
                                }
                            });
                        }
                    });
                    roleList1.forEach((item) => {
                        if (this.addForm.audit_csroleid.length) {
                            this.addForm.audit_csroleid.forEach((item1) => {
                                if (item1 == item.roleid) {
                                    arr3.push(item.rolename);
                                }
                            });
                        }
                        if (this.addForm.audit_roleid.length) {
                            this.addForm.audit_roleid.forEach((item2) => {
                                if (item2 == item.roleid) {
                                    arr4.push(item.rolename);
                                }
                            });
                        }
                    });
                    if (this.addForm.id) {
                        this.$http
                            .post('/api/flow/saveconfig', {
                                id: this.addForm.id,
                                flowdefid: this.flowdefid,
                                parentid: this.addForm.parentid || 0,
                                nodetype: this.addForm.nodetype,
                                node_name: this.addForm.node_name,
                                fun: this.addForm.fun,
                                audit_csuserid: this.addForm.audit_csuserid,
                                audit_csuser: arr2,
                                audit_csroleid: this.addForm.audit_csroleid,
                                audit_csrole: arr3,
                                audit_userid: this.addForm.audit_userid,
                                audit_user: arr1,
                                audit_roleid: this.addForm.audit_roleid,
                                audit_role: arr4
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    that.getData(that.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    } else {
                        this.$http
                            .post('/api/flow/saveconfig', {
                                flowdefid: this.flowdefid,
                                parentid: this.addForm.parentid || 0,
                                nodetype: this.addForm.nodetype,
                                node_name: this.addForm.node_name,
                                fun: this.addForm.fun,
                                audit_csuserid: this.addForm.audit_csuserid,
                                audit_csuser: arr2,
                                audit_csroleid: this.addForm.audit_csroleid,
                                audit_csrole: arr3,
                                audit_userid: this.addForm.audit_userid,
                                audit_user: arr1,
                                audit_roleid: this.addForm.audit_roleid,
                                audit_role: arr4
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    that.getData(that.pageIndex);
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
                .post('/api/flow/getlistconfig', {
                    flowdefid: this.flowdefid,
                    node_name: this.keyword,
                    pageIndex: pageIndex,
                    pageSize: this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    let tempArr = res.data.result.pageData;
                    tempArr.forEach((item) => {
                        item.createtime = moment(item.createtime).format('YYYY-MM-DD');
                    });
                    this.tableData = tempArr;
                    this.totalCount = res.data.result.totalItemCount;
                    this.pageIndex = res.data.result.pageIndex;
                    this.pageSize = res.data.result.pageSize;
                });
        },

        // 关闭弹窗
        addDialogClosed() {
            this.addForm = {
                patientid: this.addForm.patientid, //病人id
                patientrmationid: this.addForm.patientrmationid, //病人档案id
                name: '', //病人名称
                no: '', //病人编号
                cardno: '', //身份证号
                visittimestr: '', //回访时间
                visitdesc: '' //回访简介
            };
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    }
};
</script>
<style scoped>
</style>