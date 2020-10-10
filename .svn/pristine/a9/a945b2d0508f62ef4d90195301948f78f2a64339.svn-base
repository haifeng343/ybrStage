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
                            <el-form-item label="盒子编号">
                                <el-col :span="9" class="start" style="padding-left: 0">
                                    <el-input v-model="form.no" class="input1" clearable></el-input>
                                    <div class="search">搜索</div>
                                </el-col>
                            </el-form-item>
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
                            <el-row :gutter="24" v-if="showContainer == 1 && showId !==2">
                                <el-col :span="8">
                                    <el-form-item label="选择大层">
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
                                <el-col :span="8">
                                    <el-form-item label="选择小层">
                                        <el-select v-model="form.levelb" filterable>
                                            <el-option
                                                v-for="item in navList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="选择架子">
                                        <el-select v-model="form.levelc_x" filterable>
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
                            <el-row :gutter="24" v-if="showContainer == 1 && showId ==2">
                                <el-col :span="10">
                                    <el-form-item label="选择大层">
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
                                <el-col :span="10" :offset="3">
                                    <el-form-item label="选择小层">
                                        <el-select v-model="form.levelb" filterable>
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
                            <el-row :gutter="24" v-if="showContainer == 4 || showContainer == 3">
                                <el-col :span="10">
                                    <el-form-item label="选择架子">
                                        <el-select v-model="form.levelc_x" filterable>
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
                            <el-row :gutter="24" v-if="showContainer == 2">
                                <el-col :span="10">
                                    <el-form-item label="选择大层">
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
                    <div class="bx1" v-if="showId == 1 || showId ==2">
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
                        <div class="binx1" v-if="showContainer == 2">
                            <div class="name">name</div>
                            <div class="wendu">0℃</div>
                            <div class="brand">brand</div>
                            <img src="../../../assets/img/bx1.png" class="img2" alt="" />
                            <div class="cont">
                                <div
                                    :class="[boxShowId == index ? 'active' : '', 'item']"
                                    :style="{ height: 410 / form.levela + 'px' }"
                                    v-for="(item1, index) in form.levela"
                                    :key="index"
                                    @click="setBoxShowId(index)"
                                ></div>
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
                        <div class="jiazi" v-if="showId !==2">
                            <div class="jiaziCont">
                                <div
                                    :class="[jiaziId == item ? 'active' : '', 'item1']"
                                    v-for="(item, index) in 24"
                                    :key="index"
                                    @click="setJiaziId(index + 1)"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                        <!-- <div class="jiazi" v-if="showContainer == 2">
                            <div class="jiaziCont">
                                <div
                                    :class="[jiaziId == item ? 'active' : '', 'item1']"
                                    v-for="(item, index) in form.levela"
                                    :key="index"
                                    :style="{height:512/form.levela+'px'}"
                                    @click="setJiaziId(index + 1)"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <!-- 右侧表单加容器 -->
                <div class="box">
                    <!-- 冰箱表单 -->
                    <el-row :gutter="24">
                        <el-form :model="form1" label-width="65px" class="demo-ruleForm">
                            <el-form-item label="盒子编号">
                                <el-col :span="9" class="start" style="padding-left: 0">
                                    <el-input v-model="form1.no" class="input1" clearable></el-input>
                                    <div class="search">搜索</div>
                                </el-col>
                            </el-form-item>
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
                            <el-row :gutter="24" v-if="showContainer1 == 1 && showId !==2">
                                <el-col :span="8">
                                    <el-form-item label="选择大层">
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
                                <el-col :span="8">
                                    <el-form-item label="选择小层">
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
                                <el-col :span="8">
                                    <el-form-item label="选择架子">
                                        <el-select v-model="form1.levelc_x" filterable>
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
                            <el-row :gutter="24" v-if="showContainer1 == 1 && showId == 2">
                                <el-col :span="10">
                                    <el-form-item label="选择大层">
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
                                <el-col :span="10" :offset="2">
                                    <el-form-item label="选择小层">
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
                            <el-row :gutter="24" v-if="(showContainer1 == 4 || showContainer1 == 3) && showId !==2">
                                <el-col :span="10">
                                    <el-form-item label="选择架子">
                                        <el-select v-model="form1.levelc_x" filterable>
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
                            <el-row :gutter="24" v-if="showContainer1 == 2">
                                <el-col :span="10">
                                    <el-form-item label="选择大层">
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
                            </el-row>
                        </el-form>
                    </el-row>
                    <!-- 冰箱主体 -->
                    <div class="bx1" v-if="showId == 1 || showId ==2">
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
                        <div class="jiazi" v-if="showContainer1 !== 2 && showId !==2">
                            <div class="jiaziCont">
                                <div
                                    :class="[jiaziId1 == item ? 'active' : '', 'item1']"
                                    v-for="(item, index) in 24"
                                    :key="index"
                                    @click="setJiaziId1(index + 1)"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                        <div class="jiazi" v-if="showContainer1 == 2 && showId !==2">
                            <div class="jiaziCont">
                                <div
                                    :class="[jiaziId1 == item ? 'active' : '', 'item1']"
                                    v-for="(item, index) in form.levela"
                                    :key="index"
                                    :style="{height:512/form.levela+'px'}"
                                    @click="setJiaziId1(index + 1)"
                                >
                                    {{ item }}
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
    props:['showId'],
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
            showContainer: 5, //左 1立式大冰箱 2立式冰柜 3卧式小冰箱 4卧式大冰箱 5液氮罐
            boxShowId: 1, //左 选择了冰箱大层
            showContainer1: 3, //右 1立式大冰箱 2立式冰柜 3卧式小冰箱 4卧式大冰箱 5液氮罐
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
            }
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
        // 关闭弹窗
        addDialogClosed() {
            this.addDialogVisible = false;
        }
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/binx.less');

</style>