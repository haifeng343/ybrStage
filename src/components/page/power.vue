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
                        @clear="getData(1)"
                        @keyup.enter.native="search"
                        class="input-with-select"
                    >
                        <el-button
                            slot="append"
                            type="primary"
                            icon="el-icon-search"
                            @click="search"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button v-has="'add'" @click="add">新建菜单</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="num"
                border
                class="table"
                height="700"
                :header-cell-style="{background:'#fff',color:'#606266'}"
                :row-class-name="tableRowClassName"
                default-expand-all
                :tree-props="{children: 'subs', hasChildren: 'hasChildren'}"
            >
                <el-table-column prop="title" label="菜单名称" width="500"></el-table-column>
                <!-- <el-table-column label="类型" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 1">菜单</span>
                        <span v-if="scope.row.type == 0">按钮</span>
                    </template>
                </el-table-column>-->
                <el-table-column prop="sort" label="排序" width="100"></el-table-column>
                <el-table-column prop="url" label="路径" width="200"></el-table-column>
                <!-- <el-table-column prop="name" label="需要权限" width="120"></el-table-column> -->
                <!-- <el-table-column prop="name" label="页面权限" width="400"></el-table-column> -->
                <el-table-column prop="name" label="图标" width="120">
                    <template slot-scope="scope">
                        <i v-if="scope.row.icon" :class="scope.row.icon"></i>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="sort" label="排序" width="80"></el-table-column> -->
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
        </el-card>
        <!-- 添加 -->
        <el-dialog
            :title="form.id?'编辑菜单':'新建菜单'"
            :visible.sync="addDialogVisible"
            width="40%"
            @close="addDialogClosed"
        >
            <el-form :model="form" :rules="formRules" ref="formRef" label-width="90px">
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" prop="parentid">
                    <el-select v-model="form.parentid">
                        <el-option
                            v-for="item in tableData"
                            :key="item.num"
                            :label="item.title"
                            :value="item.num"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="路径" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="排序值" prop="sort">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>

                <!-- 按钮权限 -->
                <div class="yemian">
                    <p class="title">按钮权限</p>
                    <el-button icon="el-icon-plus" plain @click="addPower">添加权限</el-button>
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column label="权限名" width="180">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="tdarr[scope.$index].title1"
                                    placeholder="请输入权限名"
                                    v-if="scope.row.checkbox"
                                ></el-input>
                                <span v-else>{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="权限值(唯一)" width="180">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="tdarr[scope.$index].value1"
                                    placeholder="请输入权限值"
                                    v-if="scope.row.checkbox"
                                ></el-input>
                                <span v-else>{{scope.row.value}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    icon="el-icon-edit"
                                    v-if="!scope.row.checkbox"
                                    @click="handleEditBtn(scope.$index, scope.row)"
                                ></el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    v-if="!scope.row.checkbox"
                                    @click="handleDeleteBtn(scope.$index,scope.row)"
                                ></el-button>

                                <el-button
                                    size="mini"
                                    v-if="scope.row.checkbox"
                                    @click="saveEditBtn(scope.$index, scope.row)"
                                >保存</el-button>
                                <el-button
                                    size="mini"
                                    v-if="scope.row.checkbox"
                                    @click="cancelBtn(scope.$index,scope.row)"
                                >取消</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button @click="sendForm('formRef')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: '', //关键字
            tableData: [], //数据
            tableData1: [], //按钮权限
            addDialogVisible: false,
            form: {
                id: '', //id
                name: '', //菜单名称
                parentid: '', //上级菜单
                url: '', //路径
                icon: '', //图标
                sort: '', //排序值
                btns: [], //按钮权限
                delbtns: [] //删除的按钮
            },
            arr1: [],
            formRules: {
                name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }]
            },
            tdarr: [],
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
            console.log(item);
            this.addDialogVisible = true;
            this.form = {
                id: item.num, //id
                name: item.title, //菜单名称
                parentid: item.pnum, //上级菜单
                url: item.url, //路径
                icon: item.icon, //图标
                sort: item.sort //排序值
            };
            this.tableData1 = item.btns;
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http.post('/api/menu/deletemenu', { id: item.num }).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData();
                    });
                })
                .catch(() => {});
        },
        // 新增
        add() {
            this.addDialogVisible = true;
            this.form = {
                id: '', //id
                name: '', //菜单名称
                parentid: '', //上级菜单
                url: '', //路径
                icon: '', //图标
                sort: '' //排序值
            };
        },
        //  this.$http.post('/api/organization/getdropdowntype',{}).then(res=>{
        //     console.log('typeList'+res)
        //   })
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.formRef.resetFields();
            this.addDialogVisible = false;
        },
        // 搜索
        search() {
            this.getData(1);
        },
        // 添加按钮权限
        addPower() {
            let tempArr = this.tableData1;
            tempArr.push({
                checkbox: false,
                num: 0,
                title: '权限名',
                value: '权限值'
            });
            this.tdarr.push({title1: '权限名', value1: '权限值'});
            this.tableData1 = tempArr;
        },
        // 编辑按钮权限
        handleEditBtn(index, item) {
            console.log(index, item);
            // let tempArr = this.tableData1;
            // tempArr.forEach((item1, index1) => {
            //     // item1.title1 = item1.title;
            //     // item1.value1 = item1.value;
            //     if (index == index1) {
            //         item1.checkbox = true;
            //     }
            // });
            this.tdarr = [];
            for (let v of this.tableData1) {
                this.tdarr.push({ title1: v.title, value1: v.value });
            }
            this.tableData1[index].checkbox = true;
            this.tableData1 =[...this.tableData1];
        },
        // 删除按钮
        handleDeleteBtn(index, item) {
            let tempArr = this.tableData1;
            tempArr.splice(index, 1);
            this.arr1.push(item.num);
            this.tableData1 = tempArr;
            this.form.delbtns = this.arr1;
        },

        // 保存按钮
        saveEditBtn(index, item) {
            let tempArr = this.tableData1;
            tempArr[index].title = this.tdarr[index].title1 ? this.tdarr[index].title1 : '权限名';
            tempArr[index].value = this.tdarr[index].value1 ? this.tdarr[index].value1 : 0;
            tempArr[index].checkbox = false;
            this.tableData1 = tempArr;
        },

        // 取消保存按钮
        cancelBtn(index, item) {
            let tempArr = this.tableData1;
            tempArr.forEach((item,index1)=>{
                if(index==index1){
            this.form.btns=this.tableData1;
                }
            })
            tempArr[index].checkbox = false;
            this.tableData1 = [...tempArr];
        },
        // 提交
        sendForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let tempArr = this.tableData1;
                    console.log(tempArr);
                    let arr = [];
                    tempArr
                        .filter((item) => {
                            return item;
                        })
                        .map((item) => {
                            arr.push({
                                id: item.num,
                                name: item.title,
                                value: item.value
                            });
                        });
                    // console.log(this.form.delbtns);return false;
                    if (this.form.id) {
                        this.$http
                            .post('/api/menu/savemenu', {
                                id: this.form.id,
                                parentid: this.form.parentid ? this.form.parentid : 0,
                                name: this.form.name,
                                icon: this.form.icon,
                                url: this.form.url,
                                sort: parseInt(this.form.sort),
                                btns: arr,
                                delbtns: this.form.delbtns ? this.form.delbtns : []
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
                            .post('/api/menu/savemenu', {
                                parentid: this.form.parentid ? this.form.parentid : 0,
                                name: this.form.name,
                                icon: this.form.icon,
                                url: this.form.url,
                                sort: parseInt(this.form.sort),
                                btns: arr,
                                delbtns: this.form.delbtns ? this.form.delbtns : []
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
                    this.getData(1);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 获取数据
        getData() {
            this.$http
                .post('/api/menu/getmenulist', {
                    name: this.keyword,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.tableData = res.data.result;
                    window.localStorage.setItem('sidebar',JSON.stringify(res.data.result))
                });
        }
    },
    created() {
        this.getData(1);
    }
};
</script>
<style scoped>
.yemian {
    width: 100%;
    height: auto;
}
.title {
    font-size: 18px;
    width: 100%;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
}
</style>