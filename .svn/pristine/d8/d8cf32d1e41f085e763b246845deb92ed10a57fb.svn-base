<template>
    <div>
        <div class="container1">
            <!-- 冰箱内容区域 -->
            <div class="content3">
                <!-- 左侧表单加容器 -->
                <div class="box">
                    <!-- 冰箱表单 -->
                    <el-row :gutter="24">
                        <el-form :model="form" label-width="65px" class="demo-ruleForm">
                            <el-form-item label="架子编号">
                                <el-col :span="9" class="start" style="padding-left: 0">
                                    <el-input v-model="form.no" class="input1" clearable></el-input>
                                    <div class="search">搜索</div>
                                </el-col>
                            </el-form-item>
                            <el-row :gutter="24">
                                <div class="tips">当前选择： 房间 301_容器 立式大冰箱-BX-001_大层 3_小层 3_架子 BOX-001_盒子 YBR123654</div>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="10">
                                    <el-form-item label="选择房间">
                                        <el-select v-model="form.roomId" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="3">
                                    <el-form-item label="选择容器">
                                        <el-select v-model="form.containerId" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24" v-if="showContainer == 2 && showId == 3">
                                <el-col :span="10">
                                    <el-form-item label="层数">
                                        <el-select v-model="form.levela" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-row>
                    <!-- 冰箱主体 -->
                    <div class="bx1" v-if="showId == 1 || showId == 3">
                        <!-- 立式大冰箱 -->
                        <div class="binx" v-if="showContainer == 1">
                            <div class="name">name</div>
                            <div class="wendu">-80℃</div>
                            <div class="brand">brand</div>
                            <img src="../../../assets/img/bx.jpg" class="img1" alt="" />
                            <div class="box1">
                                <div
                                    v-for="(item, index) in form.levela"
                                    :key="index"
                                    @click="setBoxShowId(index + 1)"
                                    :class="[boxShowId == index + 1 ? 'boxShow' : '', 'boxItem']"
                                >
                                    <div class="list1" v-if="form.levelb && !form.levelc_x">
                                        <div
                                            class="item"
                                            :style="{
                                                height: 88 / form.levelb + 'px',
                                                width: 216 / (form.levelc_x ? form.levelc_x : 1) + 'px'
                                            }"
                                            v-for="(item, index1) in form.levelb"
                                            :key="index1"
                                        ></div>
                                    </div>
                                    <div :class="['list2']" v-else>
                                        <div
                                            :class="['item' + form.levelc_x, 'item']"
                                            v-for="(item, index1) in 12"
                                            :style="{
                                                height: 88 / form.levelb - 4 + 'px',
                                                width: 216 / (form.levelc_x ? form.levelc_x : 1) - 4 + 'px'
                                            }"
                                            :key="index1"
                                        ></div>
                                    </div>
                                    <img :src="require('../../../assets/img/c' + (index + 1) + '.png')" class="boxItemImg" alt />
                                </div>
                            </div>
                        </div>
                        <!-- 立式冰柜 -->
                        <div class="column1" v-if="showContainer == 2">
                            <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleSelectionChange"
                            >
                                <el-table-column type="selection" width="55"> </el-table-column>
                                <el-table-column label="编号" width="80">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="address" label="类型" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="address" label="位置" show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="table-footer">
                                <div>
                                    共计
                                    <span>113</span>条记录，当前显示第1/6页
                                </div>
                                <!-- 分页 -->
                                <el-pagination layout="prev, pager, next, jumper" :total="totalCount"> </el-pagination>
                            </div>
                        </div>
                        <!-- 卧式小冰柜 -->
                        <div class="binx2" v-if="showContainer == 3">
                            <img src="../../../assets/img/bingui.png" class="img1" alt="" />
                            <div class="cont">
                                <div class="item" v-for="(item, index) in 12" :key="index">
                                    <p class="name">{{ index }}</p>
                                    <img src="../../../assets/img/g1.png" class="img2" alt="" />
                                </div>
                            </div>
                        </div>
                        <!-- 卧式大冰柜 -->
                        <div class="binx2" v-if="showContainer == 4">
                            <img src="../../../assets/img/bingui1.png" class="img1" alt="" />
                            <div class="cont">
                                <div class="item1" v-for="(item, index) in 24" :key="index">
                                    <p class="name">{{ index }}</p>
                                    <img src="../../../assets/img/g1.png" class="img2" alt="" />
                                </div>
                            </div>
                        </div>
                        <!-- 液氮罐 -->
                        <div class="binx" v-if="showContainer == 5">
                            <img src="../../../assets/img/gaizi.png" class="img1" alt="" />
                            <div class="bxCont">
                                <div
                                    :class="[boxShowId == index ? 'active' : '', 'item']"
                                    v-for="(item, index) in 4"
                                    :key="index"
                                    @click="setBoxShowId(index)"
                                >
                                    <div class="item1">
                                        <img
                                            src="../../../assets/img/y1.png"
                                            v-for="(item1, index1) in 10"
                                            :key="index1"
                                            class="img2"
                                            alt
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jiazi1" v-if="showId !== 2 && showContainer !== 2 && showContainer !== 5">
                            <p class="name">D1</p>
                            <div class="jiaziContent">
                                <div class="item" v-for="(item, index) in 25" :key="index">
                                    <img src="../../../assets/img/h1.png" alt />
                                </div>
                            </div>
                        </div>
                        <!-- 箭头 -->
                        <div class="jiantou" v-if="showId !== 2 && showContainer !== 2 && showContainer !== 5">
                            <p class="y1">{{ showContainer == 3 ? '上' : '里' }}</p>
                            <p class="y2">{{ showContainer == 3 ? '下' : '外' }}</p>
                        </div>
                    </div>
                    <div class="yangben" v-if="showContainer !== 2">
                        <p class="name">YBR-01</p>
                        <div
                            :class="['item', showId3 == index + 1 ? 'active' : '']"
                            :style="{ width: 540 / 12 - 5 + 'px', height: 540 / 12 - 5 + 'px' }"
                            v-for="(item, index) in items"
                            :key="index"
                            @click="setShowItemBox(index + 1)"
                        >
                            {{ item.name }}
                            <div :class="['itemChild', showId3 == index + 1 ? 'show' : '']" v-if="showId3 == index + 1">
                                <div class="box2">
                                    <p class="name1">Nthy-ori 3-1</p>
                                    <p>
                                        保存期限：
                                        <span class="lv">2020/08/08</span>
                                    </p>
                                    <div class="ml">
                                        <img src="../../../assets/img/tag1.png" class="tag" alt />
                                        <p>样本编号：YB202117210002</p>
                                    </div>
                                    <div class="ml">
                                        <img src="../../../assets/img/tag2.png" class="tag" alt />
                                        <p>身份编号：3252666544</p>
                                    </div>
                                    <div class="ml">
                                        <img src="../../../assets/img/tag3.png" class="tag" alt />
                                        <p>所属物种：人</p>
                                    </div>
                                    <div class="ml borb">
                                        <img src="../../../assets/img/tag4.png" class="tag" alt />
                                        <p>
                                            融冻次数：
                                            <span class="red">15次</span>
                                        </p>
                                    </div>
                                    <div class="footerList">
                                        <div class="item1">
                                            <p class="title">组织样本</p>
                                            <p class="t1">组织样本</p>
                                        </div>
                                        <div class="item1">
                                            <p class="title">癌旁组织</p>
                                            <p class="t1">组织样本</p>
                                        </div>
                                        <div class="item1">
                                            <p class="title">原发性肝癌</p>
                                            <p class="t1">组织样本</p>
                                        </div>
                                    </div>
                                    <div class="shiji">
                                        <p class="total">100ml</p>
                                        <img src="../../../assets/img/gai.png" class="gai" alt />
                                        <div class="ti">
                                            <img src="../../../assets/img/bolang.png" class="bolang" alt />
                                        </div>
                                        <div class="water">40ml</div>
                                        <img src="../../../assets/img/di.png" class="di" alt />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右侧表单加容器 -->
                <div class="box">
                    <!-- 冰箱表单 -->
                    <el-row :gutter="24">
                        <el-form :model="form1" label-width="65px" class="demo-ruleForm">
                            <el-form-item label="架子编号">
                                <el-col :span="9" class="start" style="padding-left: 0">
                                    <el-input v-model="form1.no" class="input1" clearable></el-input>
                                    <div class="search">搜索</div>
                                </el-col>
                            </el-form-item>
                            <el-row :gutter="24">
                                <div class="tips">当前选择： 房间 301_容器 立式大冰箱-BX-001_大层 3_小层 3_架子 BOX-001_盒子 YBR123654</div>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="10">
                                    <el-form-item label="选择房间">
                                        <el-select v-model="form1.roomId" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="3">
                                    <el-form-item label="选择容器">
                                        <el-select v-model="form1.containerId" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24" v-if="showContainer1 == 2 && showId == 3">
                                <el-col :span="10">
                                    <el-form-item label="层数">
                                        <el-select v-model="form1.levela" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="3" v-if="showContainer !== 2">
                                    <el-form-item label="冻存盒">
                                        <el-select v-model="form1.levelb" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-row>
                    <!-- 冰箱主体 -->
                    <div class="bx1" v-if="showId == 1 || showId == 3">
                        <!-- 立式大冰箱 -->
                        <div class="binx" v-if="showContainer1 == 1">
                            <div class="name">name</div>
                            <div class="wendu">-80℃</div>
                            <div class="brand">brand</div>
                            <img src="../../../assets/img/bx.jpg" class="img1" alt="" />
                            <div class="box1">
                                <div
                                    v-for="(item, index) in form1.levela"
                                    :key="index"
                                    @click="setBoxShowId1(index + 1)"
                                    :class="[boxShowId1 == index + 1 ? 'boxShow' : '', 'boxItem']"
                                >
                                    <div class="list1" v-if="form1.levelb && !form1.levelc_x">
                                        <div
                                            class="item"
                                            :style="{
                                                height: 88 / form1.levelb + 'px',
                                                width: 216 / (form1.levelc_x ? form1.levelc_x : 1) + 'px'
                                            }"
                                            v-for="(item, index1) in form1.levelb"
                                            :key="index1"
                                        ></div>
                                    </div>
                                    <div :class="['list2']" v-else>
                                        <div
                                            :class="['item' + form1.levelc_x, 'item']"
                                            v-for="(item, index1) in 12"
                                            :style="{
                                                height: 88 / form1.levelb - 4 + 'px',
                                                width: 216 / (form1.levelc_x ? form1.levelc_x : 1) - 4 + 'px'
                                            }"
                                            :key="index1"
                                        ></div>
                                    </div>
                                    <img :src="require('../../../assets/img/c' + (index + 1) + '.png')" class="boxItemImg" alt />
                                </div>
                            </div>
                        </div>
                        <!-- 立式冰柜 -->
                        <div class="binx1" v-if="showContainer1 == 2">
                            <div class="name">name</div>
                            <div class="wendu">0℃</div>
                            <div class="brand">brand</div>
                            <img src="../../../assets/img/bx1.png" class="img2" alt="" />
                            <div class="cont">
                                <div
                                    :class="[boxShowId1 == index ? 'active' : '', 'item']"
                                    :style="{ height: 410 / form1.levela + 'px' }"
                                    v-for="(item1, index) in form1.levela"
                                    :key="index"
                                    @click="setBoxShowId1(index)"
                                ></div>
                            </div>
                        </div>
                        <!-- 卧式小冰柜 -->
                        <div class="binx2" v-if="showContainer1 == 3">
                            <img src="../../../assets/img/bingui.png" class="img1" alt="" />
                            <div class="cont">
                                <div class="item" v-for="(item, index) in 12" :key="index">
                                    <p class="name">{{ index }}</p>
                                    <img src="../../../assets/img/g1.png" class="img2" alt="" />
                                </div>
                            </div>
                        </div>
                        <!-- 卧式大冰柜 -->
                        <div class="binx2" v-if="showContainer1 == 4">
                            <img src="../../../assets/img/bingui1.png" class="img1" alt="" />
                            <div class="cont">
                                <div class="item1" v-for="(item, index) in 24" :key="index">
                                    <p class="name">{{ index }}</p>
                                    <img src="../../../assets/img/g1.png" class="img2" alt="" />
                                </div>
                            </div>
                        </div>
                        <!-- 液氮罐 -->
                        <div class="binx" v-if="showContainer1 == 5">
                            <img src="../../../assets/img/gaizi.png" class="img1" alt="" />
                            <div class="bxCont">
                                <div
                                    :class="[boxShowId1 == index ? 'active' : '', 'item']"
                                    v-for="(item, index) in 4"
                                    :key="index"
                                    @click="setBoxShowId1(index)"
                                >
                                    <div class="item1">
                                        <img
                                            src="../../../assets/img/y1.png"
                                            v-for="(item1, index1) in 10"
                                            :key="index1"
                                            class="img2"
                                            alt
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jiazi1" v-if="showId !== 2 && showContainer1 !== 2 && showContainer1 !== 5">
                            <p class="name">D1</p>
                            <div class="jiaziContent">
                                <div class="item" v-for="(item, index) in 25" :key="index">
                                    <img src="../../../assets/img/h1.png" alt />
                                </div>
                            </div>
                        </div>
                        <!-- 箭头 -->
                        <div class="jiantou" v-if="showId !== 2 && showContainer1 !== 2 && showContainer1 !== 5">
                            <p class="y1">{{ showContainer1 == 3 ? '上' : '里' }}</p>
                            <p class="y2">{{ showContainer1 == 3 ? '下' : '外' }}</p>
                        </div>
                    </div>
                    <div class="yangben" v-if="showContainer !== 2">
                        <p class="name">YBR-01</p>
                        <div
                            :class="['item', showId3 == index + 1 ? 'active' : '']"
                            :style="{ width: 540 / 12 - 5 + 'px', height: 540 / 12 - 5 + 'px' }"
                            v-for="(item, index) in items"
                            :key="index"
                            @click="setShowItemBox(index + 1)"
                        >
                            {{ item.name }}
                            <div :class="['itemChild', showId3 == index + 1 ? 'show' : '']" v-if="showId3 == index + 1">
                                <div class="box2">
                                    <p class="name1">Nthy-ori 3-1</p>
                                    <p>
                                        保存期限：
                                        <span class="lv">2020/08/08</span>
                                    </p>
                                    <div class="ml">
                                        <img src="../../../assets/img/tag1.png" class="tag" alt />
                                        <p>样本编号：YB202117210002</p>
                                    </div>
                                    <div class="ml">
                                        <img src="../../../assets/img/tag2.png" class="tag" alt />
                                        <p>身份编号：3252666544</p>
                                    </div>
                                    <div class="ml">
                                        <img src="../../../assets/img/tag3.png" class="tag" alt />
                                        <p>所属物种：人</p>
                                    </div>
                                    <div class="ml borb">
                                        <img src="../../../assets/img/tag4.png" class="tag" alt />
                                        <p>
                                            融冻次数：
                                            <span class="red">15次</span>
                                        </p>
                                    </div>
                                    <div class="footerList">
                                        <div class="item1">
                                            <p class="title">组织样本</p>
                                            <p class="t1">组织样本</p>
                                        </div>
                                        <div class="item1">
                                            <p class="title">癌旁组织</p>
                                            <p class="t1">组织样本</p>
                                        </div>
                                        <div class="item1">
                                            <p class="title">原发性肝癌</p>
                                            <p class="t1">组织样本</p>
                                        </div>
                                    </div>
                                    <div class="shiji">
                                        <p class="total">100ml</p>
                                        <img src="../../../assets/img/gai.png" class="gai" alt />
                                        <div class="ti">
                                            <img src="../../../assets/img/bolang.png" class="bolang" alt />
                                        </div>
                                        <div class="water">40ml</div>
                                        <img src="../../../assets/img/di.png" class="di" alt />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['showId'],
    data() {
        return {
            navList: [
                //什么转移
                {
                    id: 1,
                    name: '样本盒转移'
                },
                {
                    id: 2,
                    name: '架子转移'
                },
                {
                    id: 3,
                    name: '样本转移'
                }
            ],
            addDialogVisible: false, //弹窗
            showName: '样本盒转移',
            showContainer: 1, //左 1立式大冰箱 2立式冰柜 3卧式小冰箱 4卧式大冰箱 5液氮罐
            boxShowId: 1, //左 选择了冰箱大层
            showContainer1: 5, //右 1立式大冰箱 2立式冰柜 3卧式小冰箱 4卧式大冰箱 5液氮罐
            boxShowId1: 1, //右 选择了冰箱大层
            jiaziId: 1, //左 选择哪个架子
            jiaziId1: 1, //右 选择哪个架子
            form: {
                //左边表单
                //表单信息
                no: '', //编号
                roomId: '', //房间id
                containerId: 1, //容器Id
                levela: 5, //大层
                levelb: 4, //小层
                levelc_x: '' //架子
            },
            form1: {
                //右边表单
                //表单信息
                no: '', //编号
                roomId: '', //房间id
                containerId: 1, //容器Id
                levela: 6, //大层
                levelb: 4, //小层
                levelc_x: '' //架子
            },
            items: [],
            pageIndex: 1, //页码数
            pageSize: 10, //每页条数
            totalCount: 100, //总条数
            showId3: 1, //选中样本盒
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            multipleSelection: [] //立式冰箱勾选的数据
        };
    },
    methods: {
        // 选择了nav菜单
        setShowId(item) {
            this.showId = item.id;
            this.showName = item.name;
        },
        // 选择了架子
        setJiaziId(Id) {
            this.jiaziId = Id;
        },
        // 选择了冰箱大层
        setBoxShowId(Id) {
            this.boxShowId = Id;
        },
        // 选择了冰箱大层
        setBoxShowId1(Id) {
            this.boxShowId1 = Id;
        },
        // 立式冰箱 勾选table数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
            this.addDialogVisible = false;
        },
        // 选中样本盒
        setShowItemBox(e) {
            console.log(e);
            this.showId3 = e;
        },
        // 初始化数据
        getInit() {
            let arr = [];
            for (let i = 0; i < 12; i++) {
                arr.push({ id: i + 1 });
            }
            // arr[0].select = true;
            // this.boxList = arr;
            let tempArr3 = [];
            // let tempArr = this.items;
            let tempArr = arr;
            let tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
            tempArr1.forEach((item1, index1) => {
                tempArr.forEach((item, index) => {
                    tempArr3.push({
                        id: index,
                        name: item1 + item.id
                    });
                });
            });
            // console.log(tempArr3);
            this.items = tempArr3;
        }
    },
    mounted() {
        this.getInit();
    }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/binx.less');
</style>