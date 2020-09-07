<template>
    <div>
        <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :filter-node-method="filterNode"
            :default-expand-all="true"
            :default-checked-keys="[]"
            :props="defaultProps"
            ref="tree"
        ></el-tree>-->
        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索添加区域 -->
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-input
                        placeholder="角色名"
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
                    <el-button @click="add">添加权限</el-button>
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
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column label="账户余额" align="center">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" align="center" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="280" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        ></el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
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
                :total="400"
            ></el-pagination>

            <!-- 添加用户 -->
            <el-dialog
                title="添加权限"
                :visible.sync="addDialogVisible"
                width="600px"
                @close="addDialogClosed"
            >
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-tree
                            :data="data"
                            show-checkbox
                            node-key="id"
                            :filter-node-method="filterNode"
                            :default-expand-all="true"
                            :default-checked-keys="[]"
                            :props="defaultProps"
                            ref="tree"
                        ></el-tree>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="1">静默者</el-checkbox>
                            <el-checkbox :label="2">守望者</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogClosed">取 消</el-button>
                    <el-button @click="addSubmitForm('addForm')">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户 -->
            <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed"
            >
                <el-form
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editFormRef"
                    label-width="70px"
                >
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogClosed">取 消</el-button>
                    <el-button @click="editSubmitForm('editForm')">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data: function () {
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
            checkList:[],
            filterText: '',
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
            defaultProps: {
                children: 'children',
                label: 'label'
            },

            loading: true,
            name: '2',
            keyword: '',
            addForm: {
                name: ''
            },
            addFormRules: {
                name: [
                    { required: true, trigger: 'blur', message: '请输入用户名' },
                    { min: 3, max: 10, message: '用户名长度在3到10个字符之间' }
                ]
            },
            addDialogVisible: false, //添加对话框的显示隐藏

            editForm: {
                name: ''
            },
            editFormRules: {
                name: [
                    { required: true, trigger: 'blur', message: '请输入用户名' },
                    { min: 2, max: 10, message: '用户名长度在2到10个字符之间' }
                ]
            },
            editDialogVisible: false, //添加对话框的显示隐藏
            pageIndex: 1,
            pageSize: 10,
            tableData: [
                {
                    id: 1,
                    name: '张丹',
                    money: 1245.4,
                    thumb:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596175086941&di=1295a56df3fd7adeb0432262a1377772&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg',
                    address: '上海市浦东区',
                    state: '成功',
                    date: '2020-04-28'
                },
                {
                    id: 2,
                    name: '老师',
                    money: 321.4,
                    thumb:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596175086940&di=8561b6c6b958abf8b5f93e2de23a42ab&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fcc11728b4710b912d81c7b33c3fdfc0393452219.jpg',
                    address: '上海市浦东新区',
                    state: '未审核',
                    date: '2020-05-12'
                }
            ]
        };
    },
    methods: {
        // 检索
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
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
        // 监听 pagesize 改变事件
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // 监听页码值改变的事件
        handleCurrentChange(val) {
            this.pageIndex = val;
        },
        // 添加
        add() {
            this.addDialogVisible = true;
            // console.log(this.$refs.childRef.getData)//调用子组件的属性和方法
        },
        // 编辑
        handleEdit(item) {
            console.log(item);
            this.editForm = {
                name: item.name,
                pwd: item.id,
                email: item.email,
                mobile: item.mobile
            };
            this.editDialogVisible = true;
        },
        // 删除
        deleted(item) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData();
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 当前状态改变的时候
        swichChange(item) {},
        // 获取数据
        getData() {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        // 提交校验
        addSubmitForm(formName) {
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    this.addDialogVisible = false;
                    this.getData();
                }
            });
        },
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        },

        // 提交校验
        editSubmitForm(formName) {
            this.$refs.editFormRef.validate((valid) => {
                if (valid) {
                    this.editDialogVisible = false;
                    this.getData();
                }
            });
        },
        // 关闭弹窗
        editDialogClosed() {
            this.editForm = {
                name: '',
                email: '',
                mobile: '',
                pwd: ''
            };
            this.$refs.editFormRef.resetFields();
            this.editDialogVisible = false;
        }
    },
    created() {
        this.getData();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0;
}
p {
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout {
    color: #409eff;
}
</style>