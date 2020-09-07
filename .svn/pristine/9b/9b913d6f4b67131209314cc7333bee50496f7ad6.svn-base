<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">容器管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">冰箱管理</div>
        </div>
        <!-- 头部搜索条件 -->

        <el-row>
            <el-col :span="11" class="btnsContent">
                <div>
                    <div class="btnContentLeft">
                        <span>90%及以上</span>
                        <span>60%及以上</span>
                        <span>40%及以上</span>
                        <span>20%及以上</span>
                        <span>10%及以上</span>
                    </div>
                </div>
                <div class="searchForm">
                    <el-input
                        class="searchFormInput"
                        placeholder="输入搜索条件"
                        v-model="keyword"
                        clearable
                    ></el-input>
                    <div class="searchFormBtn">搜索</div>
                </div>
            </el-col>
            <el-col :span="12" class="btnsContent">
                <div class="btnsSpl">
                    <div class="splItem">
                        <img src="../../assets/img/use.png" class="img1" alt />
                        <p>人我帅</p>
                    </div>
                    <div class="splItem">大层数： 4</div>
                    <div class="splItem">小层数： {{showBoxId}}</div>
                    <div class="splItem">样本盒： 6</div>
                </div>
                <div class="itemTop2">
                    <div class="start1">
                        <div>
                            <div class="start">
                                <img src="../../assets/img/tag.png" class="img1" alt />
                                <div class="txt">
                                    冰箱编号：
                                    <p>ybr123</p>
                                </div>
                            </div>
                            <div class="txt txt1">
                                冰箱编号：
                                <p>ybr123</p>
                            </div>
                            <div class="txt txt1">
                                冰箱编号：
                                <p>ybr123</p>
                            </div>
                        </div>
                    </div>
                    <div class="mill">
                        <p>冰箱可放入材料：</p>
                        <p>冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料</p>
                    </div>

                    <div class="dic">
                        <div class="title">-30℃</div>
                        <div class="txt2">海尔</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11" class="btnsContent">
                <div class="icebox">
                    <div class="iceboxDetail">
                        <p class="name">BX-01</p>
                        <p class="temperature">-30℃</p>
                        <img src="../../assets/img/iceboxS.png" class="img2" alt />
                        <div class="iceboxList">
                            <div class="iceboxItem">
                                <div
                                    :class="['iceboxChild',item.select==true?'active1':'']"
                                    v-for="(item,index) in boxList"
                                    :key="index"
                                    @click.prevent="setIceBox(item)"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="boxLoft">
                        <div class="boxContent">
                            <div
                                :class="['boxItem',item==showBoxId?'boxActive':'']"
                                @click="setBoxActive(item)"
                                v-for="(item,index) in iceBox"
                                :key="index"
                            ></div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="btnsContent btnsCenter">
                <div class="sample">
                    <div class="itemBox" v-for="(item,index) in items" :key="index">
                        <div class="kpl">{{item.name}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: '',
            value: '',
            iceBox: [1, 2, 3, 4, 5], //抽屉 一共五层
            showBoxId: 1, //第几层 选中的抽屉层数
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //样本盒
            boxList: [] //冰箱每层的抽屉 select为true则是已选中状态
        };
    },
    mounted() {
        this.getInit();
    },
    methods: {
        search() {},
        toDetail() {
            this.$router.push('/iceboxDetail');
        },
        // 选中第几层
        setBoxActive(e) {
            this.showBoxId = e;
        },
        // 初始化数据
        getInit() {
            let arr = this.boxList;
            for (let i = 0; i < 25; i++) {
                arr.push({ id: i, select: false });
            }
            arr[0].select = true;
            this.boxList = arr;
            let tempArr3 = [];
            let tempArr = this.items;
            let tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            tempArr.forEach((item, index) => {
                tempArr1.forEach((item1, index1) => {
                    tempArr3.push({
                        id: index,
                        name: item1 + item
                    });
                });
            });
            console.log(tempArr3);
            this.items = tempArr3;
        }
    }
};
</script>
<style lang="less" scoped>
.btnsCenter {
    display: flex;
    align-items: center;
    justify-content: center;
}
.btnsContent {
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
}
.btnContentLeft {
    height: 42px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    align-items: center;
    padding-left: 37px;
}
.searchForm {
    width: 315px;
    height: 102px;
    display: flex;
    align-items: center;
    padding-left: 22px;
}
.btnsContent:last-child {
    margin-left: 22px;
}
.el-row:last-child {
    margin-top: 22px;
}
.btnsSpl {
    width: 80%;
    border-bottom: 1px solid #dddddd;
    height: 42px;
    padding-left: 35px;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    .splItem {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        font-size: 14px;
        color: rgba(89, 91, 105, 1);
        line-height: 19px;
        margin-right: 78px;
        .img1 {
            width: 15px;
            height: 15px;
            margin-right: 1px;
        }
    }
    .splItem:last-child {
        margin-right: 0;
    }
}
.itemTop2 {
    position: relative;
    box-sizing: border-box;
    height: 102px;
    padding: 8px 0 0 35px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    .start {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .img1 {
            width: 15px;
            height: 15px;
            margin-top: 6px;
            margin-right: 4px;
        }
    }
    .mill {
        width: 478px;
        color: #c2c4c9;
        p:first-child {
            margin-bottom: 6px;
            color: #595b69;
        }
    }
    .txt,
    .txt1 {
        font-size: 14px;
        color: rgba(89, 91, 105, 1);
        line-height: 19px;
        margin-top: 6px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        p {
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: rgba(16, 25, 45, 1);
            line-height: 19px;
        }
    }
    .txt1 {
        padding-left: 19px;
    }
    .dic {
        position: absolute;
        right: 15px;
        top: -15px;
        display: flex;
        flex-direction: column;
        .title {
            font-size: 30px;
            font-weight: bold;
            color: rgba(250, 72, 58, 1);
            line-height: 40px;
        }
        .txt2 {
            font-size: 14px;
            color: rgba(16, 25, 45, 1);
            line-height: 19px;
            text-align: right;
        }
        .txt2::after {
            content: '';
            width: 9px;
            height: 9px;
            background: rgba(250, 72, 58, 1);
            border-radius: 100%;
            position: absolute;
            bottom: -15px;
            right: 0;
        }
    }
}
.itemTop2 .start .txt:first-child {
    padding-left: 0;
}

