<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">系统管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">数据字典</div>
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
                    </div>
                    <div class="btnContentRight">
                        <div class="content_btn success" v-has="'add'" @click="add">
                            <img src="../../assets/img/add1.png" alt />
                            <p>新增数据</p>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="tab1">
                <li class="t1">数据类型</li>
                <li class="t1">数据</li>
                <li class="t1">操作</li>
                <div class="tab1Content" v-for="(item,index) in tableData" :key="index">
                    <li>
                        <i
                            v-if="showId == item.id"
                            class="el-icon-arrow-up"
                            @click="dpThis(item.id)"
                        ></i>
                        <i class="el-icon-arrow-down" v-else @click="changeTo(item.id)"></i>
                        {{item.no}}
                        <ul v-if="item.id ==showId?true:false">
                            <li v-for="(item1,index1) in tableData1" :key="index1">{{item1.no}}</li>
                        </ul>
                    </li>
                    <li>
                        {{item.name}}
                        <ul v-if="item.id ==showId?true:false">
                            <li v-for="(item1,index1) in tableData1" :key="index1">{{item1.name}}</li>
                        </ul>
                    </li>
                    <li>
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            v-has="'edit'"
                            @click="handleEdit(item)"
                        ></el-button>
                        <el-tooltip content="添加子集" :enterable="false" placement="top">
                            <el-button
                                size="mini"
                                type="warning"
                                icon="el-icon-plus"
                                v-has="'addChild'"
                                @click="handleAdd(item.id)"
                            ></el-button>
                        </el-tooltip>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            v-has="'delete'"
                            @click="handleDelete(item)"
                        ></el-button>
                        <ul v-if="item.id ==showId?true:false" class="ul1">
                            <li v-for="(item1,index1) in tableData1" :key="index1">
                                <el-button
                                    size="mini"
                                    type="success"
                                    icon="el-icon-edit"
                                    v-has="'edit'"
                                    @click="handleEdit(item1)"
                                ></el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    v-has="'delete'"
                                    @click="handleDelete(item1)"
                                ></el-button>
                            </li>
                        </ul>
                    </li>
                </div>
            </ul>
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
            :title="form.id?'编辑数据':'新建数据'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="form" :rules="formRules" ref="formRef" label-width="90px">
                <el-form-item label="数据" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="上级菜单" prop="parentid">
                    <el-select v-model="form.parentid">
                        <el-option
                            v-for="item in tableData"
                            :key="item.num"
                            :label="item.title"
                            :value="item.num"
                        ></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="数据类型" prop="no">
                    <el-input v-model="form.no"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button @click="sendForm('formRef')" plain>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showId: null, //展示哪一行数据
            toggle: false, //是否收起
            keyword: '', //关键字
            pageIndex: 1, //页码数
            pageSize: 10, //条数
            totalCount: 0, //总条数
            tableData: [], //表格数据
            tableData1: [], //子数据
            addDialogVisible: false,
            form: {
                id: '', //id
                name: '', //菜单名称
                no: '' //菜单
            },
            arr1: [],
            deleteList: [], //批量删除
            formRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入数据' }],
                no: [{ required: true, trigger: 'blur', message: '请输入数据类型' }]
            },
            IsAddChild: false, //是否为添加子集、
            childrenId: null //子集Id
        };
    },
    methods: {
        dpThis(Id) {
            this.showId = null;
        },
        // 切换
        changeTo(Id) {
            this.$http
                .post('/api/dictionary/getdictionaryvaluelist', {
                    dictionarytypeid: Id,
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.showId = Id;
                        this.tableData1 = res.data.result.pageData;
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
        // 添加子集
        handleAdd(Id) {
            console.log(Id);
            this.childrenId = Id;
            this.form.id = Id;
            this.IsAddChild = true;
            this.addDialogVisible = true;
        },
        // 编辑
        handleEdit(item) {
            console.log(item);
            this.addDialogVisible = true;
            this.form = {
                id: item.id, //id
                name: item.name, //菜单名称
                no: item.no
            };
        },
        // 插入
        addTo(item) {
            let tempArr = this.tableData;
            tempArr.forEach((item1) => {
                if (item1.id == item.id) {
                    tempArr.splice(index, 0);
                }
            });
            console.log(event, item);
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    if (!this.IsAddChild) {
                        this.$http.post('/api/dictionary/deletedictionarytype', { id: item.id }).then((res) => {
                            if (res.data.success) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                    } else {
                        this.$http.post('/api/dictionary/deletedictionaryvalue', { id: item.id }).then((res) => {
                            if (res.data.success) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                    }
                })
                .catch(() => {});
        },
        // 新增
        add() {
            this.IsAddChild = false;
            this.addDialogVisible = true;
            this.form = {
                id: '', //id
                name: '', //菜单名称
                no: ''
            };
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
        // 关闭弹窗
        addDialogClosed() {
            this.form = {
                id: '', //id
                name: '', //菜单名称
                no: ''
            };
            this.$refs.formRef.resetFields();
            this.addDialogVisible = false;
        },
        // 搜索
        search() {
            this.getData(1);
        },

        // 提交
        sendForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.id) {
                        if (!this.IsAddChild) {
                            //是否添加子集
                            this.$http
                                .post('/api/dictionary/savedictionarytype', {
                                    id: this.form.id,
                                    no: this.form.no,
                                    name: this.form.name
                                })
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$message.success(res.data.message);
                                        this.addDialogVisible = false;
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                });
                        } else {
                            //添加子集
                            this.$http
                                .post('/api/dictionary/savedictionaryvalue', {
                                    dictionarytypeid: this.form.id,
                                    no: this.form.no,
                                    name: this.form.name
                                })
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$message.success(res.data.message);
                                        this.addDialogVisible = false;
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                });
                        }
                    } else {
                        if (!this.IsAddChild) {
                            this.$http
                                .post('/api/dictionary/savedictionarytype', {
                                    no: this.form.no,
                                    name: this.form.name
                                })
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$message.success(res.data.message);
                                        this.addDialogVisible = false;
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                });
                        } else {
                            this.$http
                                .post('/api/dictionary/savedictionaryvalue', {
                                    dictionarytypeid: this.form.id,
                                    no: this.form.no,
                                    name: this.form.name
                                })
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$message.success(res.data.message);
                                        this.addDialogVisible = false;
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                });
                        }
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
        // 获取数据
        getData(pageIndex) {
            this.$http
                .post('/api/dictionary/getdictionarytypelist', {
                    name: this.keyword,
                    pageIndex: 1,
                    pageSize: 10,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.tableData = res.data.result.pageData;
                        this.totalCount = res.data.result.totalItemCount;
                        this.pageIndex = res.data.result.pageIndex;
                        this.pageSize = res.data.result.pageSize;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style scoped>
.yemian {
    width: 100%;
    height: auto;
}
.toggle {
    width: 30px;
    border: 1px solid #ededed;
}
.title {
    font-size: 18px;
    width: 100%;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
}
.tab1 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    border: 1px solid #ededed;
}
.tab1 .t1{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
}
.tab1 li {
    text-align: center;
    min-height: 40px;
    line-height: 40px;
    border-right: 1px solid #ededed;
    user-select: none;
}
.tab1 li i {
    cursor: pointer;
}
.tab1 li ul {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #ededed;
}
.tab1 li ul li {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    align-items: center;
    justify-content: center;
}
.tab1 li ul li:last-child{
    border-bottom: none;
}
.tab1Content {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
}
.tab1Content li {
    box-sizing: border-box;
    width: 33.33%;
}
.ul1 {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
}
.ul1 li {
    display: flex;
    flex-direction: row !important;
    justify-content: center !important;
}
</style>