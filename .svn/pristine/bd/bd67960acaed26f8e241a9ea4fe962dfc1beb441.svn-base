<template>
    <div class="container1">
        <!-- 头部 -->
        <div class="header1">
            <div class="header-left">
                <div
                    :class="[showNavId==item.id?'navActive':'','item']"
                    v-for="item in nav"
                    :key="item.id"
                    @click="setShowNav(item.id)"
                >
                    {{item.name}}
                    <span class="temperature">{{item.temperature}}</span>
                </div>
            </div>
            <div class="header-right">
                <!-- <p>可存放</p>
                <el-select v-model="stateValue" class="select">
                    <el-option
                        v-for="item in stateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>-->
                <div class="headerBtn gray" v-if="!canSend">保存</div>
                <div class="headerBtn" v-else @click="addBox">保存</div>
            </div>
        </div>

        <div class="content">
            <div class="form">
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="冰箱名称" prop="name">
                                <el-input type="text" v-model="addForm.name" placeholder="请输入冰箱名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="冰箱品牌" prop="brand" :status-icon="true">
                                <el-input type="text" v-model="addForm.brand" placeholder="请输入冰箱品牌"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="冰箱型号" prop="model" :status-icon="true">
                                <el-input type="text" v-model="addForm.model" placeholder="请输入冰箱型号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="冰箱温度" prop="temperatureid">
                                <el-select v-model="addForm.temperature">
                                    <el-option
                                        v-for="item in showTemList"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="11">
                            <el-form-item label="保管员" prop="keeperuserid">
                                <el-select
                                    v-model="addForm.keeperuserid"
                                    filterable
                                    placeholder="请选择保管员"
                                >
                                    <el-option
                                        v-for="item in userList"
                                        :key="item.userid"
                                        :label="item.username"
                                        :value="item.userid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="房间" prop="roomid">
                                <el-select v-model="addForm.roomid" filterable placeholder="请选择房间">
                                    <el-option
                                        v-for="item in roomList1"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 立式大冰箱 -->
                <div class="formBox" :style="{display:showNavId!==1?'none':'flex'}" id="formBox">
                    <div class="formHeader">
                        <p>小层可容纳样本盒数</p>
                        <el-input
                            type="text"
                            class="input1"
                            v-model="number"
                            :disabled="true"
                            placeholder="架子数 X 单个架子可容纳冻存盒数"
                        ></el-input>
                    </div>
                    <div class="tips">请拖拽小层可容纳样本盒数</div>
                    <ul class="ul1" id="ul1"></ul>
                </div>
            </div>
            <!-- 冰箱主体 -->
            <div class="containerB">
                <div>
                    <el-form
                        :model="addForm"
                        :rules="addFormRules"
                        ref="addFormRef"
                        label-width="90px"
                    >
                        <el-row :gutter="24" v-if="showNavId==1 || showNavId==2 || showNavId==3">
                            <el-col :span="7">
                                <el-form-item label="大 层 数">
                                    <el-select v-model="addForm.levela">
                                        <el-option
                                            v-for="(item,index) in 6"
                                            :key="index"
                                            :label="item"
                                            :value="item"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <el-form-item label="小 层 数" v-if="showNavId==1">
                                    <el-select
                                        v-model="addForm.levelb"
                                        :disabled="!addForm.levela"
                                        @change="changeXiaoceng"
                                    >
                                        <el-option
                                            v-for="(item,index) in 6"
                                            :key="index"
                                            :label="item"
                                            :value="item"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="冻存盒数" v-if="showNavId==2 || showNavId==3">
                                    <el-input
                                        v-model="addForm.dongcunhe"
                                        type="number"
                                        placeholder="请输入冻存盒数"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <el-form-item label="样本盒规格">
                                    <el-select v-model="addForm.samplebox">
                                        <el-option :value="1" label="9*9"></el-option>
                                        <el-option :value="2" label="10*10"></el-option>
                                        <el-option :value="3" label="11*11"></el-option>
                                        <el-option :value="4" label="12*12"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24" v-if="showNavId==4 || showNavId==5">
                            <el-col :span="12" v-if="showNavId==4">
                                <div class="toips">
                                    <p>
                                        架子数*单个架子冻存盒数：
                                        <span>12*10</span>
                                    </p>
                                </div>
                            </el-col>
                            <el-col :span="12" v-if="showNavId==5">
                                <div class="toips">
                                    <p>
                                        架子数*单个架子冻存盒数：
                                        <span>18*10</span>
                                    </p>
                                </div>
                            </el-col>
                            <el-col :span="10" :offset="2">
                                <el-form-item label="样本盒规格">
                                    <el-select v-model="addForm.samplebox">
                                        <el-option :value="1" label="9*9"></el-option>
                                        <el-option :value="2" label="10*10"></el-option>
                                        <el-option :value="3" label="11*11"></el-option>
                                        <el-option :value="4" label="12*12"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-if="showNavId==4">
                    <img src="../../../assets/img/box2.png" class="bximg bximg1" alt />
                </div>
                <div v-if="showNavId==5">
                    <img src="../../../assets/img/box3.png" class="bximg bximg1" alt />
                </div>
                <div class="bx">
                    <div>
                        <div
                            v-if="showNavId==1 || showNavId==2 || showNavId==3"
                            :class="['showTemperature',(showNavId==2 || showNavId==3)?'showTemperature1':'']"
                        >{{showTemperature}}</div>
                        <div
                            :class="['bxName',(showNavId==2 || showNavId==3)?'bxName1':'']"
                        >{{addForm.name}}</div>
                        <div
                            :class="['brand',(showNavId==2 || showNavId==3)?'brand1':'']"
                        >{{addForm.brand}}</div>
                        <img src="../../../assets/img/bx.jpg" class="bximg" v-if="showNavId==1" alt />
                        <img
                            src="../../../assets/img/bx1.png"
                            class="bximg"
                            v-if="showNavId==2 || showNavId==3"
                            alt
                        />
                    </div>
                    <!-- 冰箱内容 -->
                    <div class="box1" v-if="showNavId==1">
                        <div
                            v-for="(item,index) in addForm.levela"
                            :key="index"
                            :class="[boxShowId==index+1?'boxShow':'','boxItem']"
                        >
                            <div class="list1" v-if="addForm.levelb && !addForm.levelc_x">
                                <div
                                    class="item"
                                    :style="{height:((98/addForm.levelb)+'px'),width:(236/(addForm.levelc_x?addForm.levelc_x:1))+'px'}"
                                    v-for="(item,index1) in addForm.levelb"
                                    :key="index1"
                                ></div>
                            </div>
                            <div :class="['list2']" v-else>
                                <div
                                    :class="['item'+addForm.levelc_x,'item']"
                                    v-for="(item,index1) in boxList"
                                    :style="{height:((98/addForm.levelb)-4+'px'),width:(236/(addForm.levelc_x?addForm.levelc_x:1))-4+'px'}"
                                    :key="index1"
                                ></div>
                            </div>
                            <img
                                :src="require('../../../assets/img/c'+(index+1)+'.png')"
                                class="boxItemImg"
                                alt
                            />
                        </div>
                    </div>

                    <div class="box2" v-if="showNavId==2 || showNavId==3">
                        <div class="item" v-for="(item,index) in addForm.levela" :key="index"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            canSend:false,//是否可提交
            showNavId: 5, //1立式大冰箱 23立式冰柜 卧式小冰箱 5卧式大冰箱
            showTemperature: '-80℃', //对应温度
            showTemList: ['-80℃'], //温度列表
            wenduList:[//温度列表从配置拿的
                {
                    id:1,
                    name:'-80℃'
                },
                {
                    id:2,
                    name:'-20℃'
                },
                {
                    id:3,
                    name:'4℃'
                },
            ],
            nav: [
                //导航栏
                {
                    id: 1,
                    name: '立式大冰箱',
                    temperature: '-80℃'
                },
                {
                    id: 2,
                    name: '立式冰柜',
                    temperature: '4℃'
                },
                {
                    id: 3,
                    name: '立式冰柜',
                    temperature: '-20℃'
                },
                {
                    id: 4,
                    name: '卧式小冰箱',
                    temperature: '-20℃'
                },
                {
                    id: 5,
                    name: '卧式大冰箱',
                    temperature: '-20℃'
                }
            ],
            stateValue: '', //
            stateList: [
                {
                    id: 1,
                    name: '样本'
                }
            ],
            number: null, //选择的盒子数
            boxShowId: 1, //选中层级
            boxList: [], //盒子个数
            roomList1: [], //房间列表
            userList: [], //用户列表
            addForm: {
                roomid: '', //房间id
                no: '', //冰箱编号
                name: '', //冰箱名称
                brand: '', //冰箱品牌
                model: '', //冰箱型号
                levelc_x: null, //小层抽屉数
                levelc_y: null, //抽屉深度
                levela: '', //大层层数
                levelb: '', //小层层数
                dongcunhe: '', //冻存盒
                samplebox: '', //样本盒规格 1.9x9   2.10x10  3.11x11     4.12x12
                keeperuserid: '', //容器保管员id
                keeperuser: '', //容器保管员str
                remark: '', //容器描述
                dataids: [], //可放入材料id
                datas: '', //可放入材料str
                temperatureid: 1, //温度id
                temperature: '-80℃' //温度str
            },
            addFormRules: {
                // roomid: [{ required: true, trigger: 'change', message: '请选择房间' }],
                // keeperuserid: [{ required: true, trigger: 'change', message: '请选择容器保管员' }],
                // no: [{ required: true, trigger: 'blur', message: '请输入冰箱编号' }],
                // name: [{ required: true, trigger: 'blur', message: '请输入冰箱名称' }],
                // brand: [{ required: true, trigger: 'blur', message: '请输入冰箱品牌' }],
                // model: [{ required: true, trigger: 'blur', message: '请输入冰箱型号' }],
                // levelc_x: [{ required: true, trigger: 'blur', message: '请输入平面布局长' }],
                // levelc_y: [{ required: true, trigger: 'blur', message: '请输入平面布局宽' }],
                // levela: [{ required: true, trigger: 'blur', message: '请输入大层层数' }],
                // levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                // levelb: [{ required: true, trigger: 'blur', message: '请输入小层层数' }],
                // remark: [{ required: true, trigger: 'blur', message: '请输入容器描述' }]
            }
        };
    },
    methods: {
        // 设置nav选中头部
        setShowNav(e) {
            this.showNavId = e;
            let that = this;
            let tempArr = this.nav;
            let tempArr1 = [];
            tempArr.forEach((item, index) => {
                if (item.id == e) {
                    this.showTemperature = item.temperature;
                    tempArr1.push(item.temperature);
                }
            });
            let tempArr2 = that.wenduList;
            tempArr2.forEach(item=>{
                if(item.name==that.showTemperature){
                    that.addForm.temperatureid = item.id;
                    that.addForm.temperature = item.name;
                }
            })
            this.showTemList = tempArr1;
        },
        // 冰箱头部
        setHeard(e) {
            this.showHeadId = e;
        },
        // 获取房间列表
        getRoomList() {
            this.$http
                .post('/api/container/getlistbyroom', {
                    name: '',
                    pageIndex: 1,
                    pageSize: 1000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    let tempArr = [];
                    tempArr.push({
                        id: 0,
                        name: '全部'
                    });
                    this.roomList = tempArr.concat(res.data.result.pageData);
                    this.roomList1 = res.data.result.pageData;
                });
        },
        // 获取用户列表
        getUserList() {
            this.$http
                .post('/api/user/getuserinfo', {
                    search: '',
                    pageIndex: 1,
                    pageSize: 10000,
                    fldSort: '',
                    fldName: ''
                })
                .then((res) => {
                    this.userList = res.data.result.pageData;
                });
        },
        // 切换小层
        changeXiaoceng(e) {
            this.boxShowId = 1;
            this.boxList = e * this.addForm.levelc_x;
        },
        // 新建冰箱
        addBox() {
            this.$http
                .post('/api/container/savebyfridge', {
                    roomid: this.addForm.roomid,
                    no: '',
                    name: this.addForm.name,
                    brand: this.addForm.brand,
                    model: this.addForm.model,
                    levelc_x: parseInt(this.addForm.levelc_x),
                    levelc_y: parseInt(this.addForm.levelc_y),
                    levela: parseInt(this.addForm.levela),
                    levelb: parseInt(this.addForm.levelb),
                    samplebox: this.addForm.samplebox,
                    keeperuserid: this.addForm.keeperuserid,
                    keeperuser: this.addForm.keeperuser,
                    remark: this.addForm.remark,
                    dataids: this.addForm.dataids ? this.addForm.dataids : null,
                    datas: this.addForm.datas,
                    temperatureid: this.addForm.temperatureid ? this.addForm.temperatureid : 0,
                    temperature: this.addForm.temperature
                })
                .then((res) => {
                    if (res.data.success) {
                        this.addDialogVisible = false;
                        this.getData(this.pageIndex);
                        this.$message.success(res.data.message);
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        moveTo(e) {
            e.preventDefault();
        },
        move1(e) {
            const that = this;
            let div = document.createElement('div');
            let startPos = {};
            startPos.x = e.clientX;
            startPos.y = e.clientY;
            let li = null;

            function move(e) {
                let curPos = {};
                curPos.x = e.clientX;
                curPos.y = e.clientY;

                //移动时画框
                div.classList.add('box');
                //设置div的宽高及top/left
                that.css(div, 'width', Math.abs(curPos.x - startPos.x));
                that.css(div, 'height', Math.abs(curPos.y - startPos.y));
                that.css(div, 'left', Math.min(curPos.x, startPos.x));
                that.css(div, 'top', Math.min(curPos.y, startPos.y));

                document.body.appendChild(div);

                let lis = document.querySelectorAll('ul li');
                //将框住的li放进div中(div和多个元素碰撞)
                lis.forEach((item) => {
                    // 将每个li和div进行碰撞测试,如果碰到了，就设置active
                    //注意：不能直接碰撞时，直接appendChild到div中，会将后面的li全部添加进去
                    that.isConcat(div, item);
                });
            }
            //获取鼠标移动时位置
            document.addEventListener('mousemove', move);
            document.addEventListener(
                'mouseup',
                function () {
                    document.removeEventListener('mousemove', move);
                    let bucket = document.querySelector('#bucket');
                    //获取到所有样式为active的li
                    let lis = document.querySelectorAll('ul .active');
                    let arr = [];
                    lis.forEach((item) => {
                        // item.classList.remove("active");//删除选中的active
                        // bucket.appendChild(item);//将选中的添加进另一个div里
                        arr.push(item.innerHTML);
                    });

                    let b = 0; //小层抽屉数量
                    for (let i = 0; i < 12; i++) {
                        if (parseInt(arr[i]) !== parseInt(arr[0]) + i) {
                            break;
                        } else {
                            b++;
                        }
                    }

                    let a = (arr[arr.length - b] - arr[0]) / 12 + 1; //每个抽屉深度
                    console.log(' ==== ' + a);
                    console.log(' ---- ' + b);
                    that.addForm.levelc_x = b;
                    that.addForm.levelc_y = a;
                    that.boxList = b * that.addForm.levelb;

                    that.number = arr.length;
                    //鼠标放下时清除上一个div
                    div.remove(); //使用removeChild有可能还未创建div
                },
                {
                    once: true
                }
            );
        },
        css(el, attr, val) {
            if (arguments.length == 3) {
                el.style[attr] = val + 'px';
            } else {
                return parseInt(getComputedStyle(el)[attr]);
            }
        },
        isConcat(el1, el2) {
            let div1Dis = el1.getBoundingClientRect();
            let div2Dis = el2.getBoundingClientRect();
            if (
                div1Dis.right > div2Dis.left &&
                div1Dis.bottom > div2Dis.top &&
                div1Dis.left < div2Dis.right &&
                div1Dis.top < div2Dis.bottom
            ) {
                el2.classList.add('active');
                return el2;
            } else {
                //注意：必须给没有碰到的清除active。否则当操作时，先往前拉，后往后拉，会给往前拉的所有li都加上active，这样再往后拉后会全部加到div里
                el2.classList.remove('active');
            }
        }
    },
    mounted() {
        let that = this;
        let oUl = document.getElementById('ul1');
        let formBox1 = document.getElementById('formBox');
        let arr = [];
        for (let i = 1; i < 121; i++) {
            arr.push('<li>' + i + '</li>');
        }
        oUl.innerHTML = arr.join(' ');
        formBox1.addEventListener('mousedown', function (e) {
            that.move1(e);
            e.preventDefault();
        });
        formBox1.addEventListener('mousedown', that.moveTo, false);

        that.getRoomList();
        that.getUserList();
    }
};
</script>
<style scoped lang="less">
.container1 {
    background: #fff;
    width: 100%;
    height: auto;
    .header1 {
        width: 100%;
        height: 60px;
        display: flex;
        border-bottom: 1px solid #e1e5ef;
        justify-content: space-between;
        box-sizing: border-box;
        align-items: center;
        font-size: 18px;
        padding: 0 24px;
        flex-direction: row;
        margin-bottom: 40px;
        .header-left {
            display: flex;
            height: 100%;
            justify-content: flex-start;
            .item {
                width: 80px;
                height: 100%;
                font-size: 16px;
                color: #161e33;
                margin-right: 56px;
                display: flex;
                align-items: center;
                cursor: pointer;
                position: relative;
                .temperature {
                    padding: 0 6px;
                    left: 80px;
                    top: 5px;
                    background: #568bfc;
                    border-radius: 8px 8px 8px 0px;
                    position: absolute;
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
                }
            }
            .item:nth-child(5n + 2) {
                .temperature {
                    left: 65px;
                }
            }
            .item:nth-child(5n + 3) {
                .temperature {
                    left: 65px;
                }
            }
            .navActive {
                border-bottom: 4px solid #fa483a;
            }
        }
        .header-right {
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
            font-size: 14px;
            color: #636572;
            align-items: center;
            .select {
                width: 158px;
                margin: 0 14px;
            }
            .headerBtn {
                width: 86px;
                height: 32px;
                background: #fa483a;
                color: #fff;
                font-size: 14px;
                color: #ffffff;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .gray{
                background: gray;
                color: #fff;
                opacity: 0.5;
            }
        }
    }
    .content {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        background: #fff;
        .containerB {
            width: 820px;
            max-height: 650px;
            padding-bottom: 79px;
            display: flex;
            align-items: center;
            flex-direction: column;
            .bx {
                height: 564px;
                width: 330px;
                position: relative;
                top: 30px;
                .showTemperature {
                    width: 62px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    color: #16277a;
                    position: absolute;
                    right: 41px;
                    top: 9px;
                }
                .showTemperature1 {
                    width: 56px;
                    top: 13px;
                    right: 28px;
                    color: #fff;
                }
                .bxName {
                    width: 150px;
                    height: 25px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: absolute;
                    box-sizing: border-box;
                    padding-left: 22px;
                    left: 22px;
                    top: 6px;
                    font-size: 14px;
                    color: #ffffff;
                }
                .bxName1 {
                    top: 10px;
                }
                .brand {
                    width: 170px;
                    height: 25px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: absolute;
                    box-sizing: border-box;
                    padding-left: 22px;
                    left: 22px;
                    bottom: 22px;
                    font-size: 16px;
                    color: #ffffff;
                }
                .brand {
                    bottom: 37px;
                }
                .bximg {
                    height: 562px;
                    width: 330px;
                }
                .box1 {
                    position: absolute;
                    top: 50px;
                    left: 25px;
                    height: 424px;
                    width: 276px;
                    overflow-y: scroll;
                    .boxItem {
                        width: 256px;
                        height: 102px;
                        margin: 0 auto 4px;
                        background: #dce6f8;
                        border-radius: 10px;
                        position: relative;
                        cursor: pointer;
                        .boxItemImg {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 0;
                        }
                    }
                    .boxShow {
                        width: 256px;
                        height: 102px;
                        background: #dce6f8;
                        border-radius: 10px;
                        margin: 0 auto 4px;
                        overflow: hidden;
                        position: relative;
                        z-index: 3;
                        .list1 {
                            width: 100%;
                            height: 100%;
                            max-height: 102px;
                            box-sizing: border-box;
                            padding: 5px 10px;
                            display: flex;
                            flex-direction: column;
                            .item {
                                width: 16px;
                                height: 12px;
                                background: #ffffff;
                                border-radius: 2px;
                                margin-bottom: 4px;
                            }
                        }
                        .list2 {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            padding: 5px 10px;
                            display: flex;
                            justify-content: flex-start;
                            align-content: flex-start;
                            flex-wrap: wrap;
                            .item {
                                width: 16px;
                                height: 12px;
                                background: #ffffff;
                                border-radius: 2px;
                                box-sizing: border-box;
                                margin: 0 4px 4px 0;
                            }
                            .item1:nth-child(1n + 1) {
                                margin-right: 0;
                            }
                            .item2:nth-child(2n + 2) {
                                margin-right: 0;
                            }
                            .item3:nth-child(3n + 3) {
                                margin-right: 0;
                            }
                            .item4:nth-child(4n + 4) {
                                margin-right: 0;
                            }
                            .item5:nth-child(5n + 5) {
                                margin-right: 0;
                            }
                            .item6:nth-child(6n + 6) {
                                margin-right: 0;
                            }
                            .item7:nth-child(7n + 7) {
                                margin-right: 0;
                            }
                            .item8:nth-child(8n + 8) {
                                margin-right: 0;
                            }
                            .item9:nth-child(9n + 9) {
                                margin-right: 0;
                            }
                            .item10:nth-child(10n + 10) {
                                margin-right: 0;
                            }
                            .item11:nth-child(11n + 11) {
                                margin-right: 0;
                            }
                            .item12:nth-child(12n + 12) {
                                margin-right: 0;
                            }
                        }
                        .boxItemImg {
                            display: none;
                        }
                    }
                }
                .box2 {
                    position: absolute;
                    top: 47px;
                    left: 45px;
                    width: 257px;
                    height: 435px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    flex: 1;
                    .item {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        background: linear-gradient(0deg, rgba(255, 255, 255, 0.33) 68%, rgba(255, 255, 255, 0) 100%);
                    }
                    .item::after {
                        content: '';
                        width: 100%;
                        height: 12px;
                        opacity: 0.2;
                        position: absolute;
                        background: linear-gradient(0deg, #7c7cb6 0%, #ccd2ee 100%);
                        bottom: 0;
                        left: 0;
                    }
                }
            }
            .bximg1 {
                width: 587px;
                height: 402px;
                margin-top: 100px;
            }
            .toips {
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                color: #646672;
                span {
                    margin-left: 20px;
                }
            }
        }
        .form {
            width: 700px;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            box-sizing: border-box;
            margin-left: 25px;
            .formBox {
                width: 672px;
                height: 424px;
                background: #ffffff;
                box-shadow: 0px 0px 8px 0px rgba(12, 4, 7, 0.12);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-top: 24px;
                .formHeader {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    margin-left: 22px;
                    align-items: center;
                    flex-direction: row;
                    .input1 {
                        width: 332px;
                        margin-left: 15px;
                    }
                }
                .tips {
                    width: 332px;
                    height: 32px;
                    background: rgba(250, 72, 58, 0.12);
                    border: 1px solid #fa483a;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-size: 16px;
                    color: #fa483a;
                    margin: 10px 0;
                    position: relative;
                    box-sizing: border-box;
                    padding-left: 40px;
                }
                .tips::after {
                    content: '!';
                    width: 18px;
                    height: 18px;
                    background: #fa483a;
                    border-radius: 50%;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    left: 13px;
                }
            }
        }
    }
}
</style>
<style>
.none {
    display: none;
}
#bucket {
    border: 1px solid black;
    height: 240px;
}
#bucket li {
    background-color: lightgreen;
    color: #fff;
}

.ul1 li {
    display: block;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #5a5c6a;
    list-style: none;
    float: left;
    margin: 0 4px 4px 0;
    color: transparent;
    overflow: hidden;
}
.ul1 li:nth-child(12n + 12) {
    margin-right: 0;
}
.box {
    /* border: 1px solid peru; */
    border: 1px solid rgba(0, 0, 0, 0.3);
    position: absolute;
    /* background: rgba(0,0,255,.4); */
    background: rgba(0, 0, 5, 0.1);
}

.ul1 li.active {
    border: 1px solid #fa483a;
}

.ul1 {
    width: 332px;
    height: 276px;
}
</style>