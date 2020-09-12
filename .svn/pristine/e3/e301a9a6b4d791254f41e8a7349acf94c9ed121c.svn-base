<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">样本源管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">动物管理</div>
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
                        <!-- <div class="content_btn">
                            <img src="../../assets/img/loading.png" alt />
                            <p>重置</p>
                        </div>-->
                    </div>
                    <div class="btnContentRight">
                        <div class="content_btn success" v-has="'add'" @click="add">
                            <img src="../../../assets/img/add1.png" alt />
                            <p>新增动物</p>
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
                <el-table-column prop="no" label="唯一编码"></el-table-column>
                <el-table-column prop="animaltypestr" label="动物种类"> </el-table-column>
                <el-table-column prop="sampletypestr" label="样本种类"></el-table-column>
                <el-table-column prop="samplecount" label="样本数量"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex==1">公</span>
                        <span v-if="scope.row.status==2">母</span>
                    </template>
                </el-table-column>
                <el-table-column prop="position" label="存放位置"></el-table-column>
                <el-table-column prop="status" label="生存状态">
                    <template slot-scope="scope">
                        <div class="circle circle1" v-if="scope.row.status==1">
                            <div class="circle circle2"></div>
                        </div>
                        <div class="circle3" v-if="scope.row.status==2">
                            <div class="circle1 circle2"></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="200">
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
            :title="addForm.id?'编辑动物':'新建动物'"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="编码" prop="no">
                    <el-input v-model="addForm.no"></el-input>
                </el-form-item>
                <el-form-item label="动物类型" prop="animaltype">
                    <el-select v-model="addForm.animaltype">
                        <el-option
                            v-for="item in tableData1"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="样本类型" prop="sampletype">
                    <el-select v-model="addForm.sampletype">
                        <el-option
                            v-for="item in sampleList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="样本数量" prop="samplecount">
                    <el-input v-model="addForm.samplecount"></el-input>
                </el-form-item>
                <el-form-item label="动物年龄" prop="age">
                    <el-input v-model="addForm.age"></el-input>
                </el-form-item>
                <el-form-item label="动物性别" prop="sex">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio
                            v-for="(item,index) in sexList"
                            :key="index"
                            :label="item.id"
                            :value="item.id"
                        >{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生存状态" prop="status">
                    <el-radio-group v-model="addForm.status">
                        <el-radio :label="1">生</el-radio>
                        <el-radio :label="2">死</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="存放位置" prop="position">
                    <el-input v-model="addForm.position"></el-input>
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
import moment from 'moment';
export default {
    name: 'animal',
    data() {
        return {
            keyword: '', //关键字
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            tableData: [],
            addDialogVisible: false,
            addForm: {
                id: '',
                no:'',//编码
                animaltype:'',//动物类型
                animaltypestr:'',//动物名称
                sampletype:'',//样本类型
                sampletypestr:'',//样本名称
                samplecount:'',//样本数量
                age:'',//年龄
                sex:'',//公
                position:'',//存放位置
                status:'',//1生 2死
            },
            dropList: [], //组织列表
            addFormRules: {
                no: [{ required: true, trigger: 'blur', message: '请输入编码' }],
                animaltype: [{ required: true, trigger: 'blur', message: '请输入动物类型' }],
                sampletype: [{ required: true, trigger: 'blur', message: '请选择样本类型' }],
                samplecount: [{ required: true, trigger: 'blur', message: '请输入样本数量' }],
                age: [{ required: true, trigger: 'blur', message: '请输入年龄' }],
                sex: [{ required: true, trigger: 'blur', message: '请选择性别' }],
                position: [{ required: true, trigger: 'blur', message: '请输入存放位置' }],
                status: [{ required: true, trigger: 'blur', message: '请选择生存状态' }],
            },
            sexList:[
                {
                    id:1,
                    name:'公'
                },
                {
                    id:2,
                    name:'母'
                }
            ],
            sampleList: [//样本类型
                {
                    id: 1,
                    label: '样本1'
                },
                {
                    id: 2,
                    label: '样本2'
                },
                {
                    id: 3,
                    label: '样本3'
                }
            ],
            deleteList: [], //批量删除
            tableData1:[],//动物类型列表
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
            this.addForm = {
                id: item.id,
                no:item.no,//编码
                animaltype:item.animaltype,//动物类型
                animaltypestr:item.animaltypestr,//动物名称
                sampletype:item.sampletype,//样本类型
                sampletypestr:item.sampletypestr,//样本名称
                samplecount:item.samplecount,//样本数量
                age:item.age,//年龄
                sex:item.sex,//公
                position:item.position,//存放位置
                status:item.status,//1生 2死
            }
        },
        // 数据
        getData(pageIndex) {
            this.$http
                .post('/api/animal/getlist', {
                    no: this.keyword,
                    pageIndex: pageIndex,
                    pageSize: this.pageSize,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    let tempArr = res.data.result.pageData;
                    tempArr.forEach((item) => {
                      item.updatetime = item.updatetime==null?'暂无修改时间': moment(item.updatetime).format('YYYY-MM-DD');
                      item.createtime = item.createtime==null?'暂无创建时间': moment(item.createtime).format('YYYY-MM-DD');
                    });
                    this.tableData = tempArr;
                    this.pageIndex = res.data.result.pageIndex;
                    this.pageSize = res.data.result.pageSize;
                    this.totalCount = res.data.result.totalItemCount;
                });
        },
        // 新增
        add() {
            this.addForm = {
                 id: '',
                no:'',//编码
                animaltype:'',//动物类型
                animaltypestr:'',//动物名称
                sampletype:'',//样本类型
                sampletypestr:'',//样本名称
                samplecount:'',//样本数量
                age:'',//年龄
                sex:1,//公
                position:'',//存放位置
                status:1,//1生 2死
            };
            this.addDialogVisible = true;
        },
        // 提交
        addSubmitForm() {
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    let tempArr1 = this.tableData1;
                    let tempArr2 = this.sampleList;
                    tempArr1.forEach(item=>{
                        if(item.id==this.addForm.animaltype){
                            this.addForm.animaltypestr = item.name;
                        }
                    })
                    tempArr2.forEach(item=>{
                        if(item.id==this.addForm.sampletype){
                            this.addForm.sampletypestr = item.label;
                        }
                    })
                    if (this.addForm.id) {
                        //编辑
                        this.$http
                            .post('/api/animal/save', {
                                id: this.addForm.id,
                                no: this.addForm.no,
                                animaltype: this.addForm.animaltype,
                                animaltypestr: this.addForm.animaltypestr,
                                sampletype: this.addForm.sampletype,
                                sampletypestr: this.addForm.sampletypestr,
                                samplecount: parseInt(this.addForm.samplecount),
                                sex: this.addForm.sex,
                                age: parseInt(this.addForm.age),
                                position: this.addForm.position,
                                status: this.addForm.status,
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch((error) => {
                                this.$message.fail(error.message);
                            });
                    } else {
                        this.$http
                            .post('/api/animal/save', {
                                no: this.addForm.no,
                                animaltype: this.addForm.animaltype,
                                animaltypestr: this.addForm.animaltypestr,
                                sampletype: this.addForm.sampletype,
                                sampletypestr: this.addForm.sampletypestr,
                                samplecount: parseInt(this.addForm.samplecount),
                                sex: this.addForm.sex,
                                age: parseInt(this.addForm.age),
                                position: this.addForm.position,
                                status: this.addForm.status,
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.$message.success(res.data.message);
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch((error) => {
                                this.$message.fail(error.message);
                            });
                    }
                }
            });
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
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/animal/delete', { id: item.id }).then((res) => {
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
        // 获取动物列表
        getAnimalList(dictionarytypeid) {
            this.$http
                .post('/api/dictionary/getdictionaryvaluelist', {
                    dictionarytypeid: 16,
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    if (res.data.success) {
                        this.tableData1 = res.data.result.pageData;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    },
    created() {
        this.getData(1); //获取数据
        this.getAnimalList(); //获取动物列表
    }
};
</script>
<style scoped>
</style>