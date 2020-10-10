<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">申请管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">过期列表</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">样本位置详情</div>
        </div>

        <div class="container1">
            <el-card>
                <el-row :gutter="24">
                    <div class="statusList">位置：房间 301_容器 立式冰柜 BX-001_层数 1</div>
                </el-row>
                <el-row :gutter="24">
                    <div class="statusList">
                        <p class="item">空</p>
                        <p class="item">已占用</p>
                        <p class="item">仓位保留</p>
                        <p class="item">当前样本位置</p>
                    </div>
                </el-row>
            </el-card>
            <!-- 冰箱信息 -->
            <el-card class="content1" v-if="showNavId !== 3">
                <el-row :gutter="24">
                    <div class="satrt">
                        <div class="bx" v-if="showNavId == 1 || showNavId == 2 || showNavId == 6">
                            <div>
                                <div :class="['showTemperature', showNavId == 2 || showNavId == 3 ? 'showTemperature1' : '']">
                                    {{ showNavId == 6 ? '' : addForm.showTemperature }}
                                </div>
                                <div :class="['bxName', showNavId == 2 || showNavId == 3 ? 'bxName1' : '']">
                                    {{ showNavId == 6 ? '' : addForm.name }}
                                </div>
                                <div :class="['brand', showNavId == 2 || showNavId == 3 ? 'brand1' : '']">
                                    {{ showNavId == 6 ? '' : addForm.brand }}
                                </div>
                                <img src="../../../assets/img/bx.jpg" v-if="showNavId == 1" class="bximg" alt />
                                <img src="../../../assets/img/bx1.png" class="bximg" v-if="showNavId == 2 || showNavId == 3" alt />
                                <img src="../../../assets/img/gaizi.png" v-if="showNavId == 6" class="bximg" alt />
                            </div>
                            <!-- 冰箱内容 -->
                            <div class="box1" v-if="showNavId == 1">
                                <div
                                    v-for="(item, index) in addForm.levela"
                                    :key="index"
                                    @click="setShowItem(index + 1)"
                                    :class="[boxShowId == index + 1 ? 'boxShow' : '', 'boxItem']"
                                >
                                    <div class="list1" v-if="addForm.levelb && !addForm.levelc_x">
                                        <div
                                            class="item"
                                            :style="{
                                                height: 98 / addForm.levelb + 'px',
                                                width: 236 / (addForm.levelc_x ? addForm.levelc_x : 1) + 'px'
                                            }"
                                            v-for="(item, index1) in addForm.levelb"
                                            :key="index1"
                                        ></div>
                                    </div>
                                    <div :class="['list2']" v-else-if="addForm.levelb && addForm.levelc_x && boxShowId == index + 1">
                                        <div
                                            :class="['item' + addForm.levelc_x, 'item']"
                                            v-for="(item, index1) in addForm.levelb * addForm.levelc_x"
                                            :style="{
                                                height: 98 / addForm.levelb - 4 + 'px',
                                                width: 236 / (addForm.levelc_x ? addForm.levelc_x : 1) - 4 + 'px'
                                            }"
                                            :key="index1"
                                        ></div>
                                    </div>
                                    <p class="look" v-if="boxShowId !== index + 1">点击查看</p>
                                    <img :src="require('../../../assets/img/c' + (index + 1) + '.png')" class="boxItemImg" alt />
                                </div>
                            </div>

                            <!-- 立式冰柜 -->
                            <div class="box2" v-if="showNavId == 2 || showNavId == 3">
                                <div class="item" v-for="(item, index) in addForm.levela" :key="index"></div>
                            </div>
                            <!-- 液氮罐 -->
                            <div class="bxCont" v-if="showNavId == 6">
                                <div class="item" v-for="(item, index) in 4" :key="index">
                                    <img src="../../../assets/img/y1.png" v-for="(item1, index1) in 10" :key="index1" class="img2" alt />
                                </div>
                            </div>
                        </div>
                        <div class="bingui" v-if="showNavId == 4 || showNavId == 5">
                            <img src="../../../assets/img/bingui.png" v-if="showNavId == 4" class="Img" alt />
                            <img src="../../../assets/img/bingui1.png" v-if="showNavId == 5" class="Img" alt />
                            <div class="binguiCont">
                                <div
                                    :class="[showNavId == 5 ? 'item1' : '', 'item']"
                                    v-for="(item, index) in showNavId == 5 ? 24 : 12"
                                    :key="index"
                                >
                                    <img src="../../../assets/img/g1.png" class="img1" alt="" />
                                </div>
                            </div>
                        </div>
                        <!-- 冰箱架子 -->
                        <div class="jiazi" v-if="showNavId == 1 || showNavId == 4 || showNavId == 5">
                            <p class="name">D1</p>
                            <div class="jiaziContent">
                                <div class="item" v-for="(item, index) in 25" :key="index">
                                    <img src="../../../assets/img/h1.png" alt />
                                </div>
                            </div>
                        </div>

                        <!-- 冰柜架子 -->
                        <div class="jiazi1" v-if="showNavId == 2">
                            <p class="name">第1层</p>
                            <div class="jiaziContent">
                                <div class="item" v-for="(item, index) in 45" :key="index">
                                    <img src="../../../assets/img/h1.png" alt />
                                </div>
                            </div>
                        </div>
                        <!-- 箭头 -->
                        <div class="jiantou" v-if="showNavId == 1">
                            <p class="y1">里</p>
                            <p class="y2">外</p>
                        </div>
                        <div class="jiantou" v-if="showNavId == 4 || showNavId == 5">
                            <p class="y1">上</p>
                            <p class="y2">下</p>
                        </div>
                        <!-- 表格内容 -->
                        <!-- 样本盒 -->
                        <div class="yangben">
                            <p class="name">YBR-01</p>
                            <div
                                :class="['item', showId3 == index + 1 ? 'active' : '']"
                                :style="{ width: 540 / 9 - 5 + 'px', height: 540 / 9 - 5 + 'px' }"
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
                </el-row>
            </el-card>
            <!-- 立式冰柜存放试剂 -->
            <div class="content1 padd" v-if="showNavId == 3">
                <div class="start stat1">
                    <div class="left">
                        <div class="bx">
                            <div>
                                <div :class="['showTemperature', showNavId == 2 || showNavId == 3 ? 'showTemperature1' : '']">
                                    {{ showNavId == 7 ? '' : addForm.showTemperature }}
                                </div>
                                <div :class="['bxName', showNavId == 2 || showNavId == 3 ? 'bxName1' : '']">
                                    {{ showNavId == 7 ? '' : addForm.name }}
                                </div>
                                <div :class="['brand', showNavId == 2 || showNavId == 3 ? 'brand1' : '']">
                                    {{ showNavId == 7 ? '' : addForm.brand }}
                                </div>
                                <img src="../../../assets/img/bx1.png" class="bximg" v-if="showNavId == 2 || showNavId == 3" alt />
                                <img src="../../../assets/img/box3.png" class="bximg" v-if="showNavId == 7" alt />
                            </div>
                            <div class="box2" v-if="showNavId == 2 || showNavId == 3">
                                <div class="item" v-for="(item, index) in addForm.levela" :key="index"></div>
                            </div>
                            <div class="boxCont" v-if="showNavId == 7">
                                <div class="item" v-for="(item, index) in 6" :key="index">
                                    <div v-if="index == 0" class="first">
                                        <div
                                            class="item1"
                                            v-for="(item1, index1) in 12"
                                            :key="index1"
                                            :style="{ width: 260 / 12 + 'px' }"
                                        ></div>
                                    </div>
                                    <img src="../../../assets/img/gui1.png" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="between">
                            <div class="start center">
                                <div class="searchForm">
                                    位置选择
                                    <el-select v-model="formInline.levela" class="searchFormInput1" placeholder="请选择位置层数">
                                        <el-option v-for="(item, index) in 5" :key="index" :label="item" :value="item"></el-option>
                                    </el-select>
                                    <div class="searchFormBtn">重置</div>
                                </div>
                            </div>
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
                        </div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="位置" width="180"> </el-table-column>
                            <el-table-column prop="name" label="编号" width="180"> </el-table-column>
                            <el-table-column prop="address" label="名称"> </el-table-column>
                            <el-table-column prop="address" label="类型"> </el-table-column>
                        </el-table>
                        <div class="table-footer">
                            <div>
                                共计
                                <span>113</span>条记录，当前显示第<span>1/6</span>页
                            </div>
                            <!-- 分页 -->
                            <el-pagination layout="prev, pager, next, jumper" :total="totalCount"> </el-pagination>
                        </div>
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
            keyword: '',
            value: '',
            boxShowId: 1, //选中层级
            showNavId: 6, //1立式大冰箱 2立式冰柜 3立式冰柜（存放试剂） 4卧式小冰箱 5卧式大冰箱  6液氮罐 7石蜡块柜
            stateValue: 3, // 1样本 2冻存盒 3试剂
            formInline: {
                levela: '' //选择层数
            },
            addForm: {
                levela: 3, //大层层数
                levelb: 6, //小层层数
                levelc_x: 12, //小层抽屉数
                levelc_y: 10, //抽屉深度
                showTemperature: '-80℃', //温度
                name: 'YBR-001', //名称
                brand: '海尔' //品牌
            },
            showId3: 1, //选择了第几个样本盒

            iceBox: [1, 2, 3, 4, 5], //抽屉 一共五层
            showBoxId: 1, //第几层 选中的抽屉层数
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9], //样本盒
            boxList: [], //冰箱每层的抽屉 select为true则是已选中状态
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            totalCount: 100 //总条数
        };
    },
    mounted() {
        this.getInit();
    },
    methods: {
        search() {},
        // 设置大层
        setShowItem(e) {
            this.boxShowId = e;
        },
        toDetail() {
            this.$router.push('/iceboxDetail');
        },
        // 选中第几层
        setBoxActive(e) {
            this.showBoxId = e;
        },
        // 选中样本盒
        setShowItemBox(e) {
            console.log(e);
            this.showId3 = e;
        },
        // 初始化数据
        getInit() {
            let arr = this.boxList;
            for (let i = 0; i < 9; i++) {
                arr.push({ id: i + 1 });
            }
            // arr[0].select = true;
            // this.boxList = arr;
            let tempArr3 = [];
            // let tempArr = this.items;
            let tempArr = arr;
            let tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
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
        },
        // 请求数据
        getData() {}
    }
};
</script>
<style lang="less" scoped>
.searchFormInput1 {
    width: 180px;
    margin-left: 12px;
}
.searchFormBtn {
    margin-left: 20px !important;
    border-radius: 0;
}
.table-footer {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 20px;
    font-size: 15px;
    span {
        color: #568bfc;
    }
}
.stat1 {
    width: 100%;
    overflow-x: hidden;
}
.padd {
    width: 100%;
    display: flex;
    padding-bottom: 0 !important;
    background: transparent !important;
}
.left {
    width: 562px;
    height: 694px;
    background: #ffffff;
    box-sizing: border-box;
    padding-top: 81px;
}
.right {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 24px 26px;
    background: #fff;
    margin-left: 20px;
    height: 694px;
    background: #ffffff;
}
::-webkit-scrollbar {
    width: 0;
}

