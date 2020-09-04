<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">样本源管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">病人管理</div>
        </div>
        <!-- 卡片视图 -->
        <div class="btnsRight">
            <div
                :class="['btnsItem',item.id==showId?'btnActive':'']"
                v-for="item in saasList"
                :key="item.id"
                @click="setActive(item.id)"
            >{{item.name}}</div>
        </div>
        <el-card>
            <!-- 搜索添加区域 -->
            <!-- <el-row :gutter="20" v-if="showId==1">
                <el-col :span="2">
                    <el-button plain>信息导入</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button plain>信息导出</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button plain @click="add">录入病人信息</el-button>
                </el-col>
                <el-col :span="5" ::offset="13">
                    <el-input
                        placeholder="请输入内容"
                        v-model="keyword"
                        clearable
                        ref="mark"
                        @clear="getData(1)"
                        @keydown.native.enter="search"
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
            </el-row> -->
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
                            <p>新增组织</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 数据表格 -->
            <el-table
                :data="moreTypeList"
                border
                class="table"
                height="700"
                v-if="showId==2"
                :header-cell-style="{background:'#fff',color:'#606266'}"
                :row-class-name="tableRowClassName"
            >
                <el-table-column prop="name" fixed label="疾病分类" align="center"></el-table-column>
            </el-table>

            <!-- 数据表格 -->
            <el-table
                :data="tableData"
                border
                class="table"
                height="600"
                v-if="showId==1"
                :header-cell-style="{background:'#fff',color:'#606266'}"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="cardno" label="身份证号" width="200" align="center"></el-table-column>
                <el-table-column prop="name" label="病人名称" width="160" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="160" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex==0">未知</span>
                        <span v-if="scope.row.sex==1">男</span>
                        <span v-if="scope.row.sex==2">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="80" align="center"></el-table-column>
                <el-table-column prop="tumortype" label="肿瘤类型" width="160" align="center"></el-table-column>
                <el-table-column prop="therapy" label="治疗方法" width="200" align="center"></el-table-column>
                <el-table-column prop="cardno" label="生存状态" width="100" align="center"></el-table-column>
                <el-table-column prop="cardno" label="回访记录" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleVisited(scope.row)">查看记录</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="updatetime" label="修改日期" width="200" align="center"></el-table-column>
                <el-table-column label="操作" width="280" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        ></el-button>
                        <el-tooltip content="所有样本" :enterable="false" placement="top">
                            <el-button
                                size="mini"
                                type="warning"
                                icon="el-icon-edit-outline"
                                @click="changePwd(scope.$index, scope.row)"
                            ></el-button>
                        </el-tooltip>
                        <!-- <el-tooltip content="跳转详情" :enterable="false" placement="top">
                            <el-button
                                size="mini"
                                type="warning"
                                icon="el-icon-price-tag"
                                @click="handleDrag(scope.$index, scope.row)"
                            ></el-button>
                        </el-tooltip>-->
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
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
                v-if="showId==1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
            ></el-pagination>

            <!-- 添加用户 -->
            <el-dialog
                :title="addForm.id?'编辑病人信息:':'病人信息录入:'"
                :visible.sync="addDialogVisible"
                width="60%"
                @close="addDialogClosed"
            >
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="编号" prop="no">
                                <el-input type="text" v-model="addForm.no" placeholder="请输入编号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"></el-col>
                        <el-col :span="7">
                            <el-form-item label="病人名字" prop="name">
                                <el-input type="text" v-model="addForm.name" placeholder="请输入病人名字"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <el-form-item label="身份证号" prop="cardno">
                                <el-input
                                    type="number"
                                    v-model="addForm.cardno"
                                    placeholder="请输入身份证号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <el-form-item label="联系方式" prop="tel">
                                <el-input type="number" v-model="addForm.tel" placeholder="请输入联系方式"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="年龄" prop="age">
                                <el-input type="text" v-model="addForm.age" placeholder="请输入病人年龄"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="sex" @change="changeSex">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="2">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <el-form-item label="肿瘤类型" prop="tumortypeid">
                                <el-select
                                    v-model="addForm.tumortypeid"
                                    @change="changeTumorType"
                                    placeholder="请选择肿瘤类型"
                                >
                                    <el-option
                                        :label="item.name"
                                        :value="item.key"
                                        v-for="item in moreTypeList"
                                        :key="item.key"
                                    >{{item.name}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="地址" prop="address">
                                <el-input type="text" v-model="addForm.address" placeholder="请输入地址"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <el-form-item label="家属电话" prop="familycontact">
                                <el-input
                                    type="text"
                                    v-model="addForm.familycontact"
                                    placeholder="请输入家属联系方式"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <el-form-item label="生日" prop="birthdatestr">
                                <el-date-picker
                                    v-model="addForm.birthdatestr"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="治疗方法" prop="therapy">
                        <el-input
                            type="textarea"
                            :rows="5"
                            v-model="addForm.therapy"
                            placeholder="请输入治疗方法"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="使用药物" prop="medicine">
                        <el-input
                            type="textarea"
                            :rows="5"
                            v-model="addForm.medicine"
                            placeholder="请输入使用药物"
                        ></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="描述" prop="remark">
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入内容"
                                    v-model="addForm.remark"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <template v-if="tableData1.length > 0">
                        <el-row>
                            <table class="table1" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <el-col :span="8">
                                            <td>检查项</td>
                                        </el-col>
                                        <el-col :span="16">
                                            <td>检查结果</td>
                                        </el-col>
                                    </tr>
                                    <tr v-for="(item,index) in tableData1" :key="index">
                                        <div v-if="item.type==1">
                                            <el-col :span="8">
                                                <td>{{item.colname}}</td>
                                            </el-col>
                                            <el-col :span="16">
                                                <td>
                                                    <el-select
                                                        class="borderNone"
                                                        v-model="item.key"
                                                        @change="changeValue(item)"
                                                        placeholder="请选择检查项"
                                                    >
                                                        <el-option
                                                            v-for="(item1,index1) in item.values"
                                                            :key="index1"
                                                            :value="item1"
                                                        >{{item1}}</el-option>
                                                    </el-select>
                                                </td>
                                            </el-col>
                                        </div>
                                        <div v-if="item.type==2">
                                            <el-col :span="8">
                                                <td>附件</td>
                                            </el-col>
                                            <el-col :span="16">
                                                <td></td>
                                            </el-col>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </el-row>
                    </template>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogClosed">取 消</el-button>
                    <el-button v-if="!addForm.id" @click="addDialogClosed">保存并继续录入</el-button>
                    <el-button @click="addSubmitForm('addForm')">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    data() {
        // 校验手机号
        var checkMobile = (rule, value, cb) => {
            const regMbole = /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/;
            if (regMbole.test(value)) {
                return cb();
            }
            cb(new Error('请输入正确的手机号'));
        };
        return {
            showId: 1, //1病人信息列表 2疾病分类
            saasList: [
                {
                    id: 1,
                    name: '疾病信息列表'
                },
                {
                    id: 2,
                    name: '疾病分类'
                }
            ],
            sexList: [
                {
                    id: 1,
                    name: '男'
                },
                {
                    id: 2,
                    name: '女'
                }
            ],
            value: 1,
            loading: true,
            name: '2',
            keyword: '',
            sex: 1,
            addForm: {
                id: '',
                no: '', //编号
                name: '', //名字
                cardno: '', //身份证号码
                birthdatestr: '', //出生年月
                tel: '', //联系电话
                address: '', //联系地址
                sex: 1, //性别
                age: '', //年龄
                tumortypeid: '', //肿瘤类型id
                tumortype: '', //肿瘤类型
                therapy: '', //治疗方式
                remark: '', //描述
                medicine: '', //使用药物
                familycontact: '', //家属联系方式
                attachedformdata: [], //病人癌症明细数据  key value
                attachedform: '' //附属表单（存储表名）
            },
            addFormRules: {
                // no: [{ required: true, trigger: 'blur', message: '请输入编号' }],
                // name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
                // cardno: [{ required: true, trigger: 'blur', message: '请输入身份证号' }],
                // tel: [{ required: true, trigger: 'blur', message: '请输入手机号' },{validate:checkMobile,message:'请输入正确的手机号'}],
                // age: [{ required: true, trigger: 'blur', message: '请输入年龄' }],
                // tumortypeid: [{ required: true, trigger: 'change', message: '请选择肿瘤类型' }],
                // address: [{ required: true, trigger: 'blur', message: '请输入地址' }],
                // familycontact: [{ required: true, trigger: 'blur', message: '请输入家属电话' },{validate:checkMobile,message:'请输入正确的手机号'}],
                // birthdatestr: [{ required: true, trigger: 'blur', message: '请选择生日' }],
                // therapy: [{ required: true, trigger: 'blur', message: '请输入治疗方法' }],
                // medicine: [{ required: true, trigger: 'blur', message: '请输入使用药物' }],
                // remark: [{ required: true, trigger: 'blur', message: '请输入描述' }]
            },
            addDialogVisible: false, //添加对话框的显示隐藏
            pageIndex: 1, //页码数
            pageSize: 10, //条数
            totalCount: 0, //总条数
            tableData: [], //表格数据
            roleList: [], //角色列表
            dropList: [], //组织列表

            moreTypeList: [], //疾病类型
            tableData1: [], // 检查项 检查结果列表
            attachedformvalue: {} //检查结果下拉选择数据
        };
    },
    created() {
        this.getData(1);
        this.getMoreType();
    },
    methods: {
        // 查看回访记录
        handleVisited(item){
            console.log(item);
            this.$router.push({
                name:'visitedLog',
              query:{
                patientid:item.patientid,
                patientrmationid:item.id
              }
            })
        },
        // 肿瘤类型切换
        changeTumorType(e) {
            this.$http
                .post('/api/patient/patientform', {
                    tumorType: e
                    // patientrmationid: this.addForm.id
                })
                .then((res) => {
                    if (res.data.success) {
                        this.addForm.attachedformdata = [];
                        let tempArr = [];
                        tempArr = res.data.result.config;
                        tempArr.forEach((item) => {
                            item.key = '';
                        });
                        this.tableData1 = tempArr;
                    }
                });
        },
        // 检查项 检查结果勾选
        changeValue(item1) {
            let tempArr = this.tableData1;
            let arr = [];
            if (!tempArr.length) return;
            tempArr.forEach((item, index) => {
                tempArr[index][tempArr[index]['col']] = tempArr[index]['key'];
                arr.push({
                    value: item.key ? item.key : '',
                    key: item.col
                });
            });
            this.addForm.attachedformdata = arr.filter((item) => {
                return item.key !== '';
            });

            // this.tableData1 = tempArr;
        },
        // 性别切换
        changeSex(e) {
            this.addForm.sex = e;
        },
        // 获取疾病类型
        getMoreType() {
            let arr = [];
            this.$http.post('/api/patient/getpatienttumortype', {}).then((res) => {
                if (res.data.success) {
                    arr = res.data.result;
                    arr.filter((item) => {
                        if (item.name !== '全部') {
                            return item;
                        }
                    }).map((item) => {
                        this.moreTypeList.push(item);
                    });
                }
            });
        },
        //更改信息
        setActive(e) {
            this.showId = e;
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
        // 获取部门列表
        getDropList() {
            this.$http.post('/api/user/getdropdownorg').then((res) => {
                this.dropList = res.data.result;
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
        // 当前用户角色
        roleChange(e) {
            console.log(e);
            let tempArr = this.roleList;
            let arr = [];
            tempArr.forEach((item) => {
                e.forEach((item1) => {
                    if (item.roleid == item1) {
                        arr.push(item.rolename);
                    }
                });
            });
            this.addForm.rolenames = arr;
            console.log(arr);
        },
        // 角色列表
        getRoleList() {
            this.$http
                .post('/api/role/getrolelist', {
                    organizationid: 0,
                    pageIndex: this.pageIndex,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.roleList = res.data.result.pageData;
                });
        },
        // 锁定/不锁定
        changelocker(item) {
            if (item.islocked) {
                //不锁定
                this.$http.post('/api/user/lockuser', { id: item.userid }).then((res) => {
                    this.getData(this.pageIndex);
                });
            } else {
                //锁定
                this.$http.post('/api/user/unlockuser', { id: item.userid }).then((res) => {
                    this.getData(this.pageIndex);
                });
            }
        },
        // 关闭弹窗
        clearForm() {
            this.$refs.formRef.resetFields();
            this.dialogFormVisible = false;
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
        // 搜索
        search() {
            this.getData(1);
        },
        // 添加
        add() {
            this.addDialogVisible = true;
            this.addForm = {
                id: '',
                username: '', //用户
                account: '', //账号
                phone: '', //手机号
                organizationid: '', //组织
                pazzword: '', //密码
                roleids: [], //权限
                rolenames: [] //权限名称
            };
            // console.log(this.$refs.childRef.getData)//调用子组件的属性和方法
        },
        // 编辑
        handleEdit(index, item) {
            console.log(item);
            this.sex = item.sex;
            this.addForm = {
                id: item.id,
                no: item.no, //编号
                name: item.name, //名字
                cardno: item.cardno, //身份证号码
                birthdatestr: item.birthdate, //出生年月
                tel: item.tel, //联系电话
                address: item.address, //联系地址
                age: item.age, //年龄
                tumortypeid: item.tumortypeid, //肿瘤类型id
                tumortype: item.tumortype, //肿瘤类型
                therapy: item.therapy, //治疗方式
                remark: item.remark, //描述
                medicine: item.medicine, //使用药物
                familycontact: item.familycontact, //家属联系方式
                attachedformdata: [], //病人癌症明细数据  key value
                attachedform: item.attachedform //附属表单（存储表名）
            };
            this.addDialogVisible = true;
            this.$http
                .post('/api/patient/patientform', {
                    tumorType: item.tumortypeid,
                    patientrmationid: item.id //病理id
                })
                .then((res) => {
                    if (res.data.success) {
                        this.addForm.attachedformdata = [];
                        let tempArr = [];
                        tempArr = res.data.result.config;
                        let tempArr1 = res.data.result.data;
                        tempArr.forEach((item) => {
                            tempArr1.forEach((item1) => {
                                if (item.col == item1.Key) {
                                    item.key = item1.Value;
                                }
                            });
                        });
                        this.tableData1 = tempArr;

                        let arr = [];
                        if (!tempArr.length) return;
                        tempArr.forEach((item, index) => {
                            tempArr[index][tempArr[index]['col']] = tempArr[index]['key'];
                            arr.push({
                                value: item.key ? item.key : '',
                                key: item.col
                            });
                        });
                        this.addForm.attachedformdata = arr.filter((item) => {
                            return item.key !== '';
                        });

                        console.log(this.addForm.attachedformdata);
                    }
                });
        },
        // 删除
        handleDelete(item) {
            this.$confirm('此操作将永久删除该病人, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$http.post('/api/patient/deletepatient', { id: item.patientid }).then((res) => {
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
        // 当前状态改变的时候
        swichChange(item) {},
        // 获取数据
        getData(pageIndex) {
            this.$http
                .post('/api/patient/getpatientlist', {
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
        // 提交校验
        addSubmitForm(formName) {
            const a = this.moreTypeList
                .filter((item) => {
                    if (item.key == this.addForm.tumortypeid) {
                        return item;
                    }
                })
                .map((item) => {
                    return item.name;
                });
            console.log(a[0]);
            this.$refs.addFormRef.validate((valid) => {
                if (valid) {
                    if (this.addForm.id) {
                        this.$http
                            .post('/api/patient/savepatient', {
                                id: this.addForm.id,
                                no: this.addForm.no,
                                name: this.addForm.name,
                                cardno: this.addForm.cardno,
                                birthdatestr: moment(this.addForm.birthdatestr).format('YYYY-MM-DD'),
                                tel: this.addForm.tel,
                                address: this.addForm.address,
                                sex: this.sex,
                                age: parseInt(this.addForm.age),
                                tumortypeid: this.addForm.tumortypeid,
                                tumortype: a[0] ? a[0] : '',
                                attachedform: this.addForm.attachedform ? this.addForm.attachedform : '',
                                attachedformdata: this.addForm.attachedformdata,
                                therapy: this.addForm.therapy,
                                remark: this.addForm.remark,
                                medicine: this.addForm.medicine,
                                familycontact: this.addForm.familycontact
                            })
                            .then((res) => {
                                if (res.data.success == true) {
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                    this.$message.success(res.data.message);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    } else {
                        this.$http
                            .post('/api/patient/savepatient', {
                                no: this.addForm.no,
                                name: this.addForm.name,
                                cardno: this.addForm.cardno,
                                birthdatestr: moment(this.addForm.birthdatestr).format('YYYY-MM-DD'),
                                tel: this.addForm.tel,
                                address: this.addForm.address,
                                sex: this.sex,
                                age: parseInt(this.addForm.age),
                                tumortypeid: this.addForm.tumortypeid,
                                tumortype: a[0] ? a[0] : '',
                                attachedform: this.addForm.attachedform ? this.addForm.attachedform : '',
                                attachedformdata: this.addForm.attachedformdata,
                                therapy: this.addForm.therapy,
                                remark: this.addForm.remark,
                                medicine: this.addForm.medicine,
                                familycontact: this.addForm.familycontact
                            })
                            .then((res) => {
                                if (res.data.success == true) {
                                    this.addDialogVisible = false;
                                    this.getData(this.pageIndex);
                                    this.$message.success(res.data.message);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    }
                }
            });
        },
        // 关闭弹窗
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
        }
    }
};
</script>
<style lang="less" scoped>
.table1 {
    width: 100%;
    height: auto;
    tr {
        width: 100%;
        text-align: center;
        td {
            width: 100%;
            height: 40px;
            border: 1px solid #e1e1e1;
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: center;
        }
    }
}

.table1 .el-select {
    width: 98% !important;
}
.table1 .el-select .el-input .el-input__inner {
    border: none !important;
}
</style>
<style>
.borderNone .el-input__inner {
    border: none !important;
}
</style>