.icebox {
    width: auto;
    height: 680px;
    position: relative;
    .iceboxDetail {
        width: 416px;
        height: 512px;
        position: absolute;
        bottom: 53px;
        left: 47px;
        .name {
            font-size: 16px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            position: absolute;
            left: 79px;
            top: 10px;
            width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .temperature {
            font-size: 16px;
            font-weight: 600;
            color: rgba(105, 119, 184, 1);
            position: absolute;
            right: 85px;
            top: 10px;
        }
        .img2 {
            width: 416px;
            height: 512px;
        }
        .iceboxList {
            width: 257px;
            height: 380px;
            position: absolute;
            top: 47px;
            left: 79px;
            .iceboxItem {
                width: 257px;
                height: 84px;
                background: rgba(102, 137, 208, 1);
                border-radius: 9px;
                display: flex;
                box-sizing: border-box;
                padding: 4px 7px;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                .iceboxChild {
                    width: 43px;
                    height: 9px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 2px;
                    margin-right: 7px;
                    cursor: pointer;
                }
                .iceboxChild:hover {
                    box-sizing: border-box;
                    background: #ff9e96;
                }
                .iceboxChild:nth-child(5n + 5) {
                    margin-right: 0;
                }
                .active1 {
                    background-color: #fa483a;
                    box-shadow: 0px 2px 4px 0px rgba(89, 131, 216, 1);
                    border-radius: 2px;
                }
            }
        }
    }
    .boxLoft {
        position: absolute;
        width: 129px;
        height: 563px;
        right: 54px;
        bottom: 36px;
        background: rgba(248, 248, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        .boxContent {
            width: 105px;
            height: 533px;
            background: rgba(235, 240, 247, 1);
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            box-sizing: border-box;
            padding: 20px 0;
            .boxItem {
                width: 50px;
                height: 50px;
                cursor: pointer;
                background: rgba(255, 255, 255, 1);
                border: 3px dashed rgba(217, 217, 217, 1);
            }
        }
    }
}
.sample {
    width: 750px;
    margin: 42px 0;
    height: 620px;
    background: rgba(243, 244, 248, 1);
    border-radius: 16px;
    border: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    .itemBox {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(185, 195, 209, 1);
        cursor: pointer;
        .kpl {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            width: 46px;
            height: 46px;
        }
        .kpl:hover {
            color: #fa483a;
            border: 1px solid #fa483a;
        }
    }
}
.boxActive {
    border-color: #fa483a !important;
}
</style>