::-webkit-scrollbar-track {
    background-color: none;
}

::-webkit-scrollbar-thumb {
    background-color: none;
}

::-webkit-scrollbar-thumb:hover {
    background-color: none;
}

::-webkit-scrollbar-thumb:active {
    background-color: none;
}
.bxCont {
    position: absolute;
    bottom: 38px;
    left: 17px;
    width: 297px;
    height: 405px;
    box-sizing: border-box;
    padding: 24px 10px 33px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .item {
        width: 64px;
        height: 348px;
        background: #dce6f8;
        border-radius: 12px;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 14px 5px;
        .img2 {
            width: 54px;
            height: 26px;
            margin-bottom: 2px;
        }
        .img2:last-child {
            margin-bottom: 0;
        }
    }
}
.boxCont {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 25px 23px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    bottom: 0;
    left: 0;
    .item {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 10px 12px;
        position: relative;
        img {
            width: 100%;
            height: auto;
        }
        .first {
            position: absolute;
            width: 260px;
            height: 61px;
            background: #fff;
            top: 10px;
            left: 12px;
            box-sizing: border-box;
            padding: 3px 6px;
            display: flex;
            align-items: center;
            flex-direction: row;
            .item1 {
                cursor: pointer;
                width: 22px;
                height: 54px;
                background: #ffffff;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                margin-right: 4px;
            }
            .item1:last-child {
                margin-right: 0;
            }
        }
    }
    .item:last-child {
        margin-bottom: 0;
    }
}
.container1 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    .statusList {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 10px 0 10px 24px;
        .item {
            margin-right: 40px;
            margin-left: 26px;
            position: relative;
            font-size: 16px;
            color: #3c3c3c;
        }
        .item::before {
            content: '';
            width: 18px;
            height: 18px;
            background: #fa483a;
            border-radius: 2px;
            position: absolute;
            left: -24px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
        }
        .item:nth-child(1)::before {
            background: #ffffff;
            border: 1px solid #d9d9d9;
        }
        .item:nth-child(3)::before {
            background: #eaeaea;
            border: 1px solid #dadada;
        }
        .item:nth-child(4)::before {
            background: #1dc084;
            border: 1px solid #1dc084;
        }
    }
    .content1 {
        background: #fff;
        width: 100%;
        height: auto;
        margin-top: 20px;
        padding-bottom: 300px;
        .satrt {
            width: 100%;
            display: flex;
            flex-direction: row;
            height: auto;
            margin-top: 75px;
        }

        .bx {
            height: 564px;
            width: 330px;
            position: relative;
            margin-left: 90px;
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
                bottom: 32px;
                font-size: 16px;
                color: #ffffff;
            }
            .brand1 {
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
                    .look {
                        position: absolute;
                        left: 42px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 16px;
                        color: #5e8afc;
                        z-index: 1;
                    }
                    .look::after {
                        content: '';
                        z-index: 1;
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        background: #5e8afc;
                        border-radius: 50%;
                        left: -25px;
                        top: 5px;
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
        .bingui {
            width: 587px;
            height: 402px;
            margin-top: 100px;
            margin-left: 54px;
            position: relative;
            .binguiCont {
                position: absolute;
                width: 456px;
                height: 238px;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                box-sizing: border-box;
                padding: 44px 15px 27px 15px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                .item {
                    width: 66px;
                    height: 66px;
                    margin-right: 5px;
                    margin-bottom: 17px;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .item1 {
                    width: 46px;
                    height: 46px;
                    margin-right: 8px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .item1:nth-child(8n + 8) {
                    margin-right: 0;
                }
            }
        }
        .jiazi {
            width: 136px;
            height: 564px;
            background: #dce6f8;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 70px;
            position: relative;
            .name {
                position: absolute;
                top: -60px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 24px;
                font-weight: bold;
                color: #568cfc;
            }
            .jiaziContent {
                width: 96px;
                height: 524px;
                overflow-y: scroll;
                background: #dce6f8;
                cursor: pointer;
                img {
                    margin-bottom: 7px;
                }
            }
        }
        .jiazi1 {
            width: 496px;
            height: 532px;
            background: #dce6f8;
            border-radius: 12px;
            box-sizing: border-box;
            padding: 20px 16px;
            margin-left: 50px;
            position: relative;
            .jiaziContent {
                width: 492px;
                height: 464px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .item {
                    width: 88px;
                    height: 46px;
                    margin-right: 6px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .name {
                position: absolute;
                top: -60px;
                left: 0;
                font-size: 24px;
                font-weight: bold;
                color: #568cfc;
            }
        }
        .jiantou {
            width: 1px;
            height: 510px;
            background: #e1e5ef;
            position: relative;
            margin-left: 36px;
            margin-top: 24px;
            font-size: 16px;
            color: #646672;
            .y1 {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
            }
            .y2 {
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .jiantou::after {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid #e1e5ef;
            font-size: 16px;
            color: #646672;
        }
        .jiantou::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 7px solid #e1e5ef;
            font-size: 16px;
            color: #646672;
        }
        .yangben {
            width: 564px;
            height: 564px;
            background: #dce6f8;
            border-radius: 12px;
            margin-left: 80px;
            position: relative;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding: 12px;
            .name {
                position: absolute;
                top: -60px;
                font-size: 24px;
                font-weight: bold;
                color: #568cfc;
            }
            .item {
                width: 40px;
                height: 40px;
                background: #ffffff;
                border-radius: 4px;
                font-size: 16px;
                margin: 0 5px 5px 0;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-sizing: border-box;
                .itemChild {
                    position: absolute;
                    left: 25px;
                    top: 60px;
                    width: 500px;
                    height: 294px;
                    background: #ffffff;
                    box-shadow: 0px 0px 8px 0px rgba(12, 4, 7, 0.12);
                    border-radius: 4px;
                    display: none;
                    z-index: 1;
                }
                .show {
                    display: flex;
                    flex-direction: column;
                    display: block;
                    position: absolute;
                }
                .box2 {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    font-size: 16px;
                    color: #5a5c6a;
                    padding: 23px 21px;
                    display: flex;
                    flex-direction: column;
                    .name1 {
                        font-size: 24px;
                        font-weight: bold;
                        color: #5a5c6a;
                        margin-bottom: 10px;
                    }
                    .lv {
                        font-size: 16px;
                        font-weight: bold;
                        color: #568cfc;
                    }
                    .ml {
                        width: 338px;
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 8px;
                        .tag {
                            width: 18px;
                            height: 18px;
                            margin-right: 10px;
                        }
                    }
                    .red {
                        font-weight: bold;
                    }
                    .borb {
                        padding-bottom: 14px;
                        border-bottom: 1px solid #e1e5ef;
                    }
                    .footerList {
                        width: 318px;
                        height: 40px;
                        display: flex;
                        margin-top: 16px;
                        justify-content: space-between;
                        font-size: 16px;
                        color: #5a5c6a;
                        .item1 {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            .title {
                                color: #568cfc;
                                font-weight: bold;
                            }
                        }
                    }
                    .shiji {
                        width: 67px;
                        height: 229px;
                        position: absolute;
                        right: 28px;
                        top: 43px;
                        .total {
                            position: absolute;
                            top: -30px;
                            left: 50%;
                            transform: translateX(-50%);
                            color: #343434;
                            font-size: 16px;
                        }
                        .gai {
                            width: 67px;
                            height: 28px;
                            border-radius: 4px;
                            position: absolute;
                            z-index: 1;
                        }
                        .ti {
                            width: 51px;
                            height: 203px;
                            background: #f3f5f9;
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            overflow: hidden;
                            .bolang {
                                width: 200px;
                                height: 27px;
                                position: absolute;
                                bottom: 60px;
                                animation: mymove 7s linear 0.1s infinite alternate;
                                left: 0;
                            }
                        }
                        .water {
                            width: 51px;
                            height: 60px;
                            position: absolute;
                            background: #fa5d51;
                            bottom: 26px;
                            left: 50%;
                            transform: translateX(-50%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 16px;
                            color: #ffffff;
                        }
                        .di {
                            width: 51px;
                            height: 26px;
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
            .active {
                color: #fa483a;
                background: #ffffff;
                border: 1px solid #fa483a;
                color: #fa483a;
            }
        }
    }
}
@keyframes mymove {
    from {
        left: 0px;
    }
    to {
        left: -150px;
    }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
    from {
        left: 0px;
    }
    to {
        left: -150px;
    }
}
</style>