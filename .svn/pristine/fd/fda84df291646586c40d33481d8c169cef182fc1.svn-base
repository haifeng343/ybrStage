<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">样本管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">样本类型</div>
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
                        <div class="content_btn error" v-has="'delete'" @click="deleteAll">
                            <img src="../../../assets/img/delete1.png" alt />
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
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="no" label="类型编号" width="200"></el-table-column>
                <el-table-column prop="name" label="类型名称"></el-table-column>
                <el-table-column prop="containername" label="存储容器"></el-table-column>
                <el-table-column prop="temperaturename" label="存储温度"></el-table-column>
                <el-table-column prop="createuser" label="创建人" width="200"></el-table-column>
                <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
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
            :title="addForm.id?'编辑类型':'新建类型'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="类型编号" prop="no">
                    <el-input v-model="addForm.no" placeholder="请输入类型编号"></el-input>
                </el-form-item>
                <el-form-item label="样本类型" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入样本类型"></el-input>
                </el-form-item>
                <el-form-item label="组织类型" prop="nametype">
                    <el-select v-model="addForm.nametype" placeholder="请输入组织类型">
                        <el-option
                            v-for="item in originList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="储存容器" prop="container">
                    <el-select v-model="addForm.container" multiple placeholder="请输入储存容器">
                        <el-option
                            v-for="item in containerList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="储存温度" prop="temperature">
                    <el-select
                        v-model="addForm.temperature"
                        :disabled="!addForm.container"
                        multiple
                        placeholder="请输入储存温度"
                    >
                        <el-option
                            v-for="item in temperatureList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
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
                name: '', //样本类型
                icon: '', //样本类型icon
                no: '', //编号
                nametype: '', //组织类型
                container: [], //储存容器
                temperature: [] //储存温度
            },
            originList: [
                //组织类型
                {
                    id: 1,
                    name: '正常组织'
                },
                {
                    id: 2,
                    name: '癌'
                },
                {
                    id: 3,
                    name: '癌旁'
                }
            ],
            containerList: [], //容器列表
            temperatureList: [], //温度
            deleteList: [], //批量删除
            addFormRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入类型名称' }],
                no: [{ required: true, trigger: 'blur', message: '请输入类型编号' }],
                nametype: [{ required: true, trigger: 'blur', message: '请选择组织类型' }],
                container: [{ required: true, trigger: 'blur', message: '请选择储存容器' }]
            }
        };
    },
    mounted() {
        this.getContainer();
        this.getData(1);
    },
    methods: {
        // 容器、温度
        getContainer() {
            // 容器
            this.$http
                .post('/api/dictionary/getdictionaryvaluelist', {
                    dictionarytypeid: 56,
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.containerList = res.data.result.pageData;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            // 温度
            this.$http
                .post('/api/dictionary/getdictionaryvaluelist', {
                    dictionarytypeid: 55,
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.temperatureList = res.data.result.pageData;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        // 批量勾选
        handleSelectionChange(e) {
            let arr = [];
            if (e.length > 0) {
                e.filter((item) => {
                    return item;
                }).map((item) => {
                    arr.push(item.id);
                });
            }
            this.deleteList = arr;
        },
        // 编辑
        handleEdit(item) {
            let arr = [],
                arr1 = [];
            if (item.container) {
                arr = item.container.split(',');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = Number(arr[i]);
                }
            }
            if (item.temperature) {
                arr1 = item.temperature.split(',');
                for (let i = 0; i < arr1.length; i++) {
                    arr1[i] = Number(arr1[i]);
                }
            }
            this.addForm = {
                id: item.id,
                no: item.no,
                name: item.name,
                remark: item.remark,
                icon: item.icon,
                nametype: item.nametype,
                container: arr,
                temperature: arr1
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
            this.$confirm('此操作将永久删除该样本类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/sampletype/deletesampletype', { id: item.id }).then((res) => {
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
            this.$confirm('此操作将永久删除勾选的样本类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/sampletype/deletesampletypes', { id: this.deleteList }).then((res) => {
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
                            .post('/api/sampletype/savesampletype', {
                                id: this.addForm.id,
                                no: this.addForm.no,
                                name: this.addForm.name,
                                icon: this.addForm.icon,
                                nametype: this.addForm.nametype + '',
                                containers: this.addForm.container,
                                temperatures: this.addForm.temperature
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
                            .post('/api/sampletype/savesampletype', {
                                no: this.addForm.no,
                                name: this.addForm.name,
                                nametype: this.addForm.nametype + '',
                                icon: this.addForm.icon,
                                containers: this.addForm.container,
                                temperatures: this.addForm.temperature
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
                    return false;
                }
            });
        },
        // 数据
        getData(pageIndex) {
            this.$http
                .post('/api/sampletype/getsampletypelist', {
                    name: this.keyword,
                    pageIndex: pageIndex,
                    pageSize: this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    let tempArr1 = res.data.result.pageData;
                    tempArr1.forEach((item) => {
                        item.containername = [];
                        item.temperaturename = [];
                        let a = item.container.split(',');
                        this.containerList.forEach(item1 => {
                            a.forEach(item2 => {
                                if(item1.id == item2){
                                    item.containername.push(item1.name);
                                }
                            });
                        });
                        let b = item.temperature.split(',');
                        this.temperatureList.forEach(item1 => {
                            b.forEach(item2 => {
                                if(item1.id == item2){
                                    item.temperaturename.push(item1.name);
                                }
                            });
                        });
                        item.containername = item.containername.join('，')
                        item.temperaturename = item.temperaturename.join('，')
                    });
                    this.tableData = tempArr1;
                    this.totalCount = res.data.result.totalItemCount;
                    this.pageIndex = res.data.result.pageIndex;
                    this.pageSize = res.data.result.pageSize;
                });
        },
        // 新增
        add() {
            this.addForm = {
                id: '', //Id
                name: '', //样本类型
                icon: '', //样本类型icon
                no: '', //编号
                nametype: '', //组织类型
                container: [], //储存容器
                temperature: [] //储存温度
            };
            this.addDialogVisible = true;
        },
        // 关闭弹窗
        addDialogClosed() {
            this.addForm = {
                id: '', //Id
                name: '', //样本类型
                icon: '', //样本类型icon
                no: '', //编号
                nametype: '', //组织类型
                container: [], //储存容器
                temperature: [] //储存温度
            };
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    }
};
</script>
<style scoped>
.checkboxList {
    display: flex;
    flex-direction: column;
}
</style>