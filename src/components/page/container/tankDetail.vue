<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">容器管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">液氮罐管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">液氮罐详情</div>
        </div>

        <div class="container1">
            <!-- 头部信息 -->
            <div class="header">
                <el-row :gutter="24">
                    <el-col :span="24">
                        <div class="header-left">
                            <div class="avator">-160o</div>
                            <div class="txtContent">
                                <p class="name">
                                    张三
                                    <span>301</span>
                                </p>
                                <p>液氮罐编号：YBR001</p>
                                <p>液氮罐品牌：海尔</p>
                            </div>
                            <div class="txtContent">
                                <p>液氮罐型号：BX-001</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- 液氮罐信息 -->
            <el-card class="content1">
                <el-row :gutter="24">
                    <div class="statusList">
                        <p class="item">空</p>
                        <p class="item">已占用</p>
                        <p class="item">仓位保留</p>
                    </div>
                    <div class="satrt">
                        <div class="bx">
                            <img src="../../../assets/img/gaizi.png" alt />
                            <div class="bxCont">
                                <div class="item" v-for="(item,index) in 4" :key="index">
                                    <img src="../../../assets/img/y1.png" v-for="(item1,index1) in 10" :key="index1" class="img2" alt />
                                </div>
                            </div>
                        </div>
                        <!-- 样本盒 -->
                        <div class="yangben">
                            <p class="name">YBR-01</p>
                            <div
                                :class="['item',showId3==index+1?'active':'']"
                                :style="{width:(540/12)-5+'px',height:(540/12)-5+'px'}"
                                v-for="(item,index) in items"
                                :key="index"
                                @click="setShowItemBox(index+1)"
                            >
                                {{item.name}}
                                <div
                                    :class="['itemChild',showId3==index+1?'show':'']"
                                    v-if="showId3==index+1"
                                >
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
                                                <img
                                                    src="../../../assets/img/bolang.png"
                                                    class="bolang"
                                                    alt
                                                />
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
            showNavId: 1, //1立式大液氮罐 23立式冰柜 4卧式小液氮罐 5卧式大液氮罐
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
            boxList: [] //液氮罐每层的抽屉 select为true则是已选中状态
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
    }
};
</script>
<style lang="less" scoped>
.container1 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    .header {
        width: 100%;
        height: 160px;
        background: #ffffff;
        box-sizing: border-box;
        padding: 45px;
        .header-left {
            height: 112px;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            .avator {
                width: 68px;
                height: 68px;
                margin-top: -20px;
                background: #568cfc;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                color: #ffffff;
                margin-right: 28px;
            }
            .txtContent {
                height: 82%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                font-size: 16px;
                color: #646672;
                .name {
                    font-size: 24px;
                    color: #161f34;
                    display: flex;
                    align-items: center;
                    span {
                        padding: 1px 10px;
                        background: #fa483a;
                        border-radius: 4px;
                        font-size: 16px;
                        margin-left: 16px;
                        color: #ffffff;
                    }
                }
                p {
                    margin-top: 16px;
                }
            }
            .txtContent:last-child {
                margin-left: 500px;
            }
        }
        .header-right {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .item {
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: 16px;
                color: #646672;
                .t1 {
                    font-size: 36px;
                    font-weight: bold;
                    color: #568cfc;
                    margin-bottom: 16px;
                }
            }
        }
    }
    .content1 {
        background: #fff;
        width: 100%;
        height: auto;
        margin-top: 20px;
        padding-bottom: 300px;
        .satrt {
            display: flex;
            flex-direction: row;
            height: auto;
        }
        .statusList {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 20px 0 40px 24px;
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
            .item:first-child::before {
                background: #ffffff;
                border: 1px solid #d9d9d9;
            }
            .item:last-child::before {
                background: #eaeaea;
                border: 1px solid #dadada;
            }
        }
        .bx {
            height: 564px;
            width: 300px;
            position: relative;
            margin-left: 153px;
            margin-right: 200px;
            .bxCont {
                position: absolute;
                bottom: 38px;
                left: 2px;
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
                    .img2:last-child{
                      margin-bottom: 0;